import R from 'ramda'
import C from './constants'
import notes from './notes'

const {
  all, apply, anyPass, both, compose, converge, curry, equals, last, length, prop, subtract, test
} = R

const {
  isNote, normalize, transposeBySemitone, diatonicDistance, chromaticDistance
} = notes

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

const perfectQualityForInterval = compose(
  prop(R.__, C.DIATONIC_TO_CHROMATIC),
  apply(diatonicDistance)
)

const qualityDifference = converge(subtract, [
  apply(chromaticDistance),
  perfectQualityForInterval
])

const quality = onlyOnInterval((interval) => {
  return prop(
    qualityDifference(interval),
    prop(diatonicDistance(...interval), C.QUALITY_BY_DIATONIC_DISTANCE)
  )
})

const intervalName = onlyOnInterval((interval) => {

})

const shortIntervalName = onlyOnInterval((interval) => {

})

const semitoneInterval = (interval, note) => {
  return positiveNumber(interval) && isNote(note)
    ? [normalize(note), transposeBySemitone(interval, note)]
    : []
}

export default {
  isInterval,
  isIntervalName,
  intervalName,
  quality,
  shortIntervalName,
  semitoneInterval
}
