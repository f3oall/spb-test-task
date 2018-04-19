import Fractions from '@/classes/Fractions'
import Fraction from '@/classes/Fraction'

describe('Fractions.js', () => {
  describe('constructor()', () => {
    let fractions = new Fractions()
    it('should create proper array', () => {
      fractions.fractions.should.be.instanceof(Array).with.lengthOf(0)
    })
    it('should create proper result', () => {
      fractions.result.should.be.deep.equal({
        numerator: '?',
        denominator: '?'
      })
    })
    it('should create proper bracketsAmount', () => {
      fractions.bracketsAmount.should.be.deep.equal({
        left: 0,
        right: 0
      })
    })
    it('should set isFilled to false', () => {
      fractions.isFilled.should.be.false
    })
  })
  describe('add()', () => {
    let fractions = new Fractions()
    it('should add new fraction to array', () => {
      fractions.add()
      fractions.fractions.should.has.lengthOf(1)
      fractions.last.should.be.instanceof(Fraction)
    })
    it('should add sign property to previous el if not exist', () => {
      should.not.exist(fractions.last.sign)
      fractions.add()
      fractions.fractions[fractions.length - 2].sign.should.be.equal('')
    })
    it("shouldn't add sign property if it's exist", () => {
      fractions.last.sign = '+'
      fractions.add()
      fractions.fractions[fractions.length - 2].sign.should.be.equal('+')
    })
  })
})
