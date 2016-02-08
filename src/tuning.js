import Note from './note'

export default class Tuning {
  constructor (notes) {
    this.notes = notes.map(function(note) {
      if (typeof note === 'string') { note = new Note(note); }
      return note;
    });
  }

  getNotes() { return this.notes.slice(); }

  getNote(string) { return this.notes[this.stringToIndex(string)]; }

  getLength() { return this.notes.length; }

  getName() { return this.notes.map(function(n) { return n.name; }).join(''); }

  stringToIndex(string) {
    if (string <= 0 || string > this.notes.length) { return -1; }
    return this.notes.length - string;
  }

  indexToString(index) {
    if (index < 0 || index >= this.notes.length) { return -1; }
    return this.notes.length - index;
  }

  pitchBySemitone(step) {
    return new Tuning(this.notes.map(function(n) { return n.pitchBySemitone(step); }));
  }

  equals(tuning) {
    if (tuning.getLength() !== this.getLength()) { return false; }

    return this.getNotes().every(function(note,i) { return note.pitchEquals(tuning.notes[i]); });
  }
};
