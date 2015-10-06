
c = require './constants'

module.exports =
  pitchAtOctave: (name, octave) ->
    delta = octave - c.MIDDLE_OCTAVE

    pitch = c.PITCH_BY_NAME[name]
    if delta > 0
      pitch *= c.OCTAVE_PITCH_RATIO for i in [0...delta]
    else
      pitch /= c.OCTAVE_PITCH_RATIO for i in [0...Math.abs(delta)]
    pitch

  diatonicDistance: (start, end) ->
    start = start[0]
    end = end[0]

    startIndex = c.DIATONIC_SCALE.indexOf(start)
    endIndex = c.DIATONIC_SCALE.indexOf(end)
    endIndex += c.DIATONIC_SCALE.length if endIndex < startIndex

    endIndex - startIndex + 1

  chromaticDistance: (start, end) ->
    startIndex = c.CHROMATIC_SCALE.indexOf(start)
    endIndex = c.CHROMATIC_SCALE.indexOf(end)

    if startIndex is -1
      startIndex = c.CHROMATIC_SCALE.indexOf(c.SEMITONE_CONVERSION[start])

    if endIndex is -1
      endIndex = c.CHROMATIC_SCALE.indexOf(c.SEMITONE_CONVERSION[end])

    if endIndex < startIndex
      endIndex += c.CHROMATIC_SCALE.length

    endIndex - startIndex

  noteAtDiatonicInterval: (start, length) ->
    index = c.DIATONIC_SCALE.indexOf(start)
    c.DIATONIC_SCALE[(index + length - 1) % c.DIATONIC_SCALE.length]
