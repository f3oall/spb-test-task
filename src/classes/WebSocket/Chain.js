export default class {
  constructor() {
    this.chain = []
    this.currentNumber = 1
  }

  add(action) {
    this.chain.push({ number: this.currentNumber, action, ready: false })
    this.currentNumber++
  }

  setReady(number) {
    let idx = this._findByNumber(number)
    if (idx !== -1) {
      this.chain[idx].ready = true
      if (idx === 0) this._run()
    }
  }

  remove(number) {
    let idx = this._findByNumber(number)
    if (idx !== -1) {
      this.chain.splice(idx, 1)
      if (this._firstElementReady) this._run()
    }
  }

  _run() {
    this.chain
      .filter(el => el.ready)
      .sort((a, b) => a.number - b.number)
      .forEach(el => {
        el.action()
        this.remove(el.number)
      })
  }

  _findByNumber(number) {
    return this.chain.findIndex(el => el.number === parseInt(number))
  }

  get _firstElementReady() {
    return this.chain.length && this.chain[0].ready === true
  }
}
