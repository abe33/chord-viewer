import R from 'ramda'

const {
  always, compose, cond, converge, curry, defaultTo, drop, head, join, last, prop, replace, split, subtract, test, times, toLower, toUpper, unapply
} = R

const isNote = test(/^[A-G](#|b)?(\d+)?$/i)

const letter = compose(toUpper, replace(/[^A-G]/i, ''), head)

const accidental = compose(toLower, replace(/^.|[^Bb#]$/gi, ''))

const octave = compose(Number, defaultTo(4), last, drop(1), split(/(?=\d)/))

const name = cond([
  [isNote, converge(unapply(join('')), [letter, accidental])],
  [R.T, always('')]
])

const normalize = cond([
  [isNote, converge(unapply(join('')), [letter, accidental, octave])],
  [R.T, always('')]
])

const double = R.multiply(2)

const half = R.divide(R.__, 2)

const pitchModulatorForBase = (base) => {
  const iterate = cond([
    [R.lt(0), compose(times(always(half)), Math.abs)],
    [R.gt(0), compose(times(always(double)), Math.abs)],
    [R.T, always(R.of(R.identity))]
  ])
  return compose(iterate, subtract(base))
}

const pitchModulator = pitchModulatorForBase(4)

const pitchTransposer = curry((frequencies, note) => {
  const modulatePitch = compose(...pitchModulator(octave(note)))

  return isNote(note) ? modulatePitch(prop(name(note), frequencies)) : ''
})

const frequency = pitchTransposer({
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

export default {isNote, letter, accidental, octave, normalize, frequency, name}
