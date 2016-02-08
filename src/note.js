import c from './constants'
import u from './utils'

export default class Note {
  constructor (string) {
    const [name, octave] = string.split(/(?=\d)/)
    this.name = name
    this.octave = Number(octave != null ? octave : 4)
    this.frequency = u.pitchAtOctave(this.name, this.octave)
  }

  getName () { return `${this.name}${this.octave}` }

  getDisplayName () {
    var displayName = this.name[0]
    if (this.name.length > 1) {
      displayName += c.ACCIDENTALS_DISPLAY_MAP[this.name[1]]
    }
    displayName += c.OCTAVE_DISPLAY_MAP[this.octave]
    return displayName
  }

  getLetter () { return this.name[0] }

  getAccidental () { return this.name[1] }

  getFrequency () { return this.frequency }

  getOctave () { return this.octave }

  pitchToOctave (newOctave) { return new Note(this.name + newOctave) }

  pitchBySemitone (semitones) {
    var octave = this.octave
    var indexStart = c.CHROMATIC_SCALE.indexOf(this.name)

    for (var i = 0; semitones > 0 ? i < semitones : i > semitones; semitones > 0 ? i++ : i--) {
      if (indexStart + i >= c.CHROMATIC_SCALE_LENGTH) {
        octave += 1
        indexStart -= c.CHROMATIC_SCALE_LENGTH
      }
    }

    var name = c.CHROMATIC_SCALE[(indexStart + semitones) % c.CHROMATIC_SCALE_LENGTH]
    return new Note(name + octave)
  }

  pitchEquals (note) {
    return note.frequency === this.frequency
  }

  noteEquals (note) {
    return note.name === this.name || c.SEMITONE_CONVERSION[note.name] === this.name
  }
}
