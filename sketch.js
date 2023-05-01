

var numRows = 10;
var numColumns = 10;

var grid = new Array(numRows);

function setup(){

    createCanvas(600, 600);


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
    
    
    // Implement the rules of game of life

}

// make it object oriented later