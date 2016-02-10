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
      expect(notes.isNote('I')).to.be(false)
      expect(notes.isNote('Ib')).to.be(false)
      expect(notes.isNote('I#')).to.be(false)
      expect(notes.isNote('Z4')).to.be(false)
      expect(notes.isNote('Z#4')).to.be(false)
    })

    it('does not match strings with invalid octave number', () => {
      expect(notes.isNote('A-1')).to.be(false)
      expect(notes.isNote('Bb-1')).to.be(false)
    })

    it('does not match strings with invalid accidental characters', () => {
      expect(notes.isNote('Ac')).to.be(false)
      expect(notes.isNote('Bd')).to.be(false)
    })
  })

  describe('.name()', () => {
    it('returns the note name', () => {
      expect(notes.name('I')).to.eql('')
      expect(notes.name('A')).to.eql('A')
      expect(notes.name('a')).to.eql('A')
      expect(notes.name('B4')).to.eql('B')
      expect(notes.name('Cb')).to.eql('Cb')
      expect(notes.name('cb')).to.eql('Cb')
      expect(notes.name('D#')).to.eql('D#')
      expect(notes.name('Eb4')).to.eql('Eb')
      expect(notes.name('F#4')).to.eql('F#')
    })
  })

  describe('.letter()', () => {
    it('returns the octave letter name', () => {
      expect(notes.letter('I')).to.eql('')
      expect(notes.letter('A')).to.eql('A')
      expect(notes.letter('a')).to.eql('A')
      expect(notes.letter('B4')).to.eql('B')
      expect(notes.letter('Cb')).to.eql('C')
      expect(notes.letter('cb')).to.eql('C')
      expect(notes.letter('D#')).to.eql('D')
      expect(notes.letter('Eb4')).to.eql('E')
      expect(notes.letter('F#4')).to.eql('F')
    })
  })

  describe('.accidental()', () => {
    it('returns the accidental for notes that have one', () => {
      expect(notes.accidental('A')).to.eql('')
      expect(notes.accidental('B')).to.eql('')
      expect(notes.accidental('B4')).to.eql('')
      expect(notes.accidental('Bb')).to.eql('b')
      expect(notes.accidental('BB')).to.eql('b')
      expect(notes.accidental('AB')).to.eql('b')
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

  describe('.normalize()', () => {
    it('returns the normalized form of the passed-in note', () => {
      expect(notes.normalize('H-1')).to.eql('')
      expect(notes.normalize('A')).to.eql('A4')
      expect(notes.normalize('AB')).to.eql('Ab4')
      expect(notes.normalize('bB4')).to.eql('Bb4')
      expect(notes.normalize('C#8')).to.eql('C#8')
    })
  })

  describe('.frequency()', () => {
    it('returns the frequency for each note', () => {
      expect(notes.frequency('C')).to.eql(261.63)
      expect(notes.frequency('C#')).to.eql(277.18)
      expect(notes.frequency('Db')).to.eql(277.18)
      expect(notes.frequency('D')).to.eql(293.66)
      expect(notes.frequency('D#')).to.eql(311.13)
      expect(notes.frequency('Eb')).to.eql(311.13)
      expect(notes.frequency('E')).to.eql(329.63)
      expect(notes.frequency('F')).to.eql(349.23)
      expect(notes.frequency('F#')).to.eql(369.99)
      expect(notes.frequency('Gb')).to.eql(369.99)
      expect(notes.frequency('G')).to.eql(392.00)
      expect(notes.frequency('G#')).to.eql(415.30)
      expect(notes.frequency('Ab')).to.eql(415.30)
      expect(notes.frequency('A')).to.eql(440)
      expect(notes.frequency('A#')).to.eql(466.16)
      expect(notes.frequency('Bb')).to.eql(466.16)
      expect(notes.frequency('B')).to.eql(493.88)
    })

    it('modulates the frequency pitch based on the note octave', () => {
      expect(notes.frequency('C2')).to.eql(261.63 / 4)
      expect(notes.frequency('C3')).to.eql(261.63 / 2)
      expect(notes.frequency('C4')).to.eql(261.63)
      expect(notes.frequency('C5')).to.eql(261.63 * 2)
      expect(notes.frequency('C6')).to.eql(261.63 * 4)
    })

    it('returns no frequency for invalid notes', () => {
      expect(notes.frequency('U')).to.eql(0)
      expect(notes.frequency('A-1')).to.eql(0)
    })
  })

  describe('.display()', () => {
    it('returns a displayable string with proper accidental characters', () => {
      expect(notes.display('C')).to.eql('C₄')
      expect(notes.display('c#')).to.eql('C♯₄')
      expect(notes.display('Db')).to.eql('D♭₄')
      expect(notes.display('D')).to.eql('D₄')
      expect(notes.display('D#')).to.eql('D♯₄')
      expect(notes.display('Eb')).to.eql('E♭₄')
      expect(notes.display('E')).to.eql('E₄')
      expect(notes.display('F')).to.eql('F₄')
      expect(notes.display('F#')).to.eql('F♯₄')
      expect(notes.display('Gb')).to.eql('G♭₄')
      expect(notes.display('G')).to.eql('G₄')
      expect(notes.display('G#')).to.eql('G♯₄')
      expect(notes.display('Ab')).to.eql('A♭₄')
      expect(notes.display('A')).to.eql('A₄')
      expect(notes.display('A#')).to.eql('A♯₄')
      expect(notes.display('bB')).to.eql('B♭₄')
      expect(notes.display('B')).to.eql('B₄')
    })

    it('returns an empty string for invalid notes', () => {
      expect(notes.display('I')).to.eql('')
      expect(notes.display('C-1')).to.eql('')
    })
  })

  describe('.noteEquals()', () => {
    it('returns true for two A on different octaves', () => {
      expect(notes.noteEquals('A', 'A5')).to.be(true)
    })

    it('returns false for two notes with different pitch', () => {
      expect(notes.noteEquals('A', 'B')).to.be(false)
    })

    it('returns true for a A sharp and a B flat on different octaves', () => {
      expect(notes.noteEquals('A#', 'Bb5')).to.be(true)
    })
  })

  describe('.pitchEquals()', () => {
    it('returns true for two identical notes', () => {
      expect(notes.pitchEquals('A', 'A')).to.be(true)
    })

    it('returns false for two notes with different frequencies', () => {
      expect(notes.pitchEquals('A', 'B')).to.be(false)
    })

    it('returns true for two notes with equals frequencies but different names', () => {
      expect(notes.pitchEquals('A#', 'Bb')).to.be(true)
    })
  })

  describe('.transposeToOctave()', () => {
    it('transposes the passed-in note at the specified octave', () => {
      expect(notes.transposeToOctave(5, 'I')).to.eql('')
      expect(notes.transposeToOctave(5, 'A')).to.eql('A5')
      expect(notes.transposeToOctave(3, 'A')).to.eql('A3')
      expect(notes.transposeToOctave(5, 'A3')).to.eql('A5')
    })
  })

  describe('.transposeBySemitone()', () => {
    it('transposes the passed-in note by the specified semitones interval', () => {
      // expect(notes.transposeBySemitone(1, 'I')).to.eql('')
      // expect(notes.transposeBySemitone(-1, 'A')).to.eql('G#4')
      // expect(notes.transposeBySemitone(0, 'A')).to.eql('A4')
      // expect(notes.transposeBySemitone(1, 'A')).to.eql('A#4')
      expect(notes.transposeBySemitone(1, 'B')).to.eql('C5')
      expect(notes.transposeBySemitone(2, 'A')).to.eql('B4')
      expect(notes.transposeBySemitone(4, 'A')).to.eql('C#5')
      expect(notes.transposeBySemitone(16, 'A')).to.eql('C#6')
    })
  })
})
