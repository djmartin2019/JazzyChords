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

let chords = [];

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
