FretPosition = require '../src/fret-position'

describe 'FretPosition', ->
  describe 'creation', ->
    it 'takes an array and fill the string and fret properties in order', ->
      position = new FretPosition([0,4])
      expect(position.string).toEqual(0)
      expect(position.fret).toEqual(4)

    it 'takes an object and fill the string and fret properties', ->
      position = new FretPosition({string: 0, fret: 4})
      expect(position.string).toEqual(0)
      expect(position.fret).toEqual(4)

  describe '.fromObject', ->
    it 'returns a FretPosition', ->
      expect(FretPosition.fromObject([0,4])).toEqual(new FretPosition([0,4]))
      expect(FretPosition.fromObject({string: 0, fret: 4})).toEqual(new FretPosition([0,4]))

    it 'returns the same object when the argument is already a FretPosition', ->
      position = new FretPosition([0,4])
      expect(FretPosition.fromObject(position)).toBe(position)
