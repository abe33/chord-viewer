c = require './constants'
u = require './utils'

module.exports =
class Note
  constructor: (string) ->
    [@name, octave] = string.split(/(?=\d)/)
    octave ?= 4
    @octave = Number(octave)
    @frequency = u.pitchAtOctave(@name, @octave)

  getName: -> "#{@name}#{@octave}"

  getDisplayName: ->
    displayName = @name[0]
    displayName += c.ACCIDENTALS_DISPLAY_MAP[@name[1]] if @name.length > 1
    displayName += c.OCTAVE_DISPLAY_MAP[@octave]
    displayName

  getLetter: -> @name[0]

  getAccidental: -> @name[1]

  getFrequency: -> @frequency

  getOctave: -> @octave

  pitchToOctave: (newOctave) -> new Note(@name + newOctave)

  pitchBySemitone: (semitones) ->
    octave = @octave
    indexStart = c.CHROMATIC_SCALE.indexOf(@name)

    for i in [0...semitones]
      if indexStart + i >= c.CHROMATIC_SCALE_LENGTH
        octave += 1
        indexStart -= c.CHROMATIC_SCALE_LENGTH

    name = c.CHROMATIC_SCALE[(indexStart + semitones) % c.CHROMATIC_SCALE_LENGTH]
    new Note(name + octave)

  pitchEquals: (note) ->
    note.frequency is @frequency

  noteEquals: (note) ->
    note.name is @name or c.SEMITONE_CONVERSION[note.name] is @name
