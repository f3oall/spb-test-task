import { Fraction } from 'fractional'
export default class {
  constructor(str, sign = null) {
    if (str) {
      this.value = new Fraction(...str.split(':'))
    } else {
      this.value = {
        numerator: '',
        denominator: ''
      }
    }
    if (sign) this.sign = sign
    this.brackets = {
      left: false,
      right: false
    }
  }
  toString() {
    let str = ''
    if (this.brackets.left) str += '('
    str += `${this.value.numerator}:${this.value.denominator}`
    if (this.brackets.right) str += ')'
    if (this.sign) str += this.sign
    return str
  }

  get isFilled() {
    if (this.hasOwnProperty('sign')) {
      return (
        this.value.numerator !== '' &&
        this.value.denominator !== '' &&
        this.sign
      )
    }
    return this.value.numerator !== '' && this.value.denominator !== ''
  }
  setBracket(pos) {
    this.brackets[pos] = !this.brackets[pos]
    return this.brackets[pos] ? 1 : -1
  }
  get action() {
    switch (this.sign) {
      case '+':
        return 'add'
      case '-':
        return 'subtract'
      case '*':
        return 'multiply'
      case '/':
        return 'divide'
    }
  }
  compute(fraction) {
    return this.value[this.action](fraction)
  }
}
