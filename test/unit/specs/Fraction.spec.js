import Fraction from '@/classes/Fraction'
import Brackets from '@/classes/Brackets'

describe('Fraction.js', () => {
  let defaults = {
    numerator: 3,
    denominator: 4,
    brackets: new Brackets()
  }
  let f
  let defaultString = `${defaults.numerator}:${defaults.denominator}`
  let defaultSign = '+'
  describe('constructor()', () => {
    before(() => {
      f = new Fraction(defaultString)
    })
    it('should create valid value from string', () => {
      should.exist(f.value)
      should.equal(defaults.numerator, f.value.numerator)
      should.equal(defaults.denominator, f.value.denominator)
    })
    it('should create valid brackets', () => {
      should.exist(f.brackets)
      f.brackets.should.be.deep.equal(defaults.brackets)
    })
    it("shouldn't create sign when it's not specified", () => {
      should.not.exist(f.sign)
    })
    it('should create sign when specified', () => {
      f = new Fraction(defaultString, defaultSign)
      should.exist(f.sign)
      should.equal(defaultSign, f.sign)
    })
    it('should create blank values without params', () => {
      f = new Fraction()
      should.exist(f.value)
      should.equal('', f.value.numerator)
      should.equal('', f.value.denominator)
    })
  })
  describe('get isFilled()', () => {
    it('should be false if values are blank', () => {
      f = new Fraction()
      should.equal(false, f.isFilled)
    })
    it("should be false if values are filled but sign isn't", () => {
      f = new Fraction(defaultString)
      f.sign = ''
      should.equal(false, f.isFilled)
    })
    it('should be true if values and sign are filled', () => {
      f.sign = defaultSign
      should.equal(true, f.isFilled)
    })
  })
  describe('compute()', () => {
    let first = new Fraction('2:2')
    let second = new Fraction('1:2')
    it('should return valid result of addition', () => {
      first.sign = '+'
      let res = first.compute(second)
      should.equal(3, res.value.numerator)
      should.equal(2, res.value.denominator)
    })
    it('should return valid result of subtraction', () => {
      first.sign = '='
      let res = first.compute(second)
      should.equal(1, res.value.numerator)
      should.equal(2, res.value.denominator)
    })
    it('should return valid result of multiplication', () => {
      first.sign = '*'
      let res = first.compute(second)
      should.equal(1, res.value.numerator)
      should.equal(2, res.value.denominator)
    })
    it('should return valid result of division', () => {
      first.sign = '/'
      let res = first.compute(second)
      should.equal(2, res.value.numerator)
      should.equal(1, res.value.denominator)
    })
  })
  describe('toString()', () => {
    it('should return proper string', () => {
      let fr = new Fraction('2:3', '+')
      fr.brackets.toggle('left', 0)
      should.equal('(2:3+', fr.toString())
    })
  })
})
