import expect from 'expect.js'
import intervals from '../src/intervals'

describe('intervals', () => {
  describe('.isInterval()', () => {
    it('matches a tuple of notes', () => {
      expect(intervals.isInterval([])).to.be(false)
      expect(intervals.isInterval(['A'])).to.be(false)
      expect(intervals.isInterval(['I', 'B'])).to.be(false)
      expect(intervals.isInterval(['A', 'I'])).to.be(false)

      expect(intervals.isInterval(['A', 'B'])).to.be(true)
      expect(intervals.isInterval(['D#4', 'Eb5'])).to.be(true)
    })
  })

  describe('isIntervalName()', () => {
    it('matches valid interval long names', () => {
      expect(intervals.isIntervalName('aug1')).to.be(true)
      expect(intervals.isIntervalName('aug2')).to.be(true)
      expect(intervals.isIntervalName('aug4')).to.be(true)
      expect(intervals.isIntervalName('aug5')).to.be(true)
      expect(intervals.isIntervalName('aug6')).to.be(true)
      expect(intervals.isIntervalName('dim4')).to.be(true)
      expect(intervals.isIntervalName('dim5')).to.be(true)
      expect(intervals.isIntervalName('maj2')).to.be(true)
      expect(intervals.isIntervalName('maj3')).to.be(true)
      expect(intervals.isIntervalName('maj6')).to.be(true)
      expect(intervals.isIntervalName('maj7')).to.be(true)
      expect(intervals.isIntervalName('min2')).to.be(true)
      expect(intervals.isIntervalName('min3')).to.be(true)
      expect(intervals.isIntervalName('min6')).to.be(true)
      expect(intervals.isIntervalName('min7')).to.be(true)
      expect(intervals.isIntervalName('perf4')).to.be(true)
      expect(intervals.isIntervalName('perf5')).to.be(true)
    })

    it('matches valid interval short names', () => {
      expect(intervals.isIntervalName('A1')).to.be(true)
      expect(intervals.isIntervalName('A2')).to.be(true)
      expect(intervals.isIntervalName('A4')).to.be(true)
      expect(intervals.isIntervalName('A5')).to.be(true)
      expect(intervals.isIntervalName('A6')).to.be(true)
      expect(intervals.isIntervalName('d4')).to.be(true)
      expect(intervals.isIntervalName('d5')).to.be(true)
      expect(intervals.isIntervalName('m2')).to.be(true)
      expect(intervals.isIntervalName('M2')).to.be(true)
      expect(intervals.isIntervalName('m3')).to.be(true)
      expect(intervals.isIntervalName('M3')).to.be(true)
      expect(intervals.isIntervalName('m6')).to.be(true)
      expect(intervals.isIntervalName('M6')).to.be(true)
      expect(intervals.isIntervalName('m7')).to.be(true)
      expect(intervals.isIntervalName('M7')).to.be(true)
      expect(intervals.isIntervalName('P4')).to.be(true)
      expect(intervals.isIntervalName('P5')).to.be(true)
    })

    it('does not match invalid interval names', () => {
      expect(intervals.isIntervalName('A8')).to.be(false)
      expect(intervals.isIntervalName('I')).to.be(false)
      expect(intervals.isIntervalName('d3')).to.be(false)
      expect(intervals.isIntervalName('M4')).to.be(false)
      expect(intervals.isIntervalName('P3')).to.be(false)
    })
  })

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
