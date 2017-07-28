import R from 'ramda'
import C from './constants'

const {
  add, all, always, apply, call, compose, concat, cond, converge, curry, defaultTo, drop, equals, either, filter, head, indexOf, join, keys, last, length, map, match, prop, reduce, replace, split, subtract, test, times, toLower, toUpper, unapply, when, zip
} = R

/**
 * `String -> Boolean`
 */
const isNote = test(new RegExp(`^${C.NOTE_REGEXP.source}$`, 'i'))

/**
 * `* -> (Note -> *) -> (String -> *)`
 */
const onlyOnNoteOrDefault = curry((def, continuation) => {
  return R.curryN(continuation.length, (...args) => {
    return isNote(last(args)) ? continuation(...args) : def
  })
})

/**
 * `* -> ([Note] -> *) -> ([String] -> *)`
 */
const onlyOnNotesOrDefault = curry((def, continuation) => {
  return R.curryN(continuation.length, (...args) => {
    return all(isNote, args) ? continuation(...args) : def
  })
})

/**
 * `(Note -> *) -> (String -> *)`
 */
const onlyOnNote = onlyOnNoteOrDefault('')

/**
 * `Note -> String`
 */
const letter = compose(toUpper, replace(/[^A-G]/i, ''), head)

/**
 * `Note -> String`
 */
const accidental = compose(toLower, replace(/^.|[^Bb#]+$/gi, ''))

/**
 * `Note -> Number`
 */
const octave = compose(
  Number,
  defaultTo(C.MIDDLE_OCTAVE),
  when(s => s === '', () => undefined),
  join(''),
  filter(match(/^[-\d]+$/g)),
  drop(1),
  split(/(?=-|\d)/)
)

/**
 * `Note -> Note`
 */
const name = onlyOnNote(converge(unapply(join('')), [letter, accidental]))

/**
 * `Note -> Note`
 */
const normalize = onlyOnNote(converge(unapply(join('')), [letter, accidental, octave]))

/**
 * `Number -> Number`
 */
const double = R.multiply(2)

/**
 * `Number -> Number`
 */
const half = R.divide(R.__, 2)

/**
 * `Number -> Number -> Number -> [(Number -> Number)]`
 */
const pitchModulator = (base) => {
  const iterate = cond([
    [R.lt(0), compose(times(always(half)), Math.abs)],
    [R.gt(0), compose(times(always(double)), Math.abs)],
    [R.T, always(R.of(R.identity))]
  ])
  return compose(iterate, subtract(base))
}

/**
 * `Number -> Number -> [(Number -> Number)]`
 */
const pitchModulators = R.uncurryN(2, pitchModulator)

/**
 * `Number -> Object -> Note -> Number`
 */
const pitchTransposer = onlyOnNote((base, frequencies, note) => {
  const modulatePitch = compose(...pitchModulators(base, octave(note)))

  return modulatePitch(prop(name(note), frequencies))
})

/**
 * `Note -> Number`
 */
const frequency = pitchTransposer(C.MIDDLE_OCTAVE, C.PITCH_BY_NAME)

/**
 * `Object -> String -> String`
 */
const substitute = (map) => {
  const re = new RegExp(join('|', keys(map)))

  return (note) => replace(re, m => map[m], note)
}

/**
 * `Note -> String`
 */
const display = compose(
  substitute(C.ACCIDENTALS_DISPLAY_MAP),
  substitute(C.OCTAVE_DISPLAY_MAP),
  normalize
)

/**
 * `Note -> Note`
 */
const enharmonicVariant = prop(R.__, C.SEMITONE_CONVERSION)

/**
 * `Note -> Note -> Boolean`
 */
const noteEquals = curry((a, b) => {
  const compare = either(equals(name(a)), equals(enharmonicVariant(name(a))))

  return compare(name(b))
})

/**
 * `Note -> Note -> Boolean`
 */
const pitchEquals = curry((a, b) => {
  return equals(frequency(a), frequency(b))
})

/**
 * `Note -> Note`
 */
const transposeToOctave = onlyOnNote((octave, note) => {
  return `${name(note)}${octave}`
})

/**
 * `[a] -> Number`
 */
const lastIndex = compose(subtract(R.__, 1), R.length)

/**
 * `[Note] -> [Note, Number] -> Note`
 */
const nextNoteInScale = curry((scale, [note, octave]) => {
  return cond([
    [R.equals(lastIndex(scale)), always([scale[0], octave + 1])],
    [R.T, (index) => [scale[index + 1], octave]]
  ])(indexOf(note, scale))
})

/**
 * `[Note] -> [Note, Number] -> Note`
 */
const previousNoteInScale = curry((scale, [note, octave]) => {
  return cond([
    [R.equals(0), always([last(scale), octave - 1])],
    [R.T, (index) => [scale[index - 1], octave]]
  ])(indexOf(note, scale))
})

/**
 * `[Note] -> Number -> Note -> Note`
 */
const transposeInScale = onlyOnNote((scale, offset, note) => {
  const steps = cond([
    [R.gt(0), compose(times(always(previousNoteInScale(scale))), Math.abs)],
    [R.lt(0), times(always(nextNoteInScale(scale)))],
    [R.T, always(() => [normalize(note)])]
  ])(offset)

  const walk = compose(join(''), ...steps)

  return walk([name(note), octave(note)])
})

/**
 * `Number -> Note -> Note`
 */
const transposeBySemitone = transposeInScale(C.CHROMATIC_SCALE)

/**
 * `[Note] -> Number -> Number`
 */
const wrapDistanceInScale = curry((scale, v) => v < 0 ? v + length(scale) : v)

/**
 * `Number -> Number`
 */
const wrapDiatonicDistance = wrapDistanceInScale(C.DIATONIC_SCALE)

/**
 * `Number -> Number`
 */
const wrapChromaticDistance = wrapDistanceInScale(C.CHROMATIC_SCALE)

/**
 * `Note -> Number`
 */
const diatonicIndex = prop(R.__, C.DIATONIC_INDEX_MAP)

/**
 * `Note -> Number`
 */
const chromaticIndex = prop(R.__, C.CHROMATIC_INDEX_MAP)

/**
 * `Note -> Note -> Number`
 */
const diatonicDistance = onlyOnNotesOrDefault(-1, (a, b) => {
  const find = compose(diatonicIndex, letter)
  const distance = compose(add(1), wrapDiatonicDistance, apply(subtract), map(find))

  return distance([b, a])
})

/**
 * `Note -> Note -> Number`
 */
const chromaticDistance = onlyOnNotesOrDefault(-1, (a, b) => {
  const distance = compose(wrapChromaticDistance, apply(subtract), map(chromaticIndex))

  return distance([b, a])
})

/**
 * `[Number, Number] -> Number -> Boolean`
 */
const inPitchRange = curry(([a, b], c) => a <= c && c < b)

/**
 * `(Number -> Boolean) -> Number`
 */
const findOctave = (filterer) => {
  const octave = call(compose(head, filter(filterer)), C.OCTAVES_PITCH_RANGES)
  return octave ? head(octave) : undefined
}

/**
 * `Number -> Number`
 */
const octaveFromFrequency = (frequency) => {
  return findOctave(([, range]) => inPitchRange(range, frequency))
}

/**
 * `Number -> Note`
 */
const closestNoteFromFrequency = (freq) => {
  const octave = octaveFromFrequency(freq)
  if (!octave) { return undefined }

  const scale = map(concat(R.__, octave), C.CHROMATIC_SCALE)
  const mapper = compose(Math.abs, subtract(freq), frequency)
  const reducer = (memo, val) => (memo[1] < val[1]) ? memo : val
  const distances = zip(scale, map(mapper, scale))
  return head(reduce(reducer, [-1, 9999], distances))
}

export default {
  accidental,
  chromaticDistance,
  chromaticIndex,
  closestNoteFromFrequency,
  diatonicDistance,
  diatonicIndex,
  display,
  enharmonicVariant,
  frequency,
  isNote,
  letter,
  name,
  normalize,
  noteEquals,
  octave,
  octaveFromFrequency,
  pitchEquals,
  transposeBySemitone,
  transposeToOctave
}
