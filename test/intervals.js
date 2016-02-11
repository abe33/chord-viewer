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

  describe('.quality()', () => {
    it('returns the quality name of an interval', () => {
      expect(intervals.quality([])).to.eql('')
      expect(intervals.quality(['C'])).to.eql('')
      expect(intervals.quality(['I', 'C#'])).to.eql('')

      expect(intervals.quality(['C', 'C#'])).to.eql('augmented')
      expect(intervals.quality(['C', 'Db'])).to.eql('minor')
      expect(intervals.quality(['C', 'D'])).to.eql('major')
    })
  })

  describe('.intervalName()', () => {
    it('returns the long interval name', () => {
      expect(intervals.intervalName([])).to.eql('')
      expect(intervals.intervalName(['C'])).to.eql('')
      expect(intervals.intervalName(['I', 'C#'])).to.eql('')

      expect(intervals.intervalName(['C', 'C#'])).to.eql('aug1')
      expect(intervals.intervalName(['C', 'Db'])).to.eql('min2')
      expect(intervals.intervalName(['C', 'D'])).to.eql('maj2')
      expect(intervals.intervalName(['C', 'D#'])).to.eql('aug2')
      expect(intervals.intervalName(['C', 'Eb'])).to.eql('min3')
      expect(intervals.intervalName(['C', 'E'])).to.eql('maj3')
      expect(intervals.intervalName(['C', 'F'])).to.eql('perf4')
      expect(intervals.intervalName(['C', 'F#'])).to.eql('aug4')
      expect(intervals.intervalName(['C', 'Gb'])).to.eql('dim5')
      expect(intervals.intervalName(['C', 'G'])).to.eql('perf5')
      expect(intervals.intervalName(['C', 'G#'])).to.eql('aug5')
      expect(intervals.intervalName(['C', 'Ab'])).to.eql('min6')
      expect(intervals.intervalName(['C', 'A'])).to.eql('maj6')
      expect(intervals.intervalName(['C', 'A#'])).to.eql('aug6')
      expect(intervals.intervalName(['C', 'Bb'])).to.eql('min7')
      expect(intervals.intervalName(['C', 'B'])).to.eql('maj7')

      expect(intervals.intervalName(['Gb', 'A#'])).to.eql('aug2')
      expect(intervals.intervalName(['A', 'Db'])).to.eql('dim4')
    })
  })

  describe('.shortIntervalName()', () => {
    it('returns the short interval name', () => {
      expect(intervals.shortIntervalName([])).to.eql('')
      expect(intervals.shortIntervalName(['C'])).to.eql('')
      expect(intervals.shortIntervalName(['I', 'C#'])).to.eql('')

      expect(intervals.shortIntervalName(['C', 'C#'])).to.eql('A1')
      expect(intervals.shortIntervalName(['C', 'Db'])).to.eql('m2')
      expect(intervals.shortIntervalName(['C', 'D'])).to.eql('M2')
      expect(intervals.shortIntervalName(['C', 'D#'])).to.eql('A2')
      expect(intervals.shortIntervalName(['C', 'Eb'])).to.eql('m3')
      expect(intervals.shortIntervalName(['C', 'E'])).to.eql('M3')
      expect(intervals.shortIntervalName(['C', 'F'])).to.eql('P4')
      expect(intervals.shortIntervalName(['C', 'F#'])).to.eql('A4')
      expect(intervals.shortIntervalName(['C', 'Gb'])).to.eql('d5')
      expect(intervals.shortIntervalName(['C', 'G'])).to.eql('P5')
      expect(intervals.shortIntervalName(['C', 'G#'])).to.eql('A5')
      expect(intervals.shortIntervalName(['C', 'Ab'])).to.eql('m6')
      expect(intervals.shortIntervalName(['C', 'A'])).to.eql('M6')
      expect(intervals.shortIntervalName(['C', 'A#'])).to.eql('A6')
      expect(intervals.shortIntervalName(['C', 'Bb'])).to.eql('m7')
      expect(intervals.shortIntervalName(['C', 'B'])).to.eql('M7')

      expect(intervals.shortIntervalName(['Gb', 'A#'])).to.eql('A2')
      expect(intervals.shortIntervalName(['A', 'Db'])).to.eql('d4')
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
