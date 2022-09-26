'use strict';
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var recognition = new SpeechRecognition();

const commands = [
  { keyword: 'page suivante', command: 'nextPage' },
  { keyword: 'page précédente', command: 'previousPage' },
  { keyword: 'aléatoire', command: 'newAlea' },
];

recognition.lang = 'fr-FR';
recognition.continuous = true;

// This runs when the speech recognition service starts
recognition.onstart = function () {
  console.log('Listening to your voice!');
};

recognition.onspeechend = function () {
  console.log('Speech ended!');
  recognition.stop();
};

recognition.onerror = function (event) {
  console.log('Error:', event.message);
};

// This runs when the speech recognition service returns result
recognition.onresult = function (event) {
  const results = event.results[event.results.length - 1][0];
  var transcript = results.transcript.trim().toLowerCase();
  var confidence = results.confidence;
  console.log(`You said "${transcript}"\t(confidence: ${confidence})`);
  commands.forEach((elem) => {
    if (transcript.includes(elem.keyword)) {
      // TODO: Actually call the corresponding command
      console.log(`Recognized command ${elem.command}!`);
    }
  });
};

// FIXME: Speech recognition only lasts for a few seconds. If the
// lines below are uncommented, the web browser will ask every few
// seconds the rights to access the microphone.

// recognition.onend = function () {
//   recognition.start();
// };

console.log('Starting speech recognition');
recognition.start();
