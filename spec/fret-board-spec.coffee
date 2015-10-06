FretBoard = require '../src/fret-board'
Tuning = require '../src/tuning'
Note = require '../src/note'

describe 'FretBoard', ->
  [fretboard, tuning] = []

  beforeEach ->
    tuning = new Tuning([
      new Note('E')
      new Note('A')
      new Note('D5')
      new Note('G5')
      new Note('B6')
      new Note('E6')
    ])

    fretboard = new FretBoard({tuning, fretCount: 20})

  it 'has a tuning', ->
    expect(fretboard.getTuning()).toEqual(tuning)

  it 'has a fret count', ->
    expect(fretboard.getFretCount()).toEqual(20)

  describe '::getNote', ->
    it 'returns the tuning notes for the fret 0 of each string', ->
      expect(fretboard.getNote([6,0])).toEqual(new Note('E'))
      expect(fretboard.getNote([5,0])).toEqual(new Note('A'))
      expect(fretboard.getNote([4,0])).toEqual(new Note('D5'))
      expect(fretboard.getNote([3,0])).toEqual(new Note('G5'))
      expect(fretboard.getNote([2,0])).toEqual(new Note('B6'))
      expect(fretboard.getNote([1,0])).toEqual(new Note('E6'))

    it 'pitches the string notes based on the passed-in fret', ->
      expect(fretboard.getNote([6,3])).toEqual(new Note('G'))
      expect(fretboard.getNote([5,2])).toEqual(new Note('B'))
      expect(fretboard.getNote([4,2])).toEqual(new Note('E5'))
      expect(fretboard.getNote([3,1])).toEqual(new Note('G#5'))
