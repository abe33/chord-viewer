import expect from 'expect.js'
import notes from '../src/notes'

describe('notes', () => {
  describe('.isNote()', () => {
    const letterNames = 'A B C D E F G a b c d e f g'.split(' ')

    letterNames.forEach((letterName) => {
      it(`matches all variants of ${letterName}`, () => {
        expect(notes.isNote(`${letterName}`)).to.be(true)
        expect(notes.isNote(`${letterName}4`)).to.be(true)
        expect(notes.isNote(`${letterName}b`)).to.be(true)
        expect(notes.isNote(`${letterName}#`)).to.be(true)
        expect(notes.isNote(`${letterName}b4`)).to.be(true)
        expect(notes.isNote(`${letterName}#4`)).to.be(true)
        expect(notes.isNote(`${letterName}#10`)).to.be(true)
      })
    })

    it('does not match letters that are not octave name', () => {
      expect(notes.isNote('I')).to.be.false
      expect(notes.isNote('Ib')).to.be.false
      expect(notes.isNote('I#')).to.be.false
      expect(notes.isNote('Z4')).to.be.false
      expect(notes.isNote('Z#4')).to.be.false
    })

    it('does not match strings with invalid octave number', () => {
      expect(notes.isNote('A-1')).to.be.false
      expect(notes.isNote('Bb-1')).to.be.false
    })

    it('does not match strings with invalid accidental characters', () => {
      expect(notes.isNote('Ac')).to.be.false
      expect(notes.isNote('Bd')).to.be.false
    })
  })

  describe('.letter()', () => {
    it('returns the octave letter name', () => {
      expect(notes.letter('A')).to.eql('A')
      expect(notes.letter('B4')).to.eql('B')
      expect(notes.letter('Cb')).to.eql('C')
      expect(notes.letter('D#')).to.eql('D')
      expect(notes.letter('Eb4')).to.eql('E')
      expect(notes.letter('F#4')).to.eql('F')
    })
  })

  describe('.accidental()', () => {
    it('returns the accidental for notes that have one', () => {
      expect(notes.accidental('A')).to.eql('')
      expect(notes.accidental('Ab')).to.eql('b')
      expect(notes.accidental('A#')).to.eql('#')
      expect(notes.accidental('Ab4')).to.eql('b')
      expect(notes.accidental('A#4')).to.eql('#')
    })
  })

  describe('.octave', () => {
    it('returns the octave number of the note', () => {
      expect(notes.octave('A')).to.eql(4)
      expect(notes.octave('B4')).to.eql(4)
      expect(notes.octave('C#8')).to.eql(8)
      expect(notes.octave('D#1')).to.eql(1)
    })
  })
})
