import Fraction from './Fraction'

export default class Expression {
  constructor(value) {
    this.value = value
  }
  get separator() {
    if (/[+]/.test(this.value)) return '+'
    if (/[=]/.test(this.value)) return '='
    if (/[*]/.test(this.value)) return '*'
    if (/[/]/.test(this.value)) return '/'
    return false
  }
  get hasBrackets() {
    return /[(|)]/.test(this.value)
  }
  get isFraction() {
    return /^[^:]*:[^:]*$/.test(this.value)
  }
  get result() {
    if (this.hasBrackets) return this.computeBrackets()
    return this.compute()
  }

  compute() {
    let arr = []
    arr = this.separator ? this.value.split(this.separator) : [this.value]
    return Expression.getFraction(arr, arr.length - 1, this.separator)
  }
  computeBrackets() {
    // reg1 is a pattern for content in bracket
    let reg1 = /\(([^()]+)\)/g
    // reg2 is a pattern of one exp in multiple brackets
    let reg2 = /^[(]+[^()]+[)]+$/
    // reg2 is a pattern to remove all excess brackets
    let reg3 = /^[(]+([^()]+)[)]+$/
    if (reg2.test(this.value)) {
      this.value = reg3.exec(this.value)[1]
    } else {
      let match
      let matched = []
      while ((match = reg1.exec(this.value))) {
        matched.push({ selector: match[0], exp: match[1] })
      }
      matched.forEach(el => {
        let result = new Expression(el.exp).result.toString()
        this.value = this.value.replace(el.selector, result.slice(0, -1))
      })
    }

    return new Expression(this.value).result
  }

  static getFraction(arr, idx, sign) {
    let fr
    let exp = new Expression(arr[idx])
    if (exp.isFraction) {
      fr = new Fraction(exp.value, sign)
    } else {
      fr = exp.result
      if (sign) fr.sign = sign
    }
    if (idx === 0) return fr
    return this.getFraction(arr, idx - 1, sign).compute(fr)
  }
  static isSign(str) {
    return ['+', '=', '*', '/'].includes(str)
  }
}
