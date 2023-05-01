

var numRows = 10;
var numColumns = 10;

var widthBetween;
var lengthBetween;

var isPressed;

var grid = new Array(numRows + 5);

function setup(){

    createCanvas(600, 600);
    background(0);

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

    background(0);
    // Draw the grid lines
    drawGrid();

    drawHover("hover", getHoveredCellX(), getHoveredCellY());

    if (isPressed){
        if (grid[getHoveredCellX()][getHoveredCellY()]){ // D R Y
            grid[getHoveredCellX()][getHoveredCellY()] = false;
        }
        else {
            grid[getHoveredCellX()][getHoveredCellY()] = true;
        }
    }

    isPressed = false;

    

    

}

// make it object oriented later

function drawGrid(){
    stroke(255);
    strokeWeight(5);

    widthBetween = 600/numRows;
    let a = 0;

    for (var i = 0; i<numRows; i++){
        line(0, a, 600, a)

        a += widthBetween;
    }

    lengthBetween = 600/numColumns;
    a = 0;

    for (var i = 0; i<numColumns;i++){
        line(a,0,a,600);

        a += lengthBetween;
    }

    fill(255);
    for (var i = 0; i<numRows; i++){
        for (var j = 0; j<numColumns; j++){
            if (grid[i][j]){
            rect(i*widthBetween, j*lengthBetween, widthBetween - 5, lengthBetween - 5);
            }
        }

    }



    

}

function drawHover(state, posX, posY){

    fill(0);


    if (state == "hover"){
        fill(255,255,255,127);
    }


    rect(posX*widthBetween, posY*lengthBetween, widthBetween - 5, lengthBetween - 5);

    
}

function getHoveredCellX(){
    return floor(mouseX / widthBetween);
}

function getHoveredCellY(){
    return floor(mouseY / lengthBetween);
}


function doubleClicked() {
    isPressed = true;
}