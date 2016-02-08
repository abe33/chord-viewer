import expect from 'expect.js'
import FretPosition from '../src/fret-position'

describe('FretPosition', () => {
  describe('creation', () => {
    it('takes an array and fill the string and fret properties in order', () => {
      const position = new FretPosition([0, 4])
      expect(position.string).to.eql(0)
      expect(position.fret).to.eql(4)
    })

    it('takes an object and fill the string and fret properties', () => {
      const position = new FretPosition({string: 0, fret: 4})
      expect(position.string).to.eql(0)
      expect(position.fret).to.eql(4)
    })
  })

  describe('.fromObject', () => {
    it('returns a FretPosition', () => {
      expect(FretPosition.fromObject([0, 4])).to.eql(new FretPosition([0, 4]))
      expect(FretPosition.fromObject({string: 0, fret: 4})).to.eql(new FretPosition([0, 4]))
    })

    it('returns the same object when the argument is already a FretPosition', () => {
      const position = new FretPosition([0, 4])
      expect(FretPosition.fromObject(position)).to.eql(position)
    })
  })
})
