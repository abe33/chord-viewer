import R from 'ramda'

const {
  always, compose, cond, converge, curry, defaultTo, drop, equals, either, head, join, keys, last, prop, replace, split, subtract, test, times, toLower, toUpper, unapply
} = R

const isNote = test(/^[A-G](#|b)?(\d+)?$/i)

const onlyOnNoteOrDefault = curry((def, continuation) => {
  return R.curryN(continuation.length, (...args) => {
    return isNote(last(args)) ? continuation(...args) : def
  })
})

const onlyOnNote = onlyOnNoteOrDefault('')

const letter = compose(toUpper, replace(/[^A-G]/i, ''), head)

const accidental = compose(toLower, replace(/^.|[^Bb#]$/gi, ''))

const octave = compose(Number, defaultTo(4), last, drop(1), split(/(?=\d)/))

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

const frequency = pitchTransposer(4, {
  'C': 261.63,
  'C#': 277.18,
  'Db': 277.18,
  'D': 293.66,
  'D#': 311.13,
  'Eb': 311.13,
  'E': 329.63,
  'F': 349.23,
  'F#': 369.99,
  'Gb': 369.99,
  'G': 392.00,
  'G#': 415.30,
  'Ab': 415.30,
  'A': 440,
  'A#': 466.16,
  'Bb': 466.16,
  'B': 493.88
})

const substitute = (map) => {
  const re = new RegExp(join('|', keys(map)))

  return (note) => replace(re, m => map[m], note)
}

const display = compose(
  substitute({
    '#': '♯',
    'b': '♭'
  }),
  substitute({
    '0': '₀',
    '1': '₁',
    '2': '₂',
    '3': '₃',
    '4': '₄',
    '5': '₅',
    '6': '₆',
    '7': '₇',
    '8': '₈',
    '9': '₉'
  }),
  normalize
)

const variant = prop(R.__, {
  'C#': 'Db',
  'Db': 'C#',
  'D#': 'Eb',
  'Eb': 'D#',
  'F#': 'Gb',
  'Gb': 'F#',
  'G#': 'Ab',
  'Ab': 'G#',
  'A#': 'Bb',
  'Bb': 'A#'
})

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
  ])(R.indexOf(note, scale))
})

const previousNoteInScale = curry((scale, [note, octave]) => {
  return cond([
    [R.equals(0), always([last(scale), octave - 1])],
    [R.T, (index) => [scale[index - 1], octave]]
  ])(R.indexOf(note, scale))
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

const transposeBySemitone = transposeInScale([
  'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'
])

export default {
  accidental,
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
