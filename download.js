const fs = require('fs');
const util = require('util');

const exec = util.promisify(require('child_process').exec);

async function download(day, year, cookie) {
  const { stdout } = await exec(`curl -b session=${cookie} https://adventofcode.com/${year}/day/${day}/input`);
  return stdout;
}

function main() {
  const cookie = fs.readFileSync('.cookie', { encoding: 'utf8' });
  if (process.argv.length < 4) {
    console.log('Require [DAY] [YEAR]... node download.js 3 2018');
    process.exit(0);
  }

  const day = process.argv[2];
  const year = process.argv[3];
  download(day, year, cookie.trim('\n')).then(input => {
    fs.writeFileSync(`./input/${year}/day-${day}.txt`, input);
  });
}

main();
