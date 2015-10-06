Note = require './note'

module.exports =
class Tuning
  constructor: (notes) ->
    @notes = notes.map (note) ->
      note = new Note(note) if typeof note is 'string'
      note

  getNotes: -> @notes.slice()

  getNote: (string) -> @notes[@stringToIndex(string)]

  getLength: -> @notes.length

  getName: -> @notes.map((n) -> n.name).join('')

  stringToIndex: (string) ->
    return -1 if string <= 0 or string > @notes.length
    @notes.length - string

  indexToString: (index) ->
    return -1 if index < 0 or index >= @notes.length
    @notes.length - index

  pitchBySemitone: (step) ->
    new Tuning(@notes.map (n) -> n.pitchBySemitone(step))

  equals: (tuning) ->
    return false if tuning.getLength() isnt @getLength()

    @getNotes().every (note,i) -> note.pitchEquals(tuning.notes[i])
