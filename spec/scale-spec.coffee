Scale = require '../src/scale'
Note = require '../src/note'

describe 'Scale', ->
  [scale] = []

  describe 'creation', ->
    it 'creates a scale with an array of notes', ->
      scale = new Scale(['C', 'D', 'E', 'F', 'G', 'A', 'B'])

      expect(scale.getTonic()).toEqual(new Note('C'))

    it 'creates a scale with a tonic and an array of intervals', ->
      scale = new Scale('C', ['m2', 'm3', 'P4', 'perf5', 'maj6', 'maj7'])

      expect(scale.getTonic()).toEqual(new Note('C'))
