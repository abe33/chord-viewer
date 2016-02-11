import R from 'ramda'
import notes from './notes'

const {all, anyPass, both, compose, curry, equals, last, length, test} = R

const {isNote, normalize, transposeBySemitone} = notes

const positiveNumber = R.gte(R.__, 0)

const isInterval = both(compose(equals(2), length), all(isNote))

const onlyOnIntervalOrDefault = curry((def, continuation) => {
  return R.curryN(continuation.length, (...args) => {
    return isInterval(last(args)) ? continuation(...args) : def
  })
})

const onlyOnInterval = onlyOnIntervalOrDefault('')

const isIntervalName = anyPass([
  test(/^(aug|A)([12456])$/),
  test(/^(dim|d)([45])$/),
  test(/^(maj|M)([2367])$/),
  test(/^(min|m)([2367])$/),
  test(/^(perf|P)([45])$/)
])


const semitoneInterval = (interval, note) => {
  return positiveNumber(interval) && isNote(note)
    ? [normalize(note), transposeBySemitone(interval, note)]
    : []
}

export default {
  isInterval,
  isIntervalName,
  semitoneInterval
}
