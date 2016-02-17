import expect from 'expect.js'
import tunings from '../src/tunings'

describe('tunings', () => {
  describe('.isTuning()', () => {
    it('returns whether the string is a vaid tuning', () => {
      expect(tunings.isTuning('EJDGBE')).to.be(false)

      expect(tunings.isTuning('EADGBE')).to.be(true)
    })
  })

  describe('.fromString()', () => {
    it('converts a string to a scale representing the tuning', () => {
      expect(tunings.fromString('EJDGBE')).to.eql([])

      expect(tunings.fromString('EADG')).to.eql(['E', 'A', 'D', 'G'])

      expect(tunings.fromString('DADGAD')).to.eql(['D', 'A', 'D', 'G', 'A', 'D'])

      expect(tunings.fromString('D#ADGbAD')).to.eql(['D#', 'A', 'D', 'Gb', 'A', 'D'])
    })
  })
})
