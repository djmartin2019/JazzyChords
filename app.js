import {
  majorScales,
  minorScales,
  dorianScales,
  phrygianScales,
  lydianScales,
  mixolydianScales,
  locrianScales,
} from "./data.js";

document
  .getElementById("generate")
  .addEventListener("click", generateChordProgression);

let chords = [];

const chordStructures = {
  major: ["Imaj7", "ii7", "iii7", "IVmaj7", "V7", "vi7", "viim7b5"],
  minor: ["i7", "iim7b5", "bIIImaj7", "iv7", "v7", "bVImaj7", "bVII7"],
  dorian: ["i7", "ii7", "bIIImaj7", "IV7", "v7", "vim7b5", "bVIImaj7"],
  phrygian: ["i7", "bIIm7b5", "bIIImaj7", "iv7", "v7", "bVImaj7", "bVII7"],
  lydian: ["Imaj7", "II7", "iii7", "#ivm7b5", "Vmaj7", "vi7", "vii7"],
  mixolydian: ["I7", "ii7", "iiim7b5", "IVmaj7", "v7", "vi7", "bVIImaj7"],
  locrian: ["im7b5", "bIIm7", "bIIImaj7", "iv7", "bV7", "bVImaj7", "bVII7"],
};

function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

function generateChordProgression() {
  const scale = document.getElementById("scale").value;
  const mode = document.getElementById("mode").value;
  const structure = chordStructures[mode];

  // Show loading indicator
  document.getElementById("loading").style.display = "block";
  chords = [];

  setTimeout(() => {
    for (let i = 0; i < 4; i++) {
      const chord = structure[Math.floor(Math.random() * structure.length)];
      chords.push(chord);
    }
    displayChords(scale, mode);

    // Hide loading indicator and show buttons
    document.getElementById("loading").style.display = "none";
    document.getElementById("save").style.display = "inline-block";
    document.getElementById("share").style.display = "inline-block";
  }, 1000); // Simulating loading time
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
