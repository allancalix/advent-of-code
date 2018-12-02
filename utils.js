const fs = require('fs');
const path = require('path');

function openInputForDay(day, year) {
  const inputPath = path.join(process.cwd(), `input/${year}/day-${day}.txt`);
  const text = fs.readFileSync(inputPath, { encoding: 'utf8' });
  return text.split('\n');
}

module.exports = {
  openInputForDay,
};
