FretPosition = require './fret-position'

module.exports =
class FretBoard
  constructor: ({@tuning, @fretCount}={}) ->

  getFretCount: -> @fretCount

  getTuning: -> @tuning

  getNote: (position) ->
    position = FretPosition.fromObject(position)
    @tuning.getNote(position.string).pitchBySemitone(position.fret)
