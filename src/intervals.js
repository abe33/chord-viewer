import R from 'ramda'
import notes from './notes'

const {isNote, normalize, transposeBySemitone} = notes

const isOctave = R.gte(R.__, 0)

const semitoneInterval = (interval, note) => {
  return isOctave(interval) && isNote(note)
    ? [normalize(note), transposeBySemitone(interval, note)]
    : []
}

export default {semitoneInterval}
