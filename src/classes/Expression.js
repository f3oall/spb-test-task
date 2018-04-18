import Fraction from './Fraction'

export default class Expression {
  constructor(value) {
    if (typeof value === 'string') {
      this.value = value
      this.isFilled = true
    } else {
      this.value = ''
      this.isFilled = value.every(el => {
        if (!el.isFilled) return false
        this.value += el.toString()
        return true
      })
    }
  }
  get separator() {
    if (/[+]/.test(this.value)) return '+'
    if (/[-]/.test(this.value)) return '-'
    if (/[/]/.test(this.value)) return '/'
    if (/[*]/.test(this.value)) return '*'
    return false
  }
  get hasBrackets() {
    return /[(|)]/.test(this.value)
  }
  isFraction() {
    return /^[^:]*:[^:]*$/.test(this.value)
  }
  isSign(str) {
    return ['+', '-', '*', '/'].includes(str)
  }
  get result() {
    if (!this.isFilled) return false
    if (this.hasBrackets) return this.computeBrackets()
    return this.compute()
  }
  compute() {
    let arr = []
    arr = this.separator ? this.value.split(this.separator) : [this.value]
    return this.getFraction(arr, 0, this.separator)
  }
  computeBrackets() {
    let arr = this.parseBrackets()
    let fractions = arr.map(el => {
      let fr = new Expression(el.el).result
      if (el.sign) fr.sign = el.sign
      return fr
    })
    return new Expression(fractions).result
  }
  parseBrackets() {
    let arr = []
    this.value.split(/[(|)]/).forEach(el => {
      if (!el.length) return
      if (this.isSign(el[0])) {
        arr[arr.length - 1].sign = el[0]
        el = el.substring(1)
      }
      arr.push({ el })
    })
    return arr
  }
  getFraction(arr, idx, sign) {
    let exp = new Expression(arr[idx])

    let fr
    if (exp.isFraction()) {
      fr = new Fraction(exp.value, sign)
    } else {
      fr = exp.result
      fr.sign = sign
    }

    if (arr.length - 1 === idx) return fr
    return fr.compute(this.getFraction(arr, idx + 1, sign).value)
  }
}
