import Note from './note'
import Interval from './interval'

module.exports =
class Scale {
  constructor (tonic, intervals) {
    let notes
    if (Array.isArray(tonic)) {
      notes = tonic.map((note) => {
        return typeof note === 'string' ? new Note(note) : note
      })
    }

    if (!notes) {
      notes = []
      if (typeof tonic === 'string') { tonic = new Note(tonic) }

      notes.push(tonic)
      for (var i = 0, interval; i < intervals.length; i++) {
        interval = intervals[i]
        notes.push(Interval.noteAtInterval(tonic, interval))
      }
    }

    this.notes = notes
  }

  getTonic () { return this.notes[0] }
}
