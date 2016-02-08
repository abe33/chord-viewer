import {replace, test, split} from 'ramda'

function isNote (note) {
  return test(/^[A-G](#|b)?(\d+)?$/i, note)
}

function letter (note) {
  return note[0]
}

function accidental (note) {
  return replace(/[^b#]/g, '', note)
}

function octave (note) {
  const [, octave] = split(/(?=\d)/, note)
  return Number(octave != null ? octave : 4)
}

export default {isNote, letter, accidental, octave}
