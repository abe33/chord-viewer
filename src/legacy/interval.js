import constants from '../constants'
import utils from './utils'
import Note from './note'

const {
  NOTE_REGEXP, INTERVAL_REGEXP, INTERVAL_OFFSETS, INTERVAL_SHORT_PREFIXES, INTERVAL_LONG_PREFIXES, DIATONIC_TO_CHROMATIC, QUALITY_BY_DIATONIC_DISTANCE
} = constants

export default class Interval {
  static noteAtInterval (note, interval) {
    return note.transposeBySemitone(INTERVAL_OFFSETS[interval])
  }

  constructor (start, end) {
    if (typeof start === 'string') { start = new Note(start) }

    if (!(end instanceof Note)) {
      switch (typeof end) {
        case 'number':
          end = start.transposeBySemitone(end)
          break
        case 'string':
          if (NOTE_REGEXP.test(end)) {
            end = new Note(end)
          } else if (INTERVAL_REGEXP.test(end)) {
            end = Interval.noteAtInterval(start, end)
          }
          break
      }
    }

    this.start = start
    this.end = end
  }

  getDiatonicLength () {
    return utils.diatonicDistance(this.start.name, this.end.name)
  }

  getChromaticLength () {
    return utils.chromaticDistance(this.start.name, this.end.name)
  }

  getShortName () {
    var [quality, number] = this.getIntervalTuple()
    return `${INTERVAL_SHORT_PREFIXES[quality]}${number}`
  }

  getLongName () {
    var [quality, number] = this.getIntervalTuple()
    return `${INTERVAL_LONG_PREFIXES[quality]}${number}`
  }

  getIntervalTuple () {
    var diatonicLength = this.getDiatonicLength()
    var chromaticLength = this.getChromaticLength()
    var expectedChromaticLength = DIATONIC_TO_CHROMATIC[diatonicLength]

    var qualities = QUALITY_BY_DIATONIC_DISTANCE[diatonicLength]
    var quality = qualities[chromaticLength - expectedChromaticLength]

    return [quality, diatonicLength]
  }
}
