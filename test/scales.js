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

  describe('.fromRelativeIntervals()', () => {
    it('returns a scale from a root note and an array of intervals', () => {
      expect(scales.fromRelativeIntervals('C', [
        'foo', 'bar', 'baz'
      ])).to.eql([])

      expect(scales.fromRelativeIntervals('E', [
        'perf4', 'perf4', 'perf4'
      ])).to.eql([
        'E', 'A', 'D', 'G'
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

  describe('.toRelativeIntervalNames()', () => {
    it('returns an array with a root note and the interval name from one note to the next', () => {
      expect(scales.toRelativeIntervalNames(['C', 'K', 'J', 'F'])).to.eql([])

      expect(scales.toRelativeIntervalNames(['E', 'A', 'D', 'G'])).to.eql([
        'E', 'perf4', 'perf4', 'perf4'
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

  describe('.toRelativeIntervalDistances()', () => {
    it('returns an array with a root note and the interval distance from one note to the next', () => {
      expect(scales.toRelativeIntervalDistances(['C', 'K', 'J', 'F'])).to.eql([])

      expect(scales.toRelativeIntervalDistances(['E', 'A', 'D', 'G'])).to.eql([
        'E', 5, 5, 5
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

  describe('.enharmonicSpelling()', () => {
    it('converts the notes in a scale so that the scale become enharmonically correct', () => {
      expect(scales.enharmonicSpelling(['C', 'K', 'J', 'F'])).to.eql([])

      expect(scales.enharmonicSpelling(['C', 'D', 'D#', 'E#'])).to.eql([
        'C', 'D', 'Eb', 'F'
      ])
    })
  })
})
