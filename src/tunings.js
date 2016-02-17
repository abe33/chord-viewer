import R from 'ramda'

import C from './constants'

const {split, test} = R

const isTuning = test(new RegExp(`^(${C.NOTE_REGEXP.source})+$`, 'i'))

const fromString = (str) => isTuning(str) ? split(/(?=[A-G])/, str) : []

export default {
  fromString,
  isTuning
}
