import expect from 'expect.js'
import intervals from '../src/intervals'

describe('intervals', () => {
  describe('.semitoneInterval()', () => {
    it('returns an array that forms the interval', () => {
      expect(intervals.semitoneInterval(-1, 'A')).to.eql([])
      expect(intervals.semitoneInterval(3, 'I')).to.eql([])

      expect(intervals.semitoneInterval(3, 'A')).to.eql(['A4', 'C5'])
      expect(intervals.semitoneInterval(5, 'C')).to.eql(['C4', 'F4'])
      expect(intervals.semitoneInterval(7, 'C3')).to.eql(['C3', 'G3'])
    })
  })
})
