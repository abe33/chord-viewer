import expect from 'expect.js'
import FretPosition from '../src/fret-position'

describe('FretPosition', function() {
  describe('creation', function() {
    it('takes an array and fill the string and fret properties in order', function() {
      var position = new FretPosition([0,4]);
      expect(position.string).to.eql(0);
      return expect(position.fret).to.eql(4);
    });

    return it('takes an object and fill the string and fret properties', function() {
      var position = new FretPosition({string: 0, fret: 4});
      expect(position.string).to.eql(0);
      return expect(position.fret).to.eql(4);
    });
  });

  return describe('.fromObject', function() {
    it('returns a FretPosition', function() {
      expect(FretPosition.fromObject([0,4])).to.eql(new FretPosition([0,4]));
      return expect(FretPosition.fromObject({string: 0, fret: 4})).to.eql(new FretPosition([0,4]));
    });

    return it('returns the same object when the argument is already a FretPosition', function() {
      var position = new FretPosition([0,4]);
      return expect(FretPosition.fromObject(position)).to.eql(position);
    });
  });
});
