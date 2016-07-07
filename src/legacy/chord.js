import FretPosition from './fret-position'

export default class Chord {

  constructor (name, fretPositions = []) {
    this.name = name
    if (Array.isArray(fretPositions)) {
      this.fretPositions = fretPositions.map((pos) => {
        return pos instanceof FretPosition ? pos : new FretPosition(pos)
      })
    } else if (typeof fretPositions === 'string') {
      this.fretPositions = fretPositions
      .split(/\s+/)
      .map((pos, i, a) => {
        return pos === 'x'
          ? pos
          : new FretPosition([a.length - i, Number(pos)])
      })
      .filter(pos => pos !== 'x')
    }
  }

  getName () { return this.name }

  getFretPositions () { return this.fretPositions }
}
