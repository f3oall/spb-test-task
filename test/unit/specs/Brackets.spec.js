import Brackets from '@/classes/Brackets'

describe('Brackets.js', () => {
  describe('constructor()', () => {
    let brackets = new Brackets()
    it('should create brackets', () => {
      should.exist(brackets.left)
      should.exist(brackets.right)
    })
  })
  describe('toggle()', () => {
    let brackets = new Brackets()
    it('should toggle value of specified el', () => {
      brackets.toggle('left', 0)
      brackets.left[0].should.be.true
      brackets.toggle('left', 0)
      brackets.left[0].should.be.false
    })
    it('should add boolean el to arr if toggling to true', () => {
      brackets.left.should.has.lengthOf(1)
      brackets.toggle('left', 0)
      brackets.left.should.has.lengthOf(2)
    })
    it('should remove last arr el if toggling to false', () => {
      brackets.left.should.has.lengthOf(2)
      brackets.toggle('left', 0)
      brackets.left.should.has.lengthOf(1)
    })
  })
  describe('toString()', () => {
    let brackets = new Brackets()
    it('should return proper string', () => {
      brackets.toggle('left', 0)
      brackets.toggle('left', 1)
      brackets.toggle('left', 2)
      brackets.toggle('left', 3)
      should.equal('((((', brackets.toString('left'))
    })
  })
})
