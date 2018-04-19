export default class Brackets {
  constructor() {
    this.left = [false]
    this.right = [false]
  }

  toggle(pos, bracketIdx) {
    let brackets = this[pos]
    if (brackets[bracketIdx]) {
      brackets.shift()
    } else {
      brackets.push(false)
      brackets[bracketIdx] = true
    }
    return brackets[bracketIdx] ? 1 : -1
  }
  isShowingRight(fractionIdx) {
    return fractionIdx !== 0 && !this.left.includes(true)
  }
  isShowingLeft(fractionIdx, fractionsLength) {
    return fractionIdx !== fractionsLength && !this.right.includes(true)
  }
  toString(pos) {
    let bracket = Brackets.bracketByPos(pos)
    return this[pos].reduce((str, el) => {
      if (el) return str + bracket
      return str
    }, '')
  }
  static bracketByPos(pos) {
    return pos === 'left' ? '(' : ')'
  }
}
