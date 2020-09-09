

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

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (world[i][j] == 1) {

        fill(255)
        stroke(0)
        rect(width/rows*j, height/cols*i, width/rows, height/cols)
      }
    }
  }

  //glidergun()

  //on mouseclick, turn the clicked 0s into 1s


  noLoop()

}

var started = false;

function draw() {
  background(0)

  if (started) {

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

function mouseClicked() {
  if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) {
    console.log("Please click inside the canvas!");
  }
  else {
    world[Math.round(mouseY*(cols/height))][Math.round(mouseX*(rows/width))] = 1
  }
  
  console.log("MouseX: " + Math.round(mouseX*rows/width));
  console.log("MouseY: " + Math.round(mouseY*cols/height));
}

function start() {
  started = true;
  loop();
}

//brutally tedious; there has to be a better way....
function glidergun() {

  //initial square
  world[5][1] = 1
  world[5][2] = 1
  world[6][1] = 1
  world[6][2] = 1

  //gun
  world[5][11] = 1
  world[6][11] = 1
  world[7][11] = 1
  world[8][12] = 1
  world[9][13] = 1
  world[9][14] = 1
  world[8][16] = 1
  world[7][17] = 1
  world[6][17] = 1
  world[5][17] = 1
  world[4][16] = 1
  world[3][14] = 1
  world[3][13] = 1
  world[4][12] = 1
  world[6][18] = 1
  world[6][15] = 1

  //ammo
  world[4][21] = 1
  world[4][22] = 1

  world[4-1][21] = 1
  world[4-1][22] = 1

  world[4+1][21] = 1
  world[4+1][22] = 1

  world[2][23] = 1
  world[6][23] = 1

  world[6][25] = 1
  world[7][25] = 1

  world[2][25] = 1
  world[1][25] = 1

  //last square
  world[3][35] = 1
  world[4][35] = 1
  world[3][36] = 1
  world[4][36] = 1

}

function randomConfig() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      world[i][j] = floor(random(2));
    }
  }
}
