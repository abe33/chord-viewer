import expect from 'expect.js'
import Tuning from '../../src/legacy/tuning'
import Note from '../../src/legacy/note'

describe('Tuning', () => {
  let [tuning] = []

  beforeEach(() => {
    tuning = new Tuning([
      new Note('E'),
      new Note('A'),
      new Note('D5'),
      new Note('G5'),
      new Note('B6'),
      new Note('E6')
    ])
  })

  it('has a collection of notes', () => {
    expect(tuning.getLength()).to.eql(6)
  })

  it('has a name derived from its note', () => {
    expect(tuning.getName()).to.eql('EADGBE')
  })

  it('creates a tuning with only the note names', () => {
    tuning = new Tuning(['E', 'A', 'D5', 'G5', 'B6', 'E6'])

    expect(tuning.getNotes()).to.eql([
      new Note('E'),
      new Note('A'),
      new Note('D5'),
      new Note('G5'),
      new Note('B6'),
      new Note('E6')
    ])
  })

  describe('.equals', () => {
    it('returns true when two tunings use the same notes', () => {
      let tuning2 = new Tuning([
        new Note('E'),
        new Note('A'),
        new Note('D5'),
        new Note('G5'),
        new Note('B6'),
        new Note('E6')
      ])

      expect(tuning.equals(tuning2)).to.eql(true)
    })

    it('returns true when two tunings has notes with the same transpose', () => {
      let tuning1 = new Tuning([
        new Note('Eb'),
        new Note('F#'),
        new Note('C#')
      ])

      let tuning2 = new Tuning([
        new Note('D#'),
        new Note('Gb'),
        new Note('Db')
      ])

      expect(tuning1.equals(tuning2)).to.eql(true)
    })

    it('returns false when the two tunings does not have the same notes', () => {
      let tuning2 = new Tuning([
        new Note('E'),
        new Note('A'),
        new Note('B5'),
        new Note('G5'),
        new Note('B6'),
        new Note('E6')
      ])

      expect(tuning.equals(tuning2)).to.eql(false)
    })

    it('returns false when the two tunings does not have the same length', () => {
      let tuning2 = new Tuning([
        new Note('E'),
        new Note('A'),
        new Note('D5'),
        new Note('G5'),
        new Note('B6')
      ])

      expect(tuning.equals(tuning2)).to.eql(false)
    })
  })

  describe('.transposeBySemitone', () => {
    it('transposes all the note in the tuning', () => {
      expect(tuning.transposeBySemitone(2).getNotes()).to.eql([
        new Note('E'),
        new Note('A'),
        new Note('D5'),
        new Note('G5'),
        new Note('B6'),
        new Note('E6')
      ].map(n => n.transposeBySemitone(2)))
    })
  })

  describe('.stringToIndex', () => {
    it('converts string to index for a four strings tuning', () => {
      tuning = new Tuning(['E', 'A', 'D5', 'G5'])
      expect(tuning.stringToIndex(4)).to.eql(0)
      expect(tuning.stringToIndex(3)).to.eql(1)
      expect(tuning.stringToIndex(2)).to.eql(2)
      expect(tuning.stringToIndex(1)).to.eql(3)

      expect(tuning.stringToIndex(5)).to.eql(-1)
      expect(tuning.stringToIndex(0)).to.eql(-1)
    })

    it('converts string to index for a six strings tuning', () => {
      tuning = new Tuning(['E', 'A', 'D5', 'G5', 'B6', 'E6'])

      expect(tuning.stringToIndex(6)).to.eql(0)
      expect(tuning.stringToIndex(5)).to.eql(1)
      expect(tuning.stringToIndex(4)).to.eql(2)
      expect(tuning.stringToIndex(3)).to.eql(3)
      expect(tuning.stringToIndex(2)).to.eql(4)
      expect(tuning.stringToIndex(1)).to.eql(5)

      expect(tuning.stringToIndex(7)).to.eql(-1)
      expect(tuning.stringToIndex(0)).to.eql(-1)
    })
  })

  describe('.indexToString', () => {
    it('converts string to index for a four strings tuning', () => {
      tuning = new Tuning(['E', 'A', 'D5', 'G5'])
      expect(tuning.indexToString(0)).to.eql(4)
      expect(tuning.indexToString(1)).to.eql(3)
      expect(tuning.indexToString(2)).to.eql(2)
      expect(tuning.indexToString(3)).to.eql(1)

      expect(tuning.indexToString(4)).to.eql(-1)
    })

    it('converts string to index for a six strings tuning', () => {
      tuning = new Tuning(['E', 'A', 'D5', 'G5', 'B6', 'E6'])

      expect(tuning.indexToString(0)).to.eql(6)
      expect(tuning.indexToString(1)).to.eql(5)
      expect(tuning.indexToString(2)).to.eql(4)
      expect(tuning.indexToString(3)).to.eql(3)
      expect(tuning.indexToString(4)).to.eql(2)
      expect(tuning.indexToString(5)).to.eql(1)

      expect(tuning.indexToString(6)).to.eql(-1)
    })
  })
})
