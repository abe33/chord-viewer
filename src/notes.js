import R from 'ramda'
import C from './constants'

const {
  all, always, apply, compose, cond, converge, curry, defaultTo, drop, equals, either, has, head, indexOf, join, keys, last, length, map, prop, replace, split, subtract, test, times, toLower, toUpper, unapply, when
} = R

const isNote = test(/^[A-G](#|b)?(\d+)?$/i)

const onlyOnNoteOrDefault = curry((def, continuation) => {
  return R.curryN(continuation.length, (...args) => {
    return isNote(last(args)) ? continuation(...args) : def
  })
})

const onlyOnNotesOrDefault = curry((def, continuation) => {
  return R.curryN(continuation.length, (...args) => {
    return all(isNote, args) ? continuation(...args) : def
  })
})

const onlyOnNote = onlyOnNoteOrDefault('')

const letter = compose(toUpper, replace(/[^A-G]/i, ''), head)

const accidental = compose(toLower, replace(/^.|[^Bb#]$/gi, ''))

const octave = compose(Number, defaultTo(C.MIDDLE_OCTAVE), last, drop(1), split(/(?=\d)/))

const name = onlyOnNote(converge(unapply(join('')), [letter, accidental]))

const normalize = onlyOnNote(converge(unapply(join('')), [letter, accidental, octave]))

const double = R.multiply(2)

const half = R.divide(R.__, 2)

const pitchModulator = (base) => {
  const iterate = cond([
    [R.lt(0), compose(times(always(half)), Math.abs)],
    [R.gt(0), compose(times(always(double)), Math.abs)],
    [R.T, always(R.of(R.identity))]
  ])
  return compose(iterate, subtract(base))
}

const pitchModulators = R.uncurryN(2, pitchModulator)

const pitchTransposer = onlyOnNote((base, frequencies, note) => {
  const modulatePitch = compose(...pitchModulators(base, octave(note)))

  return modulatePitch(prop(name(note), frequencies))
})

const frequency = pitchTransposer(C.MIDDLE_OCTAVE, C.PITCH_BY_NAME)

const substitute = (map) => {
  const re = new RegExp(join('|', keys(map)))

  return (note) => replace(re, m => map[m], note)
}

const display = compose(
  substitute(C.ACCIDENTALS_DISPLAY_MAP),
  substitute(C.OCTAVE_DISPLAY_MAP),
  normalize
)

const variant = prop(R.__, C.SEMITONE_CONVERSION)

const chromaticVariant = when(
  has(R.__, C.CHROMATIC_VARIANTS),
  prop(R.__, C.CHROMATIC_VARIANTS)
)

const noteEquals = curry((a, b) => {
  const compare = either(equals(name(a)), equals(variant(name(a))))

  return compare(name(b))
})

const pitchEquals = curry((a, b) => {
  return equals(frequency(a), frequency(b))
})

const transposeToOctave = onlyOnNote((octave, note) => {
  return `${name(note)}${octave}`
})

const lastIndex = compose(subtract(R.__, 1), R.length)

const nextNoteInScale = curry((scale, [note, octave]) => {
  return cond([
    [R.equals(lastIndex(scale)), always([scale[0], octave + 1])],
    [R.T, (index) => [scale[index + 1], octave]]
  ])(indexOf(note, scale))
})

const previousNoteInScale = curry((scale, [note, octave]) => {
  return cond([
    [R.equals(0), always([last(scale), octave - 1])],
    [R.T, (index) => [scale[index - 1], octave]]
  ])(indexOf(note, scale))
})

const transposeInScale = onlyOnNote((scale, offset, note) => {
  const steps = cond([
    [R.gt(0), compose(times(always(previousNoteInScale(scale))), Math.abs)],
    [R.lt(0), times(always(nextNoteInScale(scale)))],
    [R.T, always(() => [normalize(note)])]
  ])(offset)

  const walk = compose(join(''), ...steps)

  return walk([name(note), octave(note)])
})

const transposeBySemitone = transposeInScale(C.CHROMATIC_SCALE)

const wrapDistanceInScale = curry((scale, v) => v < 0 ? v + length(scale) : v)

const wrapDiatonicDistance = wrapDistanceInScale(C.DIATONIC_SCALE)

const wrapChromaticDistance = wrapDistanceInScale(C.CHROMATIC_SCALE)

const diatonicIndex = indexOf(R.__, C.DIATONIC_SCALE)

const chromaticIndex = indexOf(R.__, C.CHROMATIC_SCALE)

const diatonicDistance = onlyOnNotesOrDefault(-1, (a, b) => {
  const find = compose(diatonicIndex, letter)
  const distance = compose(wrapDiatonicDistance, apply(subtract), map(find))

  return distance([b, a])
})

const chromaticDistance = onlyOnNotesOrDefault(-1, (a, b) => {
  const find = compose(chromaticIndex, chromaticVariant)
  const distance = compose(wrapChromaticDistance, apply(subtract), map(find))

  return distance([b, a])
})

export default {
  accidental,
  chromaticDistance,
  diatonicDistance,
  display,
  frequency,
  isNote,
  letter,
  name,
  normalize,
  noteEquals,
  octave,
  pitchEquals,
  transposeBySemitone,
  transposeToOctave
}
