
export default class FretPosition {
  static fromObject (arg) {
    return arg instanceof FretPosition ? arg : new FretPosition(arg)
  }

  constructor (arg = []) {
    let string, fret

    if (Array.isArray(arg)) {
      [string, fret] = arg
    } else {
      string = arg.string
      fret = arg.fret
    }

    this.string = string || 0
    this.fret = fret || 0
  }
}
