const majorScales = {
  C: ["C", "D", "E", "F", "G", "A", "B"],
  "C#": ["C#", "D#", "E#", "F#", "G#", "A#", "B#"],
  D: ["D", "E", "F#", "G", "A", "B", "C#"],
  "D#": ["D#", "E#", "F##", "G#", "A#", "B#", "C##"],
  E: ["E", "F#", "G#", "A", "B", "C#", "D#"],
  F: ["F", "G", "A", "Bb", "C", "D", "E"],
  "F#": ["F#", "G#", "A#", "B", "C#", "D#", "E#"],
  G: ["G", "A", "B", "C", "D", "E", "F#"],
  "G#": ["G#", "A#", "B#", "C#", "D#", "E#", "F##"],
  A: ["A", "B", "C#", "D", "E", "F#", "G#"],
  "A#": ["A#", "B#", "C##", "D#", "E#", "F##", "G##"],
  B: ["B", "C#", "D#", "E", "F#", "G#", "A#"],
};

const minorScales = {
  A: ["A", "B", "C", "D", "E", "F", "G"],
  "A#": ["A#", "B#", "C#", "D#", "E#", "F#", "G#"],
  B: ["B", "C#", "D", "E", "F#", "G", "A"],
  C: ["C", "D", "Eb", "F", "G", "Ab", "Bb"],
  "C#": ["C#", "D#", "E", "F#", "G#", "A", "B"],
  D: ["D", "E", "F", "G", "A", "Bb", "C"],
  "D#": ["D#", "E#", "F#", "G#", "A#", "B", "C#"],
  E: ["E", "F#", "G", "A", "B", "C", "D"],
  F: ["F", "G", "Ab", "Bb", "C", "Db", "Eb"],
  "F#": ["F#", "G#", "A", "B", "C#", "D", "E"],
  G: ["G", "A", "Bb", "C", "D", "Eb", "F"],
  "G#": ["G#", "A#", "B", "C#", "D#", "E", "F#"],
};

const dorianScales = {
  D: ["D", "E", "F", "G", "A", "B", "C"],
  "D#": ["D#", "F", "F#", "G#", "A#", "C", "C#"],
  E: ["E", "F#", "G", "A", "B", "C#", "D"],
  F: ["F", "G", "Ab", "Bb", "C", "D", "Eb"],
  "F#": ["F#", "G#", "A", "B", "C#", "D#", "E"],
  G: ["G", "A", "Bb", "C", "D", "E", "F"],
  "G#": ["G#", "A#", "B", "C#", "D#", "E#", "F#"],
  A: ["A", "B", "C", "D", "E", "F#", "G"],
  "A#": ["A#", "B#", "C#", "D#", "E#", "F#", "G#"],
  B: ["B", "C#", "D", "E", "F#", "G#", "A"],
  C: ["C", "D", "Eb", "F", "G", "A", "Bb"],
  "C#": ["C#", "D#", "E", "F#", "G#", "A#", "B"],
};

const phrygianScales = {
  E: ["E", "F", "G", "A", "B", "C", "D"],
  F: ["F", "Gb", "Ab", "Bb", "C", "Db", "Eb"],
  "F#": ["F#", "G", "A", "B", "C#", "D", "E"],
  G: ["G", "Ab", "Bb", "C", "D", "Eb", "F"],
  "G#": ["G#", "A", "B", "C#", "D#", "E", "F#"],
  A: ["A", "Bb", "C", "D", "E", "F", "G"],
  "A#": ["A#", "B", "C#", "D#", "E#", "F#", "G#"],
  B: ["B", "C", "D", "E", "F#", "G", "A"],
  C: ["C", "Db", "Eb", "F", "G", "Ab", "Bb"],
  "C#": ["C#", "D", "E", "F#", "G#", "A", "B"],
  D: ["D", "Eb", "F", "G", "A", "Bb", "C"],
  "D#": ["D#", "E", "F#", "G#", "A#", "B", "C#"],
};

const lydianScales = {
  F: ["F", "G", "A", "B", "C", "D", "E"],
  "F#": ["F#", "G#", "A#", "C", "C#", "D#", "F"],
  G: ["G", "A", "B", "C#", "D", "E", "F#"],
  "G#": ["G#", "A#", "C", "D", "D#", "F", "G"],
  A: ["A", "B", "C#", "D#", "E", "F#", "G#"],
  "A#": ["A#", "C", "D", "E", "F", "G", "A"],
  B: ["B", "C#", "D#", "F", "F#", "G#", "A#"],
  C: ["C", "D", "E", "F#", "G", "A", "B"],
  "C#": ["C#", "D#", "F", "G", "G#", "A#", "C"],
  D: ["D", "E", "F#", "G#", "A", "B", "C#"],
  "D#": ["D#", "F", "G", "A", "A#", "C", "D"],
  E: ["E", "F#", "G#", "A#", "B", "C#", "D#"],
};

const mixolydianScales = {
  G: ["G", "A", "B", "C", "D", "E", "F"],
  "G#": ["G#", "A#", "C", "C#", "D#", "F", "F#"],
  A: ["A", "B", "C#", "D", "E", "F#", "G"],
  "A#": ["A#", "C", "D", "D#", "F", "G", "G#"],
  B: ["B", "C#", "D#", "E", "F#", "G#", "A"],
  C: ["C", "D", "E", "F", "G", "A", "Bb"],
  "C#": ["C#", "D#", "F", "F#", "G#", "A#", "B"],
  D: ["D", "E", "F#", "G", "A", "B", "C"],
  "D#": ["D#", "F", "G", "G#", "A#", "C", "C#"],
  E: ["E", "F#", "G#", "A", "B", "C#", "D"],
  F: ["F", "G", "A", "Bb", "C", "D", "Eb"],
  "F#": ["F#", "G#", "A#", "B", "C#", "D#", "E"],
};

const locrianScales = {
  B: ["B", "C", "D", "E", "F", "G", "A"],
  C: ["C", "Db", "Eb", "F", "Gb", "Ab", "Bb"],
  "C#": ["C#", "D", "E", "F#", "G", "A", "B"],
  D: ["D", "Eb", "F", "G", "Ab", "Bb", "C"],
  "D#": ["D#", "E", "F#", "G#", "A", "B", "C#"],
  E: ["E", "F", "G", "A", "Bb", "C", "D"],
  F: ["F", "Gb", "Ab", "Bb", "Cb", "Db", "Eb"],
  "F#": ["F#", "G", "A", "B", "C", "D", "E"],
  G: ["G", "Ab", "Bb", "C", "Db", "Eb", "F"],
  "G#": ["G#", "A", "B", "C#", "D", "E", "F#"],
  A: ["A", "Bb", "C", "D", "Eb", "F", "G"],
  "A#": ["A#", "B", "C#", "D#", "E", "F#", "G#"],
};

const chordStructures = {
  major: ["Imaj7", "ii7", "iii7", "IVmaj7", "V7", "vi7", "viim7b5"],
  minor: ["i7", "iim7b5", "bIIImaj7", "iv7", "v7", "bVImaj7", "bVII7"],
  dorian: ["i7", "ii7", "bIIImaj7", "IV7", "v7", "vim7b5", "bVIImaj7"],
  phrygian: ["i7", "bIIm7b5", "bIIImaj7", "iv7", "v7", "bVImaj7", "bVII7"],
  lydian: ["Imaj7", "II7", "iii7", "#ivm7b5", "Vmaj7", "vi7", "vii7"],
  mixolydian: ["I7", "ii7", "iiim7b5", "IVmaj7", "v7", "vi7", "bVIImaj7"],
  locrian: ["im7b5", "bIIm7", "bIIImaj7", "iv7", "bV7", "bVImaj7", "bVII7"],
};

const diatonicChords = {
  major: ["I", "ii", "iii", "IV", "V", "vi", "viio"],
  minor: ["i", "iio", "III", "iv", "v", "VI", "VII"],
  dorian: ["i", "ii", "bIII", "IV", "v", "vio", "bVII"],
  phrygian: ["i", "bII", "bIII", "iv", "v", "bVI", "bVII"],
  lydian: ["I", "II", "iii", "#iv", "V", "vi", "vii"],
  mixolydian: ["I", "ii", "iiio", "IV", "v", "vi", "bVII"],
  locrian: ["io", "bII", "biii", "iv", "bV", "bVI", "bvii"],
};

const functionalChords = {
  major: {
    T: ["I", "iii", "vi"],
    S: ["ii", "IV", "ii7", "IV7"],
    D: ["V", "viio", "V7"],
  },
  minor: {
    T: ["i", "III", "VI"],
    S: ["iv", "ii°", "iv7"],
    D: ["V", "viio", "V7"],
  },
  dorian: {
    T: ["i", "iii", "v"],
    S: ["IV", "ii"],
    D: ["vii°", "V"],
  },
  phrygian: {
    T: ["i", "III", "v"],
    S: ["II", "iv"],
    D: ["vii°", "V"],
  },
  lydian: {
    T: ["I", "iii", "vi"],
    S: ["II", "IV"],
    D: ["vii°", "V"],
  },
  mixolydian: {
    T: ["I", "iii", "v"],
    S: ["ii", "IV"],
    D: ["vii°", "V"],
  },
  locrian: {
    T: ["i°", "III", "v"],
    S: ["ii°", "iv"],
    D: ["vii°", "V"],
  },
};

const secondaryDominants = {
  major: ["V/ii", "V/iii", "V/IV", "V/V", "V/vi"],
  minor: ["V/III", "V/iv", "V/V", "V/VI", "V/vii°"],
  dorian: ["V/ii", "V/III", "V/IV", "V/v"],
  phrygian: ["V/II", "V/III", "V/iv", "V/V"],
  lydian: ["V/ii", "V/iii", "V/IV", "V/V", "V/vi"],
  mixolydian: ["V/ii", "V/iii", "V/IV", "V/v", "V/VI"],
  locrian: ["V/ii°", "V/III", "V/iv", "V/V"],
};

const borrowedChords = {
  major: ["i", "bIII", "bVI", "bVII", "iv", "bII"],
  minor: ["I", "IV", "V", "viio", "bVII", "III"],
  dorian: ["bIII", "IV", "bVII"],
  phrygian: ["bII", "iv", "bVII"],
  lydian: ["ii", "V", "vi"],
  mixolydian: ["bVII", "ii", "v"],
  locrian: ["bII", "iv", "bV"],
};

export {
  majorScales,
  minorScales,
  dorianScales,
  phrygianScales,
  lydianScales,
  mixolydianScales,
  locrianScales,
  chordStructures,
  diatonicChords,
  functionalChords,
  secondaryDominants,
  borrowedChords,
};
