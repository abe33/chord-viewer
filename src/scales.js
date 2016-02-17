import R from 'ramda'
import notes from './notes'
import intervals from './intervals'

const {
  all, append, compose, concat, curry, curryN, head, init, last, map, reduce, tail, when, zip
} = R

const {
  isNote, name, transposeBySemitone
} = notes

const {
  intervalDistance, intervalFromName, intervalName, intervalNameDistance, isIntervalName
} = intervals

const isScale = all(isNote)

const lastNameFromInterval = curryN(2, compose(name, last, intervalFromName))

const fromIntervals = curry((root, intervals) => {
  const reducer = (memo, interval) => {
    return append(lastNameFromInterval(interval, root), memo)
  }
  return all(isIntervalName, intervals)
    ? reduce(reducer, R.of(root), intervals)
    : []
})

const fromRelativeIntervals = curry((root, intervals) => {
  const reducer = (memo, interval) => {
    return append(lastNameFromInterval(interval, last(memo)), memo)
  }
  return all(isIntervalName, intervals)
    ? reduce(reducer, R.of(root), intervals)
    : []
})

const toIntervalNames = (scale) => {
  const root = R.of(head(scale))

  return isScale(scale)
    ? concat(root, map(compose(intervalName, concat(root)), tail(scale)))
    : []
}

const toRelativeIntervalNames = (scale) => {
  const root = R.of(head(scale))
  const zipped = zip(init(scale), tail(scale))
  return isScale(scale)
    ? concat(root, map(intervalName, zipped))
    : []
}

const distanceWhenInterval = when(isIntervalName, intervalNameDistance)

const toIntervalDistances = compose(map(distanceWhenInterval), toIntervalNames)

const transpose = curry((root, scale) => {
  const transposer = compose(
    name, transposeBySemitone(intervalDistance([head(scale), root]))
  )
  return isNote(root) && isScale(scale)
    ? concat(R.of(root), map(transposer, tail(scale)))
    : []
})

export default {
  fromIntervals,
  fromRelativeIntervals,
  isScale,
  toIntervalDistances,
  toIntervalNames,
  toRelativeIntervalNames,
  transpose
}
