import Expression from '@/classes/Expression'

describe('Expression.js', () => {
  describe('constructor()', () => {
    it('should create expression', () => {
      should.equal('3:3', new Expression('3:3').value)
    })
  })
  describe('get separator()', () => {
    it('should return = if it has =', () => {
      let exp = new Expression('3:3=4:4=5:5*6:5/3:9')
      should.equal('=', exp.separator)
    })
    it('should return + if it has +  and no =', () => {
      let exp = new Expression('3:3+4:4+5:5*6:5/3:9')
      should.equal('+', exp.separator)
    })
    it('should return * if it has * and no +, = ', () => {
      let exp = new Expression('5:5*6:5')
      should.equal('*', exp.separator)
    })
    it('should return / if it has / and no + ,= or *', () => {
      let exp = new Expression('5:5/6:5/3:9')
      should.equal('/', exp.separator)
    })
    it("should return false if it hasn't any math signs", () => {
      let exp = new Expression('5:5')
      exp.separator.should.be.false
    })
  })
  describe('get hasBrackets()', () => {
    it('should return true if expression has "(" or  ")"', () => {
      let exp = new Expression('(4:5+5:5)')
      exp.hasBrackets.should.be.true
    })
    it('should return false otherwise', () => {
      let exp = new Expression('4:5+5:5')
      exp.hasBrackets.should.be.false
    })
  })
  describe('get isFraction()', () => {
    it('should return true if expression has only digits and ":" sign', () => {
      let exp = new Expression('4:5')
      exp.isFraction.should.be.true
    })
    it('should return false otherwise', () => {
      let exp = new Expression('4:5+5:5')
      exp.isFraction.should.be.false
    })
  })
  describe('static isSign()', () => {
    it('should return true if passed parm is one of "+", "-", "/", "*"', () => {
      Expression.isSign('+').should.be.true
      Expression.isSign('=').should.be.true
      Expression.isSign('/').should.be.true
      Expression.isSign('*').should.be.true
    })
  })
  describe('static getFraction()', () => {
    it('should return a fraction from array', () => {
      let result = Expression.getFraction(
        ['3:2*1:2=1:4*3:2*1:2=1:4', '3:2'],
        1,
        '+'
      )
      should.exist(result.value)
      should.exist(result.value.numerator)
      should.exist(result.value.denominator)
      result.value.numerator.should.equal(29)
      result.value.denominator.should.equal(16)
    })
  })
  describe('compute()', () => {
    it('should compute a value of expression', () => {
      let result = new Expression('5:17*2:4+1:3/5:6*7:14=2:3').compute()
      result.value.numerator.should.equal(-163)
      result.value.denominator.should.equal(510)
    })
  })
  describe('computeBrackets()', () => {
    it('should compute a value of expression', () => {
      let result = new Expression('(5:3+1:2)*(5:4+1:3)').computeBrackets()
      result.value.numerator.should.equal(247)
      result.value.denominator.should.equal(72)
    })
    it('should compute a value with multiple brackets', () => {
      let result = new Expression(
        '((5:3+1:2)=(5:4+1:3)+((5:3+1:2)=(5:4+1:3)+(5:2+1:2)))*5:1020+(1:3*1:2)'
      ).computeBrackets()
      result.value.numerator.should.equal(229)
      result.value.denominator.should.equal(1224)
    })
    it('should compute a value with multiple brackets and division', () => {
      let result = new Expression(
        '((5:3+1:2)=(5:4+1:3)+((5:3+1:2)/(5:4+1:3)*(5:2+1:2)))*5:1020+(1:3*1:2)'
      ).computeBrackets()
      result.value.numerator.should.equal(8821)
      result.value.denominator.should.equal(46512)
    })
  })
})
