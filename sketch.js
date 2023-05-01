

var numRows = 10;
var numColumns = 10;

var grid = new Array(numRows);

function setup(){

    createCanvas(600, 600);
    background(255);

    // Create the 2D array
    for (var i = 0; i < numRows; i++){
        grid[i] = new Array(numColumns);
    }

    for (var i = 0; i<numRows;i++){
        for (var j=0;j<numColumns;j++){
            grid[i][j] = false;
        }
    }
}

function draw(){

    
    // Draw the grid lines
    drawGrid();
    
    // Implement the rules of game of life

}

// make it object oriented later

function drawGrid(){
    stroke(0);
    strokeweight(5);

    var widthBetween = 600/numRows;
    let a = 0;

    for (var i = 0; i<numRows; i++){
        line(0, a, 600, a)

        a += widthBetween;
    }

}

function drawCell(state, posX, posY){}