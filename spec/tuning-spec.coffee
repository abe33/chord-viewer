Tuning = require '../src/tuning'
Note = require '../src/note'

describe 'Tuning', ->
  [tuning] = []

  beforeEach ->
    tuning = new Tuning([
      new Note('E')
      new Note('A')
      new Note('D5')
      new Note('G5')
      new Note('B6')
      new Note('E6')
    ])

  it 'has a collection of notes', ->
    expect(tuning.getLength()).toEqual(6)

  it 'has a name derived from its note', ->
    expect(tuning.getName()).toEqual('EADGBE')

  it 'creates a tuning with only the note names', ->
    tuning = new Tuning(['E','A','D5','G5','B6','E6'])

    expect(tuning.getNotes()).toEqual([
      new Note('E')
      new Note('A')
      new Note('D5')
      new Note('G5')
      new Note('B6')
      new Note('E6')
    ])

  describe '::equals', ->
    it 'returns true when two tunings use the same notes', ->
      tuning2 = new Tuning([
        new Note('E')
        new Note('A')
        new Note('D5')
        new Note('G5')
        new Note('B6')
        new Note('E6')
      ])

      expect(tuning.equals(tuning2)).toBeTruthy()

    it 'returns true when two tunings has notes with the same pitch', ->
      tuning1 = new Tuning([
        new Note('Eb')
        new Note('F#')
        new Note('C#')
      ])

      tuning2 = new Tuning([
        new Note('D#')
        new Note('Gb')
        new Note('Db')
      ])

      expect(tuning1.equals(tuning2)).toBeTruthy()

    it 'returns false when the two tunings does not have the same notes', ->
      tuning2 = new Tuning([
        new Note('E')
        new Note('A')
        new Note('B5')
        new Note('G5')
        new Note('B6')
        new Note('E6')
      ])

      expect(tuning.equals(tuning2)).toBeFalsy()

    it 'returns false when the two tunings does not have the same length', ->
      tuning2 = new Tuning([
        new Note('E')
        new Note('A')
        new Note('D5')
        new Note('G5')
        new Note('B6')
      ])

      expect(tuning.equals(tuning2)).toBeFalsy()

  describe '::pitchBySemitone', ->
    it 'pitches all the note in the tuning', ->
      expect(tuning.pitchBySemitone(2).getNotes()).toEqual([
        new Note('E')
        new Note('A')
        new Note('D5')
        new Note('G5')
        new Note('B6')
        new Note('E6')
      ].map (n) -> n.pitchBySemitone(2))

  describe '::stringToIndex', ->
    it 'converts string to index for a four strings tuning', ->
      tuning = new Tuning(['E','A','D5','G5'])
      expect(tuning.stringToIndex(4)).toEqual(0)
      expect(tuning.stringToIndex(3)).toEqual(1)
      expect(tuning.stringToIndex(2)).toEqual(2)
      expect(tuning.stringToIndex(1)).toEqual(3)

      expect(tuning.stringToIndex(5)).toEqual(-1)
      expect(tuning.stringToIndex(0)).toEqual(-1)

    it 'converts string to index for a six strings tuning', ->
      tuning = new Tuning(['E','A','D5','G5','B6','E6'])

      expect(tuning.stringToIndex(6)).toEqual(0)
      expect(tuning.stringToIndex(5)).toEqual(1)
      expect(tuning.stringToIndex(4)).toEqual(2)
      expect(tuning.stringToIndex(3)).toEqual(3)
      expect(tuning.stringToIndex(2)).toEqual(4)
      expect(tuning.stringToIndex(1)).toEqual(5)

      expect(tuning.stringToIndex(7)).toEqual(-1)
      expect(tuning.stringToIndex(0)).toEqual(-1)

  describe '::indexToString', ->
    it 'converts string to index for a four strings tuning', ->
      tuning = new Tuning(['E','A','D5','G5'])
      expect(tuning.indexToString(0)).toEqual(4)
      expect(tuning.indexToString(1)).toEqual(3)
      expect(tuning.indexToString(2)).toEqual(2)
      expect(tuning.indexToString(3)).toEqual(1)

      expect(tuning.indexToString(4)).toEqual(-1)

    it 'converts string to index for a six strings tuning', ->
      tuning = new Tuning(['E','A','D5','G5','B6','E6'])

      expect(tuning.indexToString(0)).toEqual(6)
      expect(tuning.indexToString(1)).toEqual(5)
      expect(tuning.indexToString(2)).toEqual(4)
      expect(tuning.indexToString(3)).toEqual(3)
      expect(tuning.indexToString(4)).toEqual(2)
      expect(tuning.indexToString(5)).toEqual(1)

      expect(tuning.indexToString(6)).toEqual(-1)
