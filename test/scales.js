import expect from 'expect.js'
import scales from '../src/scales'

describe('scales', () => {
  describe('.isScale()', () => {
    it('matches when an array contains only notes', () => {
      expect(scales.isScale(['A', 'B', 'C5'])).to.be(true)

      expect(scales.isScale(['H', 'B', 'C5'])).to.be(false)
    })
  })

  describe('.fromIntervals()', () => {
    it('returns a scale from a root note and an array of intervals', () => {
      expect(scales.fromIntervals('C', ['foo', 'bar', 'baz'])).to.eql([])

      expect(scales.fromIntervals('C', ['maj2', 'maj3', 'perf4'])).to.eql([
        'C', 'D', 'E', 'F'
      ])
    })
  })

  describe('.toIntervalNames()', () => {
    it('returns an array with a root note and the interval names', () => {
      expect(scales.toIntervalNames(['C', 'K', 'J', 'F'])).to.eql([])

      expect(scales.toIntervalNames(['C', 'D', 'E', 'F'])).to.eql([
        'C', 'maj2', 'maj3', 'perf4'
      ])
    })
  })

  describe('.toIntervalDistances()', () => {
    it('returns an array with a root note and the interval distances', () => {
      expect(scales.toIntervalDistances(['C', 'K', 'J', 'F'])).to.eql([])

      expect(scales.toIntervalDistances(['C', 'D', 'E', 'F'])).to.eql([
        'C', 2, 4, 5
      ])
    })
  })

  describe('.transpose()', () => {
    it('changes the root note and transposes the scale', () => {
      expect(scales.transpose('J', ['C', 'D', 'E', 'F'])).to.eql([])
      expect(scales.transpose('A', ['C', 'K', 'J', 'F'])).to.eql([])

      expect(scales.transpose('A', ['C', 'D', 'E', 'F'])).to.eql([
        'A', 'B', 'C#', 'D'
      ])
    })
  })
})
