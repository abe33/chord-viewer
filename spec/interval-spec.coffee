Note = require '../src/note'
Interval = require '../src/interval'

describe 'Interval', ->
  describe 'creation', ->
    it 'creates an interval using a note and a semitone distance number', ->
      interval = new Interval('A', 3)
      expect(interval.start).toEqual(new Note('A'))
      expect(interval.end).toEqual(new Note('C'))

      interval = new Interval(new Note('A'), 3)
      expect(interval.start).toEqual(new Note('A'))
      expect(interval.end).toEqual(new Note('C'))

    it 'creates an interval using a note and an interval name', ->
      interval = new Interval('A', 'min3')
      expect(interval.start).toEqual(new Note('A'))
      expect(interval.end).toEqual(new Note('C'))

      interval = new Interval('A', 'M3')
      expect(interval.start).toEqual(new Note('A'))
      expect(interval.end).toEqual(new Note('C#5'))

      interval = new Interval(new Note('A'), 'P5')
      expect(interval.start).toEqual(new Note('A'))
      expect(interval.end).toEqual(new Note('E5'))

    it 'creates an interval using two notes', ->
      interval = new Interval('A', 'C')
      expect(interval.start).toEqual(new Note('A'))
      expect(interval.end).toEqual(new Note('C'))

      interval = new Interval(new Note('A'), new Note('C'))
      expect(interval.start).toEqual(new Note('A'))
      expect(interval.end).toEqual(new Note('C'))

  describe '::getShortName', ->
    it 'returns the proper short name of the interval', ->
      expect(new Interval('C', 'C#').getShortName()).toEqual('A1')
      expect(new Interval('C', 'Db').getShortName()).toEqual('m2')
      expect(new Interval('C', 'D').getShortName()).toEqual('M2')
      expect(new Interval('C', 'D#').getShortName()).toEqual('A2')
      expect(new Interval('C', 'Eb').getShortName()).toEqual('m3')
      expect(new Interval('C', 'E').getShortName()).toEqual('M3')
      expect(new Interval('C', 'F').getShortName()).toEqual('P4')
      expect(new Interval('C', 'F#').getShortName()).toEqual('A4')
      expect(new Interval('C', 'Gb').getShortName()).toEqual('d5')
      expect(new Interval('C', 'G').getShortName()).toEqual('P5')
      expect(new Interval('C', 'G#').getShortName()).toEqual('A5')
      expect(new Interval('C', 'Ab').getShortName()).toEqual('m6')
      expect(new Interval('C', 'A').getShortName()).toEqual('M6')
      expect(new Interval('C', 'A#').getShortName()).toEqual('A6')
      expect(new Interval('C', 'Bb').getShortName()).toEqual('m7')
      expect(new Interval('C', 'B').getShortName()).toEqual('M7')

      expect(new Interval('Gb', 'A#').getShortName()).toEqual('A2')
      expect(new Interval('A', 'Db').getShortName()).toEqual('d4')

  describe '::getLongName', ->
    it 'returns the proper short name of the interval', ->
      expect(new Interval('C', 'C#').getLongName()).toEqual('aug1')
      expect(new Interval('C', 'Db').getLongName()).toEqual('min2')
      expect(new Interval('C', 'D').getLongName()).toEqual('maj2')
      expect(new Interval('C', 'D#').getLongName()).toEqual('aug2')
      expect(new Interval('C', 'Eb').getLongName()).toEqual('min3')
      expect(new Interval('C', 'E').getLongName()).toEqual('maj3')
      expect(new Interval('C', 'F').getLongName()).toEqual('perf4')
      expect(new Interval('C', 'F#').getLongName()).toEqual('aug4')
      expect(new Interval('C', 'Gb').getLongName()).toEqual('dim5')
      expect(new Interval('C', 'G').getLongName()).toEqual('perf5')
      expect(new Interval('C', 'G#').getLongName()).toEqual('aug5')
      expect(new Interval('C', 'Ab').getLongName()).toEqual('min6')
      expect(new Interval('C', 'A').getLongName()).toEqual('maj6')
      expect(new Interval('C', 'A#').getLongName()).toEqual('aug6')
      expect(new Interval('C', 'Bb').getLongName()).toEqual('min7')
      expect(new Interval('C', 'B').getLongName()).toEqual('maj7')

      expect(new Interval('Gb', 'A#').getLongName()).toEqual('aug2')
      expect(new Interval('A', 'Db').getLongName()).toEqual('dim4')
