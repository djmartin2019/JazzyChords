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

const tempoSlider = document.getElementById("tempoSlider");
const tempoValue = document.getElementById("tempoValue");

// tempoValue.textContent = tempoSlider.value;

// function tempoChange(value) {
//   const tempoValue = document.getElementById("tempoValue");
//   tempoValue.textContent = value;
// }

// tempoSlider.addEventListener("input", function () {
//   tempoChange(this.value);
// });

function getTimeSignature() {
  const timeSignature = document.getElementById("time-signature");
  const parts = timeSignature.value.split("/");
  const beats = parseInt(parts[0], 10);
  const beatDuration = parseInt(parts[1], 10);
  return [beats, beatDuration];
}

function displayChords(chordsData, scale, mode) {
  const chordsDiv = document.getElementById("chords");
  const scaleNotes = getScaleNotes(scale, mode);

  const formattedChords = chordsData.progression
    .map((barProgression) => {
      const barChords = barProgression.map(
        (chordData) => `${chordData.chord} (${chordData.duration})`
      );
      return `<p>${barChords.join(" - ")}</p>`;
    })
    .join("");

  chordsDiv.innerHTML = `
    ${formattedChords}
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
  Fancy: generateExploratoryProgression,
  Harmony: generateFunctionalProgression,
  Davey: generateJazzProgression,
};

// Random chord generation
function generateRandomProgression(scale, mode, numOfBars) {
  const diatonic = diatonicChords[mode];
  const progression = [];

  const timeSig = getTimeSignature();
  const beatsPerMeasure = timeSig[0];
  const beatDuration = timeSig[1];

  for (let bar = 0; bar < numOfBars; bar++) {
    let remainingBeats = beatsPerMeasure;
    const barProgression = [];
    let previousChord = diatonic[0]; // Start with the tonic chord

    while (remainingBeats > 0) {
      const chord = diatonic[Math.floor(Math.random() * diatonic.length)];
      if (chord !== previousChord || remainingBeats === beatsPerMeasure) {
        const duration = Math.min(
          Math.floor(Math.random() * remainingBeats) + 1,
          remainingBeats
        );
        barProgression.push({
          chord: chord,
          duration: duration,
        });
        remainingBeats -= duration;
        previousChord = chord;
      }
    }

    progression.push(barProgression);
  }

  return {
    progression: progression,
    beatDuration: beatDuration,
  };
}

// Diatonic progression with added randomness
function generateDiatonicProgression(scale, mode, numOfBars) {
  const diatonic = diatonicChords[mode];
  const progression = [];

  const timeSig = getTimeSignature();
  const beatsPerMeasure = timeSig[0];
  const beatDuration = timeSig[1];

  for (let bar = 0; bar < numOfBars; bar++) {
    let remainingBeats = beatsPerMeasure;
    const barProgression = [];
    const chordOptions = functionalChords[mode]["T"];
    let previousChord =
      chordOptions[Math.floor(Math.random() * chordOptions.length)];

    while (remainingBeats > 0) {
      let chord =
        previousChord === diatonic[0]
          ? diatonic[1]
          : diatonic[Math.floor(Math.random() * diatonic.length)];
      if (chord !== previousChord) {
        const duration = Math.min(
          Math.floor(Math.random() * remainingBeats) + 1,
          remainingBeats
        );
        barProgression.push({
          chord: chord,
          duration: duration,
        });
        remainingBeats -= duration;
        previousChord = chord;
      }
    }

    progression.push(barProgression);
  }

  return {
    progression: progression,
    beatDuration: beatDuration,
  };
}

// Incorporates secondary dominants and borrowed chords
function generateExploratoryProgression(scale, mode, numOfBars) {
  const diatonic = diatonicChords[mode];
  const secondary = secondaryDominants[mode];
  const borrowed = borrowedChords[mode];
  const progression = [];

  const timeSig = getTimeSignature();
  const beatsPerMeasure = timeSig[0];
  const beatDuration = timeSig[1];

  for (let bar = 0; bar < numOfBars; bar++) {
    let remainingBeats = beatsPerMeasure;
    const barProgression = [];
    let previousChord = diatonic[0]; // Start with the tonic chord

    while (remainingBeats > 0) {
      let chord = "";
      if (
        previousChord === diatonic[0] ||
        previousChord === secondary[0] ||
        previousChord === borrowed[0]
      ) {
        chord =
          functionalChords[mode]["T"][
            Math.floor(Math.random() * functionalChords[mode]["T"].length)
          ];
      } else {
        const rand = Math.random();
        if (rand < 0.6) {
          chord = diatonic[Math.floor(Math.random() * diatonic.length)];
        } else if (rand < 0.8) {
          chord = secondary[Math.floor(Math.random() * secondary.length)];
        } else {
          chord = borrowed[Math.floor(Math.random() * borrowed.length)];
        }
      }
      if (chord !== previousChord) {
        const duration = Math.min(
          Math.floor(Math.random() * remainingBeats) + 1,
          remainingBeats
        );
        barProgression.push({
          chord: chord,
          duration: duration,
        });
        remainingBeats -= duration;
        previousChord = chord;
      }
    }
    progression.push(barProgression);
  }

  return {
    progression: progression,
    beatDuration: beatDuration,
  };
}

// Follows strict functional harmony rules
function generateFunctionalProgression(scale, mode, numOfBars) {
  const progression = [];

  const timeSig = getTimeSignature();
  const beatsPerMeasure = timeSig[0];
  const beatDuration = timeSig[1];

  for (let bar = 0; bar < numOfBars; bar++) {
    let remainingBeats = beatsPerMeasure;
    const barProgression = [];
    let previousChord = functionalChords[mode]["T"][0]; // Start with the tonic chord

    while (remainingBeats > 0) {
      let chord = "";
      let chordOptions = "";

      if (
        remainingBeats === beatsPerMeasure ||
        (remainingBeats === 1 && progression.length > 1)
      ) {
        chordOptions = functionalChords[mode]["T"];
        chord = chordOptions[Math.floor(Math.random() * chordOptions.length)];
      } else {
        const rand = Math.random();
        if (rand > 0.5) {
          chordOptions = functionalChords[mode]["S"];
          chord = chordOptions[Math.floor(Math.random() * chordOptions.length)];
        } else {
          chordOptions = functionalChords[mode]["D"];
          chord = chordOptions[Math.floor(Math.random() * chordOptions.length)];
        }
      }
      if (chord !== previousChord) {
        const duration = Math.min(
          Math.floor(Math.random() * remainingBeats) + 1,
          remainingBeats
        );
        barProgression.push({
          chord: chord,
          duration: duration,
        });
        remainingBeats -= duration;
        previousChord = chord;
      }
    }
    progression.push(barProgression);
  }

  return {
    progression: progression,
    beatDuration: beatDuration,
  };
}

// Focuses on jazz chord progressions and voicings
function generateJazzProgression(scale, mode, numOfBars) {
  const diatonic = diatonicChords[mode];
  const progression = [];

  const timeSig = getTimeSignature();
  const beatsPerMeasure = timeSig[0];
  const beatDuration = timeSig[1];

  for (let bar = 0; bar < numOfBars; bar++) {
    let remainingBeats = beatsPerMeasure;
    const barProgression = [];
    const chordOptions = functionalChords[mode]["T"];
    let previousChord =
      chordOptions[Math.floor(Math.random() * chordOptions.length)];

    while (remainingBeats > 0) {
      let chord =
        previousChord === diatonic[0]
          ? diatonic[1]
          : diatonic[Math.floor(Math.random() * diatonic.length)];
      if (chord !== previousChord) {
        const duration = Math.min(
          Math.floor(Math.random() * remainingBeats) + 1,
          remainingBeats
        );
        const jazzyChord = addJazzVoicing(chord);
        barProgression.push({
          chord: jazzyChord,
          duration: duration,
        });
        remainingBeats -= duration;
        previousChord = chord;
      }
    }
    progression.push(barProgression);
  }

  return {
    progression: progression,
    beatDuration: beatDuration,
  };
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

document.getElementById("generate").addEventListener("click", () => {
  const scale = document.getElementById("scale").value;
  const mode = document.getElementById("mode").value;
  const generationMode = document.getElementById("generation-mode").value;
  const numOfBars = parseInt(document.getElementById("bars").value, 10);

  const generateProgression = modes[generationMode];
  const chords = generateProgression(scale, mode, numOfBars);

  displayChords(chords, scale, mode);
});

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
