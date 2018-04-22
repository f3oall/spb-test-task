export default class {
  constructor(onTimeout, time) {
    this.timerId = setTimeout(onTimeout, time)
  }

  stop() {
    clearTimeout(this.timerId)
  }
}
