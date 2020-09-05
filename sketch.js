
//define binary values for live and dead cells
var live = 1;
var dead = 0;

//dimensions of the 2D array
var rows = 20;
var cols = 20;


//initialize the world variable to be used globally and locally
var world;

// create the 2D array serving as the grid
function makeArray(rows, cols) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr; //returns an empty 10 x 10 2D array
}

//populate the grid with random live and dead cells
function setup() {
  createCanvas(400, 400);
  world = makeArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      world[i][j] = floor(random(2));
    }
  }
}

function draw() {

  //render grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (world[i][j] == 1) {
        fill(0)
        stroke(100)
        rect(width/rows*i, height/cols*j, width/rows, height/cols)
      }
    }
  }

//rendering new grid every generation and implement rules
let nextgen = makeArray(rows, cols)

for (let i = 0; i < cols; i++) {
  for (let j = 0; j < rows; j++) {
    let current = world[i][j]
    let total = 0
    let neighbors = countNeighbors(world, i, j)

//the rules
    if (current == 0 && neighbors == 3) {
      nextgen[i][j] == 1;
    } else if (current == 1 && (neighbors < 2 || neighbors > 3)) {
      nextgen[i][j] = 0;
    } else {
      nextgen[i][j] = current;
    }
  }
}

  world = nextgen

}

function countNeighbors(world, x, y) {
  let total = 0
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
