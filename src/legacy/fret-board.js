import FretPosition from './fret-position'

export default class FretBoard {
  constructor ({tuning, fretCount = 22} = {}) {
    this.tuning = tuning
    this.fretCount = fretCount
  }

  getFretCount () { return this.fretCount }

  getTuning () { return this.tuning }

  getNote (position) {
    position = FretPosition.fromObject(position)
    return this.tuning.getNote(position.string).transposeBySemitone(position.fret)
  }
}
