import Timer from './Timer'
import Options from './Options'
import Chain from './Chain'

export default class {
  constructor(url, options = {}) {
    this._options = new Options(options)
    this._open(url).then(
      () => {
        console.log(`WebSocket ${url} has been connected`)
        this.chain = new Chain()
        this._ws.onmessage = event => this._onMessage(event.data)
        this.timers = {}
      },
      err => alert(err.message)
    )
  }

  send(onResponse) {
    if (!this._isOpen) return

    this._ws.send(this.chain.currentNumber)
    this._addRequestTimer(this.chain.currentNumber)
    this.chain.add(onResponse)
  }

  close() {
    this._ws.close()
  }

  get _isOpen() {
    switch (this._ws.readyState) {
      case this._ws.OPEN:
        return true
      case this._ws.CONNECTING:
        alert(this._options.errors.connecting)
        return false
      case this._ws.CLOSED:
        alert(this._options.errors.closed)
        return false
    }
  }
  _onMessage(number) {
    if (this.timers.hasOwnProperty(number)) {
      this.timers[number].stop()
      this.chain.setReady(number)
      delete this.timers[number]
    }
  }
  _open(url) {
    return new Promise((resolve, reject) => {
      this._ws = new WebSocket(url)
      let timer = this._addConnectionTimer(url, reject)
      this._ws.onopen = () => resolve(timer.stop())
    })
  }
  _addRequestTimer(requestNumber) {
    this.timers[requestNumber] = new Timer(() => {
      delete this.timers[requestNumber]
      console.warn(
        `WS Request #${requestNumber} timeout has expired. Click on the link again to retry`
      )
      this.chain.remove(requestNumber)
    }, this._options.timeouts.request)
  }
  _addConnectionTimer(url, reject) {
    return new Timer(() => {
      this.close()
      reject(
        new Error(
          `Can't connect to WebSocket ${url}. Connection timeout has expired. Reload the page to try again`
        )
      )
    }, this._options.timeouts.connection)
  }
}
