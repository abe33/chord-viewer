import expect from 'expect.js'
import notes from '../src/notes'

describe('notes', () => {
  describe('.isNote()', () => {
    const octaveNames = 'A B C D E F G a b c d e f g'.split(' ')

    octaveNames.forEach((octaveName) => {
      it(`matches all variants of ${octaveName}`, () => {
        expect(notes.isNote(`${octaveName}`)).to.be(true)
        expect(notes.isNote(`${octaveName}4`)).to.be(true)
        expect(notes.isNote(`${octaveName}b`)).to.be(true)
        expect(notes.isNote(`${octaveName}#`)).to.be(true)
        expect(notes.isNote(`${octaveName}b4`)).to.be(true)
        expect(notes.isNote(`${octaveName}#4`)).to.be(true)
        expect(notes.isNote(`${octaveName}#10`)).to.be(true)
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

  describe('', () => {

  })
})
