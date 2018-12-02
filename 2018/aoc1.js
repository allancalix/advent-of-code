const utils = require('./../utils');

const INPUT_DATA = utils.openInputForDay(1, 2018);

function calculateDrift(drifts) {
  return drifts
    .reduce((acc, value) => acc + value, 0);
}

function findFirstDuplicateFrequency(drifts) {
  const frequenciesEncountered = new Set();
  let frequency = 0;
  let i = 0;

  while (true) {
    if (i === drifts.length) i = 0;

    frequency += drifts[i];
    if (frequenciesEncountered.has(frequency)) return frequency;
    frequenciesEncountered.add(frequency);
    i++;
  }
}

function formatInput(fileContent) {
  return fileContent
    .filter(value => Boolean(value))
    .map(value => parseFloat(value));
}

function main() {
  if(process.argv.length < 3) {
    process.stdout.write('Please provide the part of code you would like to run\n');
    process.stdout.write('USE: node 2018/aoc1.js [PART]\n');
    process.exit(0);
  }

  const input = formatInput(INPUT_DATA)
  switch (process.argv[2]) {
    case '1':
      console.log(calculateDrift(input));
      break;
    case '2':
      console.log(findFirstDuplicateFrequency(input));
      break;
    default:
      console.log('Part number not recognized\n');
      break;
  }
}

main();
