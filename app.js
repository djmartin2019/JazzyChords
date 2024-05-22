document
  .getElementById("generate")
  .addEventListener("click", generateChordProgression);
document.getElementById("play").addEventListener("click", playChords);
document.getElementById("pause").addEventListener("click", pauseChords);
document.getElementById("stop").addEventListener("click", stopChords);

let chords = [];
let currentChordIndex = 0;
let isPlaying = false;
let audioContext = new (window.AudioContext || window.webkitAudioContext)();
let gainNode = audioContext.createGain();

const chordStructures = {
  major: ["Imaj7", "ii7", "iii7", "IVmaj7", "V7", "vi7", "viim7b5"],
  minor: ["i7", "iim7b5", "bIIImaj7", "iv7", "v7", "bVImaj7", "bVII7"],
  dorian: ["i7", "ii7", "bIIImaj7", "IV7", "v7", "vim7b5", "bVIImaj7"],
  phrygian: ["i7", "bIIm7b5", "bIIImaj7", "iv7", "v7", "bVImaj7", "bVII7"],
  lydian: ["Imaj7", "II7", "iii7", "#ivm7b5", "Vmaj7", "vi7", "vii7"],
  mixolydian: ["I7", "ii7", "iiim7b5", "IVmaj7", "v7", "vi7", "bVIImaj7"],
  locrian: ["im7b5", "bIIm7", "bIIImaj7", "iv7", "bV7", "bVImaj7", "bVII7"],
};

const scales = {
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

function generateChordProgression() {
  const scale = document.getElementById("scale").value;
  const mode = document.getElementById("mode").value;
  const structure = chordStructures[mode];
  chords = [];
  for (let i = 0; i < 4; i++) {
    const chord = structure[Math.floor(Math.random() * structure.length)];
    chords.push(chord);
  }
  displayChords(scale);
}

function displayChords(scale) {
  const chordsDiv = document.getElementById("chords");
  const scaleNotes = scales[scale];
  chordsDiv.innerHTML = `
      <h3>Chord Progression:</h3>
      <p>${chords.join(" - ")}</p>
      <h3>Scale Notes:</h3>
      <p>${scaleNotes.join(", ")}</p>
  `;
}

function playChords() {
  if (isPlaying) return;
  isPlaying = true;
  currentChordIndex = 0;
  playNextChord();
}

function playNextChord() {
  if (!isPlaying || currentChordIndex >= chords.length) {
    isPlaying = false;
    return;
  }
  const chord = chords[currentChordIndex];
  playChord(chord);
  currentChordIndex++;
  setTimeout(playNextChord, 2000);
}

function playChord(chord) {
  console.log(`Playing chord: ${chord}`);
}

function pauseChords() {
  isPlaying = false;
}

function stopChords() {
  isPlaying = false;
  currentChordIndex = 0;
}

function playChord(chord) {
  const oscillator = audioContext.createOscillator();
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
  oscillator.connect(gainNode).connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 2);
}
