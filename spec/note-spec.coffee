Note = require '../src/note'

describe 'Note', ->
  describe '::getFrequency', ->
    it 'sets the proper frequency for each note', ->
      expect(new Note('C').getFrequency()).toEqual(261.63)
      expect(new Note('C#').getFrequency()).toEqual(277.18)
      expect(new Note('Db').getFrequency()).toEqual(277.18)
      expect(new Note('D').getFrequency()).toEqual(293.66)
      expect(new Note('D#').getFrequency()).toEqual(311.13)
      expect(new Note('Eb').getFrequency()).toEqual(311.13)
      expect(new Note('E').getFrequency()).toEqual(329.63)
      expect(new Note('F').getFrequency()).toEqual(349.23)
      expect(new Note('F#').getFrequency()).toEqual(369.99)
      expect(new Note('Gb').getFrequency()).toEqual(369.99)
      expect(new Note('G').getFrequency()).toEqual(392.00)
      expect(new Note('G#').getFrequency()).toEqual(415.30)
      expect(new Note('Ab').getFrequency()).toEqual(415.30)
      expect(new Note('A').getFrequency()).toEqual(440)
      expect(new Note('A#').getFrequency()).toEqual(466.16)
      expect(new Note('Bb').getFrequency()).toEqual(466.16)
      expect(new Note('B').getFrequency()).toEqual(493.88)

  describe '::getOctave', ->
    it 'returns the note octave', ->
      expect(new Note('C').getOctave()).toEqual(4)
      expect(new Note('C#').getOctave()).toEqual(4)
      expect(new Note('Db').getOctave()).toEqual(4)
      expect(new Note('D').getOctave()).toEqual(4)
      expect(new Note('D#').getOctave()).toEqual(4)
      expect(new Note('Eb').getOctave()).toEqual(4)
      expect(new Note('E').getOctave()).toEqual(4)
      expect(new Note('F').getOctave()).toEqual(4)
      expect(new Note('F#').getOctave()).toEqual(4)
      expect(new Note('Gb').getOctave()).toEqual(4)
      expect(new Note('G').getOctave()).toEqual(4)
      expect(new Note('G#').getOctave()).toEqual(4)
      expect(new Note('Ab').getOctave()).toEqual(4)
      expect(new Note('A').getOctave()).toEqual(4)
      expect(new Note('A#').getOctave()).toEqual(4)
      expect(new Note('Bb').getOctave()).toEqual(4)
      expect(new Note('B').getOctave()).toEqual(4)


  describe '::getName', ->
    it 'returns the note name with the octave', ->
      expect(new Note('C').getName()).toEqual("C4")
      expect(new Note('C#').getName()).toEqual("C#4")
      expect(new Note('Db').getName()).toEqual("Db4")
      expect(new Note('D').getName()).toEqual("D4")
      expect(new Note('D#').getName()).toEqual("D#4")
      expect(new Note('Eb').getName()).toEqual("Eb4")
      expect(new Note('E').getName()).toEqual("E4")
      expect(new Note('F').getName()).toEqual("F4")
      expect(new Note('F#').getName()).toEqual("F#4")
      expect(new Note('Gb').getName()).toEqual("Gb4")
      expect(new Note('G').getName()).toEqual("G4")
      expect(new Note('G#').getName()).toEqual("G#4")
      expect(new Note('Ab').getName()).toEqual("Ab4")
      expect(new Note('A').getName()).toEqual("A4")
      expect(new Note('A#').getName()).toEqual("A#4")
      expect(new Note('Bb').getName()).toEqual("Bb4")
      expect(new Note('B').getName()).toEqual("B4")

  describe '::getDisplayName', ->
    it 'returns a displayable name with proper accidental characters', ->
      expect(new Note('C').getDisplayName()).toEqual("C₄")
      expect(new Note('C#').getDisplayName()).toEqual("C♯₄")
      expect(new Note('Db').getDisplayName()).toEqual("D♭₄")
      expect(new Note('D').getDisplayName()).toEqual("D₄")
      expect(new Note('D#').getDisplayName()).toEqual("D♯₄")
      expect(new Note('Eb').getDisplayName()).toEqual("E♭₄")
      expect(new Note('E').getDisplayName()).toEqual("E₄")
      expect(new Note('F').getDisplayName()).toEqual("F₄")
      expect(new Note('F#').getDisplayName()).toEqual("F♯₄")
      expect(new Note('Gb').getDisplayName()).toEqual("G♭₄")
      expect(new Note('G').getDisplayName()).toEqual("G₄")
      expect(new Note('G#').getDisplayName()).toEqual("G♯₄")
      expect(new Note('Ab').getDisplayName()).toEqual("A♭₄")
      expect(new Note('A').getDisplayName()).toEqual("A₄")
      expect(new Note('A#').getDisplayName()).toEqual("A♯₄")
      expect(new Note('Bb').getDisplayName()).toEqual("B♭₄")
      expect(new Note('B').getDisplayName()).toEqual("B₄")

  describe '::pitchToOctave', ->
    it 'pitches itself to the specified octave', ->
      expect(new Note('A').pitchToOctave(5).getFrequency()).toEqual(880)
      expect(new Note('A').pitchToOctave(3).getFrequency()).toEqual(220)

      expect(new Note('A').pitchToOctave(5).getName()).toEqual('A5')
      expect(new Note('A').pitchToOctave(5).getOctave()).toEqual(5)

  describe '::pitchBySemitone', ->
    it 'pitches itself by the specified tone step', ->
      expect(new Note('A').pitchBySemitone(1)).toEqual(new Note('A#'))
      expect(new Note('B').pitchBySemitone(1)).toEqual(new Note('C'))
      expect(new Note('A').pitchBySemitone(2)).toEqual(new Note('B'))
      expect(new Note('A').pitchBySemitone(4)).toEqual(new Note('C#5'))
      expect(new Note('A').pitchBySemitone(4)).toEqual(new Note('C#5'))
      expect(new Note('A').pitchBySemitone(16)).toEqual(new Note('C#6'))

  describe '::getAccidental', ->
    it 'returns the accidental symbol when the note has one', ->
      expect(new Note('A#').getAccidental()).toEqual('#')
      expect(new Note('Bb').getAccidental()).toEqual('b')

    it 'returns undefined when the note does not has one', ->
      expect(new Note('A').getAccidental()).toBeUndefined()

  describe '::pitchEquals', ->
    it 'returns true for two identical notes', ->
      expect(new Note('A').pitchEquals(new Note('A'))).toBeTruthy()

    it 'returns false for two notes with different frequencies', ->
      expect(new Note('A').pitchEquals(new Note('B'))).toBeFalsy()

    it 'returns true for two notes with equals frequencies but different names', ->
      expect(new Note('A#').pitchEquals(new Note('Bb'))).toBeTruthy()

  describe '::noteEquals', ->
    it 'returns true for two A on different octaves', ->
      expect(new Note('A').noteEquals(new Note('A5'))).toBeTruthy()

    it 'returns false for two notes with different pitch', ->
      expect(new Note('A').noteEquals(new Note('B'))).toBeFalsy()

    it 'returns true for a A sharp and a B flat on different octaves', ->
      expect(new Note('A#').noteEquals(new Note('Bb5'))).toBeTruthy()
