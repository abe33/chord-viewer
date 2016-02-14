import R from 'ramda'
import notes from './notes'
import intervals from './intervals'

const {
  all, compose, concat, curry, head, last, map, tail, when
} = R

const {
  isNote, name
} = notes

const {
  intervalDistance, intervalFromName, intervalName, isIntervalName
} = intervals

const isScale = all(isNote)

const fromIntervals = curry((root, intervals) => {
  return all(isIntervalName, intervals)
    ? concat(
      R.of(root),
      map(compose(name, last, intervalFromName(R.__, root)), intervals)
    )
    : []
})

const toIntervalNames = (scale) => {
  const root = R.of(head(scale))

  return isScale(scale)
    ? concat(root, map(compose(intervalName, concat(root)), tail(scale)))
    : []
}

const toIntervalDistances = compose(
  map(when(isIntervalName, intervalDistance)),
  toIntervalNames
)

export default {
  fromIntervals,
  isScale,
  toIntervalDistances,
  toIntervalNames
}
