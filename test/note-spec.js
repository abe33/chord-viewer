import expect from 'expect.js'
import Note from '../src/note'

describe('Note', () => {
  describe('.getFrequency', () => {
    it('sets the proper frequency for each note', () => {
      expect(new Note('C').getFrequency()).to.eql(261.63)
      expect(new Note('C#').getFrequency()).to.eql(277.18)
      expect(new Note('Db').getFrequency()).to.eql(277.18)
      expect(new Note('D').getFrequency()).to.eql(293.66)
      expect(new Note('D#').getFrequency()).to.eql(311.13)
      expect(new Note('Eb').getFrequency()).to.eql(311.13)
      expect(new Note('E').getFrequency()).to.eql(329.63)
      expect(new Note('F').getFrequency()).to.eql(349.23)
      expect(new Note('F#').getFrequency()).to.eql(369.99)
      expect(new Note('Gb').getFrequency()).to.eql(369.99)
      expect(new Note('G').getFrequency()).to.eql(392.00)
      expect(new Note('G#').getFrequency()).to.eql(415.30)
      expect(new Note('Ab').getFrequency()).to.eql(415.30)
      expect(new Note('A').getFrequency()).to.eql(440)
      expect(new Note('A#').getFrequency()).to.eql(466.16)
      expect(new Note('Bb').getFrequency()).to.eql(466.16)
      expect(new Note('B').getFrequency()).to.eql(493.88)
    })
  })

  describe('.getOctave', () => {
    it('returns the note octave', () => {
      expect(new Note('C').getOctave()).to.eql(4)
      expect(new Note('C#').getOctave()).to.eql(4)
      expect(new Note('Db').getOctave()).to.eql(4)
      expect(new Note('D').getOctave()).to.eql(4)
      expect(new Note('D#').getOctave()).to.eql(4)
      expect(new Note('Eb').getOctave()).to.eql(4)
      expect(new Note('E').getOctave()).to.eql(4)
      expect(new Note('F').getOctave()).to.eql(4)
      expect(new Note('F#').getOctave()).to.eql(4)
      expect(new Note('Gb').getOctave()).to.eql(4)
      expect(new Note('G').getOctave()).to.eql(4)
      expect(new Note('G#').getOctave()).to.eql(4)
      expect(new Note('Ab').getOctave()).to.eql(4)
      expect(new Note('A').getOctave()).to.eql(4)
      expect(new Note('A#').getOctave()).to.eql(4)
      expect(new Note('Bb').getOctave()).to.eql(4)
      expect(new Note('B').getOctave()).to.eql(4)
    })
  })

  describe('.getName', () => {
    it('returns the note name with the octave', () => {
      expect(new Note('C').getName()).to.eql('C4')
      expect(new Note('C#').getName()).to.eql('C#4')
      expect(new Note('Db').getName()).to.eql('Db4')
      expect(new Note('D').getName()).to.eql('D4')
      expect(new Note('D#').getName()).to.eql('D#4')
      expect(new Note('Eb').getName()).to.eql('Eb4')
      expect(new Note('E').getName()).to.eql('E4')
      expect(new Note('F').getName()).to.eql('F4')
      expect(new Note('F#').getName()).to.eql('F#4')
      expect(new Note('Gb').getName()).to.eql('Gb4')
      expect(new Note('G').getName()).to.eql('G4')
      expect(new Note('G#').getName()).to.eql('G#4')
      expect(new Note('Ab').getName()).to.eql('Ab4')
      expect(new Note('A').getName()).to.eql('A4')
      expect(new Note('A#').getName()).to.eql('A#4')
      expect(new Note('Bb').getName()).to.eql('Bb4')
      expect(new Note('B').getName()).to.eql('B4')
    })
  })

  describe('.getDisplayName', () => {
    it('returns a displayable name with proper accidental characters', () => {
      expect(new Note('C').getDisplayName()).to.eql('C₄')
      expect(new Note('C#').getDisplayName()).to.eql('C♯₄')
      expect(new Note('Db').getDisplayName()).to.eql('D♭₄')
      expect(new Note('D').getDisplayName()).to.eql('D₄')
      expect(new Note('D#').getDisplayName()).to.eql('D♯₄')
      expect(new Note('Eb').getDisplayName()).to.eql('E♭₄')
      expect(new Note('E').getDisplayName()).to.eql('E₄')
      expect(new Note('F').getDisplayName()).to.eql('F₄')
      expect(new Note('F#').getDisplayName()).to.eql('F♯₄')
      expect(new Note('Gb').getDisplayName()).to.eql('G♭₄')
      expect(new Note('G').getDisplayName()).to.eql('G₄')
      expect(new Note('G#').getDisplayName()).to.eql('G♯₄')
      expect(new Note('Ab').getDisplayName()).to.eql('A♭₄')
      expect(new Note('A').getDisplayName()).to.eql('A₄')
      expect(new Note('A#').getDisplayName()).to.eql('A♯₄')
      expect(new Note('Bb').getDisplayName()).to.eql('B♭₄')
      expect(new Note('B').getDisplayName()).to.eql('B₄')
    })
  })

  describe('.pitchToOctave', () => {
    it('pitches itself to the specified octave', () => {
      expect(new Note('A').pitchToOctave(5).getFrequency()).to.eql(880)
      expect(new Note('A').pitchToOctave(3).getFrequency()).to.eql(220)

      expect(new Note('A').pitchToOctave(5).getName()).to.eql('A5')
      expect(new Note('A').pitchToOctave(5).getOctave()).to.eql(5)
    })
  })

  describe('.pitchBySemitone', () => {
    it('pitches itself by the specified tone step', () => {
      expect(new Note('A').pitchBySemitone(1)).to.eql(new Note('A#'))
      expect(new Note('B').pitchBySemitone(1)).to.eql(new Note('C'))
      expect(new Note('A').pitchBySemitone(2)).to.eql(new Note('B'))
      expect(new Note('A').pitchBySemitone(4)).to.eql(new Note('C#5'))
      expect(new Note('A').pitchBySemitone(4)).to.eql(new Note('C#5'))
      expect(new Note('A').pitchBySemitone(16)).to.eql(new Note('C#6'))
    })
  })

  describe('.getAccidental', () => {
    it('returns the accidental symbol when the note has one', () => {
      expect(new Note('A#').getAccidental()).to.eql('#')
      expect(new Note('Bb').getAccidental()).to.eql('b')
    })

    it('returns undefined when the note does not has one', () => {
      expect(new Note('A').getAccidental()).to.be(undefined)
    })
  })

  describe('.pitchEquals', () => {
    it('returns true for two identical notes', () => {
      expect(new Note('A').pitchEquals(new Note('A'))).to.be(true)
    })

    it('returns false for two notes with different frequencies', () => {
      expect(new Note('A').pitchEquals(new Note('B'))).to.be(false)
    })

    it('returns true for two notes with equals frequencies but different names', () => {
      expect(new Note('A#').pitchEquals(new Note('Bb'))).to.be(true)
    })
  })

  describe('.noteEquals', () => {
    it('returns true for two A on different octaves', () => {
      expect(new Note('A').noteEquals(new Note('A5'))).to.be(true)
    })

    it('returns false for two notes with different pitch', () => {
      expect(new Note('A').noteEquals(new Note('B'))).to.be(false)
    })

    it('returns true for a A sharp and a B flat on different octaves', () => {
      expect(new Note('A#').noteEquals(new Note('Bb5'))).to.be(true)
    })
  })
})
