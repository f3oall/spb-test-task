import Fraction from './Fraction'
import Expression from './Expression'
export default class {
  constructor() {
    this.fractions = []
    this.result = this.resetResult()
    this.bracketsAmount = {
      right: 0,
      left: 0
    }
  }
  get length() {
    return this.fractions.length
  }
  add() {
    if (this.length) this.fractions[this.length - 1].sign = ''
    this.fractions.push(new Fraction())
    this.resetResult()
  }
  resetResult() {
    this.result = { numerator: '?', denominator: '?' }
  }
  remove(idx) {
    this.fractions.splice(idx, 1)
    this.compute()
  }
  toggleBracket(bracket, idx) {
    let fraction = this.fractions[idx]
    let pos = bracket === '(' ? 'left' : 'right'
    this.bracketsAmount[pos] += fraction.setBracket(pos)
    if (this.noUnmatchedBrackets) {
      this.compute()
      return ''
    }
    return 'Close all unmatched brackets'
  }

  get noUnmatchedBrackets() {
    return this.bracketsAmount.right === this.bracketsAmount.left
  }
  compute() {
    let result = new Expression(this.fractions).result
    console.log(result)
    if (result) this.result = result
  }
}
