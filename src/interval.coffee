{
  NOTE_REGEXP
  INTERVAL_REGEXP
  INTERVAL_OFFSETS
  INTERVAL_SHORT_PREFIXES
  INTERVAL_LONG_PREFIXES
  DIATONIC_TO_CHROMATIC
  QUALITY_BY_DIATONIC_DISTANCE
} = require './constants'

utils = require './utils'
Note = require './note'

module.exports =
class Interval
  @noteAtInterval: (note, interval) ->
    note.pitchBySemitone(INTERVAL_OFFSETS[interval])

  constructor: (start, end) ->
    start = new Note(start) if typeof start is 'string'

    unless end instanceof Note
      switch typeof end
        when 'number'
          end = start.pitchBySemitone(end)
        when 'string'
          if NOTE_REGEXP.test(end)
            end = new Note(end)
          else if INTERVAL_REGEXP.test(end)
            end = Interval.noteAtInterval(start, end)

    @start = start
    @end = end

  getDiatonicLength: ->
    utils.diatonicDistance(@start.name, @end.name)

  getChromaticLength: ->
    utils.chromaticDistance(@start.name, @end.name)

  getShortName: ->
    [quality, number] = @getIntervalTuple()
    "#{INTERVAL_SHORT_PREFIXES[quality]}#{number}"

  getLongName: ->
    [quality, number] = @getIntervalTuple()
    "#{INTERVAL_LONG_PREFIXES[quality]}#{number}"

  getIntervalTuple: ->
    diatonicLength = @getDiatonicLength()
    chromaticLength = @getChromaticLength()
    expectedChromaticLength = DIATONIC_TO_CHROMATIC[diatonicLength]

    qualities = QUALITY_BY_DIATONIC_DISTANCE[diatonicLength]
    quality = qualities[chromaticLength - expectedChromaticLength]

    [quality, diatonicLength]
