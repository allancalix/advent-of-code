const utils = require('./../utils');

const INPUT_DATA = utils.openInputForDay(3, 2018);

const createMatrix = () => {
  const matrix = [];

  for (let i = 0; i < 1000; i++) {
    const column = [];
    for (let j = 0; j < 1000; j++) {
      column.push(0);
    }
    matrix.push(column);
  }
  return matrix;
}

function fillMatrix(claims) {
  const matrix = createMatrix();

  for (let i = 0; i < claims.length; i++) {
    const claim = claims[i];

    for (let j = 0; j < claim.width; j++) {
      for (let k = 0; k < claim.height; k++) {
        matrix[j + claim.left][k + claim.top]++;
      }
    }
  }

  return matrix;
}

function isIntact(matrix, claim) {
  for (let i = 0; i < claim.width; i++) {
    for (let j = 0; j < claim.height; j++) {
      if (matrix[i + claim.left][j + claim.top] !== 1) return false;
    }
  }

  return true;
}

function countNotOverlapped(claims) {
  const fabricPlan = fillMatrix(claims);

  for (let i = 0; i < fabricPlan.length; i++) {
    const column = fabricPlan[i];

    for (let j = 0; j < column.length; j++) {
      if (fabricPlan[i][j] === 1) {
        for (let k = 0; k < claims.length; k++) {
          const claim = claims[k];

          if (claim.top === j && claim.left === i) {
            if (isIntact(fabricPlan, claim)) return claim;
          }
        }
      }
    }
  }
}

function countOverlap(claims) {
  const fabricPlan = fillMatrix(claims);

  let overlap = 0;
  for (let i = 0; i < fabricPlan.length; i++) {
    const column = fabricPlan[i];

    for (let j = 0; j < column.length; j++) {
      if (fabricPlan[i][j] > 1) {
        overlap++;
      }
    }
  }
  return overlap;
}

function parseClaim(claim) {
  const fragments = claim.split(' ');
  const id = fragments[0].replace('#', '');
  const [ left, top ] = fragments[2].replace(':', '').split(',');
  const [ width, height ] = fragments[3].split('x');
  return {
    id,
    top: parseFloat(top),
    left: parseFloat(left),
    width: parseFloat(width),
    height: parseFloat(height),
  };
}

function formatInput(input) {
  return input
    .filter(input => input)
    .map(parseClaim);
}

function main() {
  if(process.argv.length < 3) {
    process.stdout.write('Please provide the part of code you would like to run\n');
    process.stdout.write('USE: node 2018/aoc3.js [PART]\n');
    process.exit(0);
  }

  const input = formatInput(INPUT_DATA);
  switch (process.argv[2]) {
    case '1':
      console.log(countOverlap(input));
      break;
    case '2':
      console.log(countNotOverlapped(input));
      break;
    default:
      console.log('Part number not recognized\n');
      break;
  }
}

main();
