import {
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
} from "./data.js";

document.getElementById("generate").addEventListener("click", () => {
  const scale = document.getElementById("scale").value;
  const mode = document.getElementById("mode").value;
  const generationMode = document.getElementById("generation-mode").value;

  const generateProgression = modes[generationMode];
  const chords = generateProgression(scale, mode);

  displayChords(chords, scale, mode);
});

function displayChords(chords, scale, mode) {
  const chordsDiv = document.getElementById("chords");
  const scaleNotes = getScaleNotes(scale, mode);

  chordsDiv.innerHTML = `
    <p>${chords.join(" - ")}</p>
    <h3>Scale Notes:</h3>
    <p>${scaleNotes.join(", ")}</p>
  `;
}

function getScaleNotes(scale, mode) {
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

  return scaleNotes;
}

const modes = {
  "Feeling Dangerous": generateRandomProgression,
  "Whoa There": generateDiatonicProgression,
  "Fancy Boy": generateExploratoryProgression,
  Harmony: generateFunctionalProgression,
  Davey: generateJazzProgression,
};

// Random chord generation
function generateRandomProgression(scale, mode) {
  const diatonic = diatonicChords[mode];
  const progression = [];

  for (let i = 0; i < 4; i++) {
    const chord = diatonic[Math.floor(Math.random() * diatonic.length)];
    progression.push(chord);
  }

  return progression;
}

// Diatonic progression with added randomness
function generateDiatonicProgression(scale, mode) {
  const diatonic = diatonicChords[mode];
  const progression = [diatonic[0]]; // Start with the tonic chord

  for (let i = 1; i < 4; i++) {
    const chord = diatonic[Math.floor(Math.random() * diatonic.length)];
    progression.push(chord);
  }

  return progression;
}

// Incorporates secondary dominants and borrowed chords
function generateExploratoryProgression(scale, mode) {
  const diatonic = diatonicChords[mode];
  const secondary = secondaryDominants[mode];
  const borrowed = borrowedChords[mode];
  const progression = [diatonic[0]]; // Start with the tonic chord

  for (let i = 1; i < 4; i++) {
    const rand = Math.random();
    if (rand < 0.6) {
      progression.push(diatonic[Math.floor(Math.random() * diatonic.length)]);
    } else if (rand < 0.8) {
      progression.push(secondary[Math.floor(Math.random() * secondary.length)]);
    } else {
      progression.push(borrowed[Math.floor(Math.random() * borrowed.length)]);
    }
  }

  return progression;
}

// Follows strict functional harmony rules
function generateFunctionalProgression(scale, mode) {
  const progression = [];
  const functions = ["T", "S", "D", "T"];

  functions.forEach((func) => {
    const chordOptions = functionalChords[mode][func];
    const chord = chordOptions[Math.floor(Math.random() * chordOptions.length)];
    progression.push(chord);
  });

  return progression;
}

// Focuses on jazz chord progressions and voicings
function generateJazzProgression(scale, mode) {
  const diatonic = diatonicChords[mode];
  const progression = [diatonic[0]]; // Start with the tonic chord

  for (let i = 1; i < 4; i++) {
    const chord = diatonic[Math.floor(Math.random() * diatonic.length)];
    progression.push(addJazzVoicing(chord));
  }

  return progression;
}

function addJazzVoicing(chord) {
  const jazzVoicings = ["maj7", "min7", "7", "9", "13", "m7b5"];
  return `${chord}${
    jazzVoicings[Math.floor(Math.random() * jazzVoicings.length)]
  }`;
}

function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

function getCurrentTimestamp() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
}

document.getElementById("save").addEventListener("click", () => {
  const chordsText = document.getElementById("chords").innerText;
  const timestamp = getCurrentTimestamp();
  const filename = `chord_progression_${timestamp}.txt`;

  if (isIOS()) {
    // For iOS devices, open the content in a new tab
    const newWindow = window.open();
    newWindow.document.write(`<pre>${chordsText}</pre>`);
    newWindow.document.close();
  } else {
    // For non-iOS devices, create and download a text file
    const blob = new Blob([chordsText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  }
});

document.getElementById("share").addEventListener("click", () => {
  const chordsText = document.getElementById("chords").innerText;
  navigator.clipboard.writeText(chordsText).then(() => {
    alert("Chord progression copied to clipboard!");
  });
});
