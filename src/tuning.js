import Note from './note'

export default class Tuning {
  constructor (notes) {
    this.notes = notes.map((note) => {
      return typeof note === 'string' ? new Note(note) : note
    })
  }

  getNotes () { return this.notes.slice() }

  getNote (string) { return this.notes[this.stringToIndex(string)] }

  getLength () { return this.notes.length }

  getName () { return this.notes.map(n => n.name).join('') }

  stringToIndex (string) {
    if (string <= 0 || string > this.notes.length) { return -1 }
    return this.notes.length - string
  }

  indexToString (index) {
    if (index < 0 || index >= this.notes.length) { return -1 }
    return this.notes.length - index
  }

  transposeBySemitone (step) {
    return new Tuning(this.notes.map(n => n.transposeBySemitone(step)))
  }

  equals (tuning) {
    if (tuning.getLength() !== this.getLength()) { return false }

    return this.getNotes().every((note, i) => note.pitchEquals(tuning.notes[i]))
  }
}
