import expect from 'expect.js'
import Note from '../src/note'
import Interval from '../src/interval'

describe('Interval', () => {
  describe('creation', () => {
    it('creates an interval using a note and a semitone distance number', () => {
      var interval = new Interval('A', 3)
      expect(interval.start).to.eql(new Note('A'))
      expect(interval.end).to.eql(new Note('C'))

      interval = new Interval(new Note('A'), 3)
      expect(interval.start).to.eql(new Note('A'))
      expect(interval.end).to.eql(new Note('C'))
    })

    it('creates an interval using a note and an interval name', () => {
      var interval = new Interval('A', 'min3')
      expect(interval.start).to.eql(new Note('A'))
      expect(interval.end).to.eql(new Note('C'))

      interval = new Interval('A', 'M3')
      expect(interval.start).to.eql(new Note('A'))
      expect(interval.end).to.eql(new Note('C#5'))

      interval = new Interval(new Note('A'), 'P5')
      expect(interval.start).to.eql(new Note('A'))
      expect(interval.end).to.eql(new Note('E5'))
    })

    it('creates an interval using two notes', () => {
      var interval = new Interval('A', 'C')
      expect(interval.start).to.eql(new Note('A'))
      expect(interval.end).to.eql(new Note('C'))

      interval = new Interval(new Note('A'), new Note('C'))
      expect(interval.start).to.eql(new Note('A'))
      expect(interval.end).to.eql(new Note('C'))
    })
  })

  describe('.getShortName', () => {
    it('returns the proper short name of the interval', () => {
      expect(new Interval('C', 'C#').getShortName()).to.eql('A1')
      expect(new Interval('C', 'Db').getShortName()).to.eql('m2')
      expect(new Interval('C', 'D').getShortName()).to.eql('M2')
      expect(new Interval('C', 'D#').getShortName()).to.eql('A2')
      expect(new Interval('C', 'Eb').getShortName()).to.eql('m3')
      expect(new Interval('C', 'E').getShortName()).to.eql('M3')
      expect(new Interval('C', 'F').getShortName()).to.eql('P4')
      expect(new Interval('C', 'F#').getShortName()).to.eql('A4')
      expect(new Interval('C', 'Gb').getShortName()).to.eql('d5')
      expect(new Interval('C', 'G').getShortName()).to.eql('P5')
      expect(new Interval('C', 'G#').getShortName()).to.eql('A5')
      expect(new Interval('C', 'Ab').getShortName()).to.eql('m6')
      expect(new Interval('C', 'A').getShortName()).to.eql('M6')
      expect(new Interval('C', 'A#').getShortName()).to.eql('A6')
      expect(new Interval('C', 'Bb').getShortName()).to.eql('m7')
      expect(new Interval('C', 'B').getShortName()).to.eql('M7')

      expect(new Interval('Gb', 'A#').getShortName()).to.eql('A2')
      expect(new Interval('A', 'Db').getShortName()).to.eql('d4')
    })
  })

  describe('.getLongName', () => {
    it('returns the proper short name of the interval', () => {
      expect(new Interval('C', 'C#').getLongName()).to.eql('aug1')
      expect(new Interval('C', 'Db').getLongName()).to.eql('min2')
      expect(new Interval('C', 'D').getLongName()).to.eql('maj2')
      expect(new Interval('C', 'D#').getLongName()).to.eql('aug2')
      expect(new Interval('C', 'Eb').getLongName()).to.eql('min3')
      expect(new Interval('C', 'E').getLongName()).to.eql('maj3')
      expect(new Interval('C', 'F').getLongName()).to.eql('perf4')
      expect(new Interval('C', 'F#').getLongName()).to.eql('aug4')
      expect(new Interval('C', 'Gb').getLongName()).to.eql('dim5')
      expect(new Interval('C', 'G').getLongName()).to.eql('perf5')
      expect(new Interval('C', 'G#').getLongName()).to.eql('aug5')
      expect(new Interval('C', 'Ab').getLongName()).to.eql('min6')
      expect(new Interval('C', 'A').getLongName()).to.eql('maj6')
      expect(new Interval('C', 'A#').getLongName()).to.eql('aug6')
      expect(new Interval('C', 'Bb').getLongName()).to.eql('min7')
      expect(new Interval('C', 'B').getLongName()).to.eql('maj7')

      expect(new Interval('Gb', 'A#').getLongName()).to.eql('aug2')
      expect(new Interval('A', 'Db').getLongName()).to.eql('dim4')
    })
  })
})
