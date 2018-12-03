const utils = require('./../utils');

const INPUT_DATA = utils.openInputForDay(2, 2018);

function compareStrings(str1, str2, tolerance = 0) {
  if (str1.length !== str2.length) return [ false ];
  let matchingString = '';
  let diff = 0;

  for (let i = 0; i < str1.length; i++) {
    const char1 = str1[i];
    const char2 = str2[i];

    if (char1 !== char2) {
      diff++;
      if (diff > tolerance) return [ false ];
    } else {
      matchingString += char1;
    }
  }

  if (diff !== tolerance) return [ false ];
  return [ true, matchingString ];
}

function findMatchingSequences(sequences) {
  for (let i = 0; i < sequences.length; i++) {
    for (let j = 1; j < sequences.length; j++) {
      const one = sequences[i];
      const two = sequences[j];
      const [ didMatch, sequence ] = compareStrings(one, two, 1);
      if (didMatch) return sequence;
    }
  }
}

function checkRepeatCharacters(sequence) {
  const characters = {};
  let two = false;
  let three = false;

  for (let j = 0; j < sequence.length; j++) {
    const character = sequence[j];

    if (!characters[character]) characters[character] = 0;
    characters[character]++;
  }
  return characters;
}

// provided a list of sequences of alphabetic characters

// Brute force:
// iterate over all sequences

// iterate over each sequence

// For each sequence, iterate over the entire sequence or until a characters is
// found to repeat 3 times
function calculateChecksum(sequences) {
  let twos = 0;
  let threes = 0;

  for (let i = 0; i < sequences.length; i++) {
    const sequence = sequences[i];
    const characters = checkRepeatCharacters(sequence);
    const hasTwoMatch = Object.values(characters).some(c => c === 2);
    const hasThreeMatch = Object.values(characters).some(c => c === 3);

    if (hasTwoMatch) twos++;
    if (hasThreeMatch) threes++;
  }

  return twos * threes;
}

function formatInput(fileContent) {
  return fileContent
    .filter(value => Boolean(value))
    .map(value => value.toLowerCase());
}

function main() {
  if(process.argv.length < 3) {
    process.stdout.write('Please provide the part of code you would like to run\n');
    process.stdout.write('USE: node 2018/aoc2.js [PART]\n');
    process.exit(0);
  }

  const input = formatInput(INPUT_DATA);
  switch (process.argv[2]) {
    case '1':
      console.log(calculateChecksum(input));
      break;
    case '2':
      console.log(findMatchingSequences(input));
      break;
    default:
      console.log('Part number not recognized\n');
      break;
  }
}

main();
