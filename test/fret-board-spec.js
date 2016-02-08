import expect from 'expect.js'
import FretBoard from '../src/fret-board'
import Tuning from '../src/tuning'
import Note from '../src/note'

describe('FretBoard', function() {
  var [fretboard, tuning] = [];

  beforeEach(function() {
    tuning = new Tuning([
      new Note('E'),
      new Note('A'),
      new Note('D5'),
      new Note('G5'),
      new Note('B6'),
      new Note('E6')
    ]);

    return fretboard = new FretBoard({tuning, fretCount: 20});
  });

  it('has a tuning', function() {
    return expect(fretboard.getTuning()).to.eql(tuning);
  });

  it('has a fret count', function() {
    return expect(fretboard.getFretCount()).to.eql(20);
  });

  return describe('.getNote', function() {
    it('returns the tuning notes for the fret 0 of each string', function() {
      expect(fretboard.getNote([6,0])).to.eql(new Note('E'));
      expect(fretboard.getNote([5,0])).to.eql(new Note('A'));
      expect(fretboard.getNote([4,0])).to.eql(new Note('D5'));
      expect(fretboard.getNote([3,0])).to.eql(new Note('G5'));
      expect(fretboard.getNote([2,0])).to.eql(new Note('B6'));
      return expect(fretboard.getNote([1,0])).to.eql(new Note('E6'));
    });

    return it('pitches the string notes based on the passed-in fret', function() {
      expect(fretboard.getNote([6,3])).to.eql(new Note('G'));
      expect(fretboard.getNote([5,2])).to.eql(new Note('B'));
      expect(fretboard.getNote([4,2])).to.eql(new Note('E5'));
      return expect(fretboard.getNote([3,1])).to.eql(new Note('G#5'));
    });
  });
});
