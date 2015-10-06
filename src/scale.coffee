Note = require './note'
Interval = require './interval'

module.exports =
class Scale
  constructor: (tonic, intervals) ->
    if Array.isArray(tonic)
      notes = tonic.map (note) ->
        note = new Note(note) if typeof note is 'string'
        note

    unless notes?
      notes = []
      tonic = new Note(tonic) if typeof tonic is 'string'

      notes.push(tonic)
      for interval in intervals
        notes.push(Interval.noteAtInterval(tonic, interval))

    @notes = notes

  getTonic: -> @notes[0]
