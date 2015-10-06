Note = require './note'
Interval = require './interval'
FretPosition = require './fret-position'

module.exports =
class Chord

  constructor: (@name, fretPositions=[]) ->
    if Array.isArray(fretPositions)
      @fretPositions = fretPositions.map (pos) ->
        pos = new FretPosition(pos) unless pos instanceof FretPosition
        pos
    else if typeof fretPositions is 'string'
      @fretPositions = fretPositions.split(/\s+/).map (pos,i,a) ->
        return pos if pos is 'x'
        new FretPosition([a.length - i, Number(pos)])
      .filter (pos) -> pos isnt 'x'

  getName: -> @name

  getFretPositions: -> @fretPositions
