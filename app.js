import {
  majorScales,
  minorScales,
  dorianScales,
  phrygianScales,
  lydianScales,
  mixolydianScales,
  locrianScales,
  chordStructures,
} from "./data.js";

document
  .getElementById("generate")
  .addEventListener("click", generateChordProgression);
/* document.getElementById("play").addEventListener("click", playChords);
document.getElementById("pause").addEventListener("click", pauseChords);
document.getElementById("stop").addEventListener("click", stopChords); */

let chords = [];
let currentChordIndex = 0;
let isPlaying = false;
let audioContext = new (window.AudioContext || window.webkitAudioContext)();
let gainNode = audioContext.createGain();

function generateChordProgression() {
  const scale = document.getElementById("scale").value;
  const mode = document.getElementById("mode").value;
  const structure = chordStructures[mode];
  chords = [];
  for (let i = 0; i < 4; i++) {
    const chord = structure[Math.floor(Math.random() * structure.length)];
    chords.push(chord);
  }
  displayChords(scale, mode);
}

function displayChords(scale, mode) {
  const chordsDiv = document.getElementById("chords");
  let scaleNotes = [];

  switch (mode) {
    case "major":
      scaleNotes = majorScales[scale];
      break;
    case "minor":
      scaleNotes = minorScales[scale];
      break;
    case "dorian":
      scaleNotes = dorianScales[scale];
      break;
    case "phrygian":
      scaleNotes = phrygianScales[scale];
      break;
    case "lydian":
      scaleNotes = lydianScales[scale];
      break;
    case "mixolydian":
      scaleNotes = mixolydianScales[scale];
      break;
    case "locrian":
      scaleNotes = locrianScales[scale];
      break;
    default:
      scaleNotes = [];
  }

  chordsDiv.innerHTML = `
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
