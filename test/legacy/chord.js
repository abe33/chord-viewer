import expect from 'expect.js'
import Chord from '../../src/legacy/chord'
import FretPosition from '../../src/legacy/fret-position'

describe('Chord', () => {
  var [chord] = []

  describe('creation', () => {
    it('creates a chord with a name and an array of fret positions', () => {
      chord = new Chord('A', [
        [5, 0],
        [4, 2],
        [3, 2],
        [2, 2],
        [1, 0]
      ])

      expect(chord.getName()).to.eql('A')
      expect(chord.getFretPositions()).to.eql([
        new FretPosition([5, 0]),
        new FretPosition([4, 2]),
        new FretPosition([3, 2]),
        new FretPosition([2, 2]),
        new FretPosition([1, 0])
      ])
    })

    it('creates a chord with a name and a chord string', () => {
      chord = new Chord('A', 'x 0 2 2 2 0')

      expect(chord.getName()).to.eql('A')
      expect(chord.getFretPositions()).to.eql([
        new FretPosition([5, 0]),
        new FretPosition([4, 2]),
        new FretPosition([3, 2]),
        new FretPosition([2, 2]),
        new FretPosition([1, 0])
      ])
    })
  })
})
