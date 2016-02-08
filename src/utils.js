
import c from './constants'

export default {
  pitchAtOctave(name, octave) {
    var delta = octave - c.MIDDLE_OCTAVE;

    var pitch = c.PITCH_BY_NAME[name];
    if (delta > 0) {
      for (var i = 0; 0 < delta ? i < delta : i > delta; 0 < delta ? i++ : i--) {
        pitch *= c.OCTAVE_PITCH_RATIO;
      }
    } else {
      var end = Math.abs(delta);
      for (var i = 0; 0 < end ? i < end : i > end; 0 < end ? i++ : i--) {
        pitch /= c.OCTAVE_PITCH_RATIO;
      }
    }
    return pitch;
  },

  diatonicDistance(start, end) {
    start = start[0];
    end = end[0];

    var startIndex = c.DIATONIC_SCALE.indexOf(start);
    var endIndex = c.DIATONIC_SCALE.indexOf(end);
    if (endIndex < startIndex) { endIndex += c.DIATONIC_SCALE.length; }

    return endIndex - startIndex + 1;
  },

  chromaticDistance(start, end) {
    var startIndex = c.CHROMATIC_SCALE.indexOf(start);
    var endIndex = c.CHROMATIC_SCALE.indexOf(end);

    if (startIndex === -1) {
      startIndex = c.CHROMATIC_SCALE.indexOf(c.SEMITONE_CONVERSION[start]);
    }

    if (endIndex === -1) {
      endIndex = c.CHROMATIC_SCALE.indexOf(c.SEMITONE_CONVERSION[end]);
    }

    if (endIndex < startIndex) {
      endIndex += c.CHROMATIC_SCALE.length;
    }

    return endIndex - startIndex;
  },

  noteAtDiatonicInterval(start, length) {
    var index = c.DIATONIC_SCALE.indexOf(start);
    return c.DIATONIC_SCALE[(index + length - 1) % c.DIATONIC_SCALE.length];
  }
}
