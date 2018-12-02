const fs = require('fs');

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
    .split('\n')
    .filter(value => Boolean(value))
    .map(value => parseFloat(value));
}

function main() {
  const text = fs.readFileSync('./inputs/2018/day-1.txt', { encoding: 'utf8' });
  const input = formatInput(text)
  console.log(findFirstDuplicateFrequency(input));
}

main();
