import { Fraction as Fractional } from 'fractional'
import Brackets from './Brackets'
export default class Fraction {
  constructor(str, sign = null) {
    this.brackets = new Brackets()
    if (sign) this.sign = sign
    if (str) {
      this.value = new Fractional(...str.split(':'))
    } else {
      this.value = {
        numerator: '',
        denominator: ''
      }
    }
  }
  toString() {
    let str = ''
    if (this.brackets.left[0]) str += this.brackets.toString('left')
    str += `${this.value.numerator}:${this.value.denominator}`
    if (this.brackets.right[0]) str += this.brackets.toString('right')
    if (this.sign) str += this.sign === '-' ? '=' : this.sign
    return str
  }
  compute(fraction) {
    let res = this.value[this.action](fraction.value)
    return new Fraction(`${res.numerator}:${res.denominator}`, fraction.sign)
  }

  get isFilled() {
    if (this.hasOwnProperty('sign')) {
      return (
        this.value.numerator !== '' &&
        this.value.denominator !== '' &&
        this.sign !== ''
      )
    }
    return this.value.numerator !== '' && this.value.denominator !== ''
  }

  get action() {
    switch (this.sign) {
      case '+':
        return 'add'
      case '=':
        return 'subtract'
      case '*':
        return 'multiply'
      case '/':
        return 'divide'
    }
  }
}
