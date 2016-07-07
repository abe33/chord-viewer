
import c from '../constants'

export default {
  transposeAtOctave (name, octave) {
    const delta = octave - c.MIDDLE_OCTAVE

    let transpose = c.PITCH_BY_NAME[name]
    if (delta > 0) {
      for (let i = 0; delta > 0 ? i < delta : i > delta; delta > 0 ? i++ : i--) {
        transpose *= c.OCTAVE_PITCH_RATIO
      }
    } else {
      const end = Math.abs(delta)
      for (let i = 0; end > 0 ? i < end : i > end; end > 0 ? i++ : i--) {
        transpose /= c.OCTAVE_PITCH_RATIO
      }
    }
    return transpose
  },

  diatonicDistance (start, end) {
    start = start[0]
    end = end[0]

    const startIndex = c.DIATONIC_SCALE.indexOf(start)
    let endIndex = c.DIATONIC_SCALE.indexOf(end)
    if (endIndex < startIndex) { endIndex += c.DIATONIC_SCALE.length }

    return endIndex - startIndex + 1
  },

  chromaticDistance (start, end) {
    let startIndex = c.CHROMATIC_SCALE.indexOf(start)
    let endIndex = c.CHROMATIC_SCALE.indexOf(end)

    if (startIndex === -1) {
      startIndex = c.CHROMATIC_SCALE.indexOf(c.SEMITONE_CONVERSION[start])
    }

    if (endIndex === -1) {
      endIndex = c.CHROMATIC_SCALE.indexOf(c.SEMITONE_CONVERSION[end])
    }

    if (endIndex < startIndex) {
      endIndex += c.CHROMATIC_SCALE.length
    }

    return endIndex - startIndex
  },

  noteAtDiatonicInterval (start, length) {
    const index = c.DIATONIC_SCALE.indexOf(start)
    return c.DIATONIC_SCALE[(index + length - 1) % c.DIATONIC_SCALE.length]
  }
}
