

// create the 2D array serving as the grid
function makeArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr; //returns an empty 10 x 10 2D array
}

//dimensions of the 2D array
var rows = 100;
var cols = 100;


//initialize the world variable to be used globally and locally
var world = makeArray(cols, rows);

//populate the grid with random live and dead cells
function setup() {
  createCanvas(500, 500);

  //click setup


  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      //world[i][j] = floor(random(2));
      world[i][j] = 0;
    }
  }

  button = createButton('Random')
  button = createButton('Run')
  button = createButton('Stop')
}

function draw() {
  background(0)

  //allow mouseclicks


  //render grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (world[i][j] == 1) {

        fill(255)
        stroke(0)
        rect(width/rows*j, height/cols*i, width/rows, height/cols)
      }
    }
  }

let nextgen = makeArray(cols, rows)

for (let i = 0; i < cols; i++) {
  for (let j = 0; j < rows; j++) {
    let current = world[i][j]
    let neighbors = countNeighbors(world, i, j);

//the rules
    if (current == 0 && neighbors == 3) {
      nextgen[i][j] = 1;
    } else if (current == 1 && (neighbors < 2 || neighbors > 3)) {
      nextgen[i][j] = 0;
    } else {
      nextgen[i][j] = current;
    }
  }
}

  world = nextgen;


}

function countNeighbors(world, x, y) {
  let total = 0;
  for (let i = -1; i<2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      total += world[col][row]
    }
  }
  total -= world[x][y];
  return total;
}
