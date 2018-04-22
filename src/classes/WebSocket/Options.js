const defaults = {
  timeouts: {
    connection: 4000,
    request: 1200
  },
  errors: {
    connecting: 'WebSocket is in connecting state. Please wait',
    closed: 'WebSocket connection has been closed. Please reload the page'
  }
}

export default class Options {
  constructor(options) {
    Object.assign(this, this._defaultsDeep(defaults, options))
  }

  _defaultsDeep(defaults, custom) {
    if (!Options.isObject(custom)) return custom

    let options = {}
    for (const opt in defaults) {
      let d = defaults[opt]
      options[opt] = custom.hasOwnProperty(opt)
        ? this._defaultsDeep(d, custom[opt])
        : d
    }
    return options
  }

  static isObject(value) {
    return value && typeof value === 'object'
  }
}
