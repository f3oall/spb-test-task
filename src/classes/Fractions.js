import Fraction from './Fraction'
import Expression from './Expression'
export default class {
  constructor() {
    this.resetResult()
    this.fractions = []
    this.bracketsAmount = {
      right: 0,
      left: 0
    }
    this.isFilled = false
  }

  get length() {
    return this.fractions.length
  }
  get last() {
    return this.fractions[this.length - 1]
  }

  add(fraction = new Fraction()) {
    if (this.length && !this.last.sign) this.last.sign = ''
    this.fractions.push(fraction)
    this.resetResult()
  }
  resetResult() {
    this.result = { numerator: '?', denominator: '?' }
  }
  remove(idx) {
    this.fractions.splice(idx, 1)
    this.compute()
  }

  compute() {
    let str = this.toString()
    if (this.isFilled) {
      let result = new Expression(str).result
      if (result) {
        this.result = {
          numerator: result.value.numerator,
          denominator: result.value.denominator
        }
      }
    }
  }
  toString() {
    let str = ''
    this.isFilled = this.fractions.every(v => {
      if (!v.isFilled) return false
      str += v.toString()
      return true
    })
    return str
  }
  get hasUnmatchedBrackets() {
    return this.bracketsAmount.right !== this.bracketsAmount.left
  }
}
