import R from 'ramda'

const {divide, map, multiply} = R

const OCTAVE_PITCH_RATIO = 2
const MIDDLE_OCTAVE = 4
const CHROMATIC_SCALE_LENGTH = 12
const NOTE_REGEXP = /[A-G](#|b)?(\d+)?/
const INTERVAL_REGEXP = /(P|m|M|d|A|perf|min|maj|dim|aug)(\d)/
const DIATONIC_SCALE = [
  'C', 'D', 'E', 'F', 'G', 'A', 'B'
]

const DIATONIC_INDEX_MAP = {
  'C': 0,
  'D': 1,
  'E': 2,
  'F': 3,
  'G': 4,
  'A': 5,
  'B': 6
}

const CHROMATIC_SCALE = [
  'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'
]

const CHROMATIC_INDEX_MAP = {
  'C': 0,
  'C#': 1,
  'Db': 1,
  'D': 2,
  'D#': 3,
  'Eb': 3,
  'E': 4,
  'F': 5,
  'F#': 6,
  'Gb': 6,
  'G': 7,
  'G#': 8,
  'Ab': 8,
  'A': 9,
  'A#': 10,
  'Bb': 10,
  'B': 11
}

const PITCH_BY_NAME = {
  'C': 261.63,
  'C#': 277.18,
  'Db': 277.18,
  'D': 293.66,
  'D#': 311.13,
  'Eb': 311.13,
  'E': 329.63,
  'F': 349.23,
  'F#': 369.99,
  'Gb': 369.99,
  'G': 392.00,
  'G#': 415.30,
  'Ab': 415.30,
  'A': 440,
  'A#': 466.16,
  'Bb': 466.16,
  'B': 493.88
}

const DEFAULT_PITCH_RANGE = [PITCH_BY_NAME.C, PITCH_BY_NAME.C * 2]

const OCTAVES_PITCH_RANGES = [
  [ 1, map(divide(R.__, 8), DEFAULT_PITCH_RANGE) ],
  [ 2, map(divide(R.__, 4), DEFAULT_PITCH_RANGE) ],
  [ 3, map(divide(R.__, 2), DEFAULT_PITCH_RANGE) ],
  [ 4, DEFAULT_PITCH_RANGE ],
  [ 5, map(multiply(R.__, 2), DEFAULT_PITCH_RANGE) ],
  [ 6, map(multiply(R.__, 4), DEFAULT_PITCH_RANGE) ],
  [ 7, map(multiply(R.__, 8), DEFAULT_PITCH_RANGE) ],
  [ 8, map(multiply(R.__, 16), DEFAULT_PITCH_RANGE) ]
]

const SEMITONE_CONVERSION = {
  'C#': 'Db',
  'Db': 'C#',
  'D#': 'Eb',
  'Eb': 'D#',
  'F#': 'Gb',
  'Gb': 'F#',
  'G#': 'Ab',
  'Ab': 'G#',
  'A#': 'Bb',
  'Bb': 'A#'
}

const INTERVAL_SHORT_PREFIXES = {
  perfect: 'P',
  minor: 'm',
  major: 'M',
  diminued: 'd',
  augmented: 'A'
}

const INTERVAL_LONG_PREFIXES = {
  perfect: 'perf',
  minor: 'min',
  major: 'maj',
  diminued: 'dim',
  augmented: 'aug'
}

const INTERVAL_OFFSETS = {
  min2: 1,
  maj2: 2,
  min3: 3,
  maj3: 4,
  perf4: 5,
  aug4: 6,
  dim5: 6,
  perf5: 7,
  dim6: 7,
  aug5: 8,
  min6: 8,
  maj6: 9,
  min7: 10,
  maj7: 11,
  perf8: 12,
  m2: 1,
  M2: 2,
  m3: 3,
  M3: 4,
  P4: 5,
  A4: 6,
  d5: 6,
  P5: 7,
  d6: 7,
  A5: 8,
  m6: 8,
  M6: 9,
  m7: 10,
  M7: 11,
  P8: 12
}

const DIATONIC_TO_CHROMATIC = {
  1: 0,
  2: 2,
  3: 4,
  4: 5,
  5: 7,
  6: 9,
  7: 11
}

const QUALITY_BY_DIATONIC_DISTANCE = {
  '1': {
    '0': 'perfect',
    '1': 'augmented',
    '2': 'augmented'
  },
  '2': {
    '-2': 'diminued',
    '-1': 'minor',
    '0': 'major',
    '1': 'augmented',
    '2': 'augmented'
  },
  '3': {
    '-2': 'diminued',
    '-1': 'minor',
    '0': 'major',
    '1': 'augmented',
    '2': 'augmented'
  },
  '4': {
    '-1': 'diminued',
    '0': 'perfect',
    '1': 'augmented',
    '2': 'augmented'
  },
  '5': {
    '-1': 'diminued',
    '0': 'perfect',
    '1': 'augmented',
    '2': 'augmented'
  },
  '6': {
    '-2': 'diminued',
    '-1': 'minor',
    '0': 'major',
    '1': 'augmented',
    '2': 'augmented'
  },
  '7': {
    '-2': 'diminued',
    '-1': 'minor',
    '0': 'major',
    '1': 'augmented',
    '2': 'augmented'
  }
}

const OCTAVE_DISPLAY_MAP = {
  '0': '₀',
  '1': '₁',
  '2': '₂',
  '3': '₃',
  '4': '₄',
  '5': '₅',
  '6': '₆',
  '7': '₇',
  '8': '₈',
  '9': '₉'
}

const ACCIDENTALS_DISPLAY_MAP = {
  '#': '♯',
  'b': '♭'
}

export default {
  ACCIDENTALS_DISPLAY_MAP,
  CHROMATIC_INDEX_MAP,
  CHROMATIC_SCALE_LENGTH,
  CHROMATIC_SCALE,
  DEFAULT_PITCH_RANGE,
  DIATONIC_INDEX_MAP,
  DIATONIC_SCALE,
  DIATONIC_TO_CHROMATIC,
  INTERVAL_LONG_PREFIXES,
  INTERVAL_OFFSETS,
  INTERVAL_REGEXP,
  INTERVAL_SHORT_PREFIXES,
  MIDDLE_OCTAVE,
  NOTE_REGEXP,
  OCTAVE_DISPLAY_MAP,
  OCTAVE_PITCH_RATIO,
  OCTAVES_PITCH_RANGES,
  PITCH_BY_NAME,
  QUALITY_BY_DIATONIC_DISTANCE,
  SEMITONE_CONVERSION
}
