

var numRows = 10;
var numColumns = 10;

var widthBetween;
var lengthBetween;

var isPressed;

var grid = new Array(numRows + 5);

var screenSize = 600;

function setup(){

    createCanvas(screenSize, screenSize);
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
    drawGrid(grid);
    drawHover("hover", getHoveredCellX(), getHoveredCellY());

    if (isPressed){
        if (grid[getHoveredCellX()][getHoveredCellY()]){ // D R Y
            grid[getHoveredCellX()][getHoveredCellY()] = false;
        }
        else {
            grid[getHoveredCellX()][getHoveredCellY()] = true;
        }
    }

    if (keyIsPressed){
        grid = getNextGrid();

    }
    stroke(1);
    if ((getHoveredCellX() < numRows - 1) && (getHoveredCellY() < numColumns - 1)){
        text(checkNeighbors(grid, getHoveredCellX(), getHoveredCellY()), 10, 10);
        }

    
    isPressed = false;

    

    

}

// make it object oriented later

function drawGrid(currGrid){
    stroke(255);
    strokeWeight(5);

    widthBetween = screenSize/numRows;
    let a = 0;

    for (var i = 0; i<numRows; i++){
        line(0, a, screenSize, a)

        a += widthBetween;
    }

    lengthBetween = screenSize/numColumns;
    a = 0;

    for (var i = 0; i<numColumns;i++){
        line(a,0,a,screenSize);

        a += lengthBetween;
    }

    fill(255);
    for (var i = 0; i<numRows; i++){
        for (var j = 0; j<numColumns; j++){
            if (currGrid[i][j]){
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


function mouseClicked() {
    isPressed = true;
}

function getNextGrid(){
    // need to hard copy! shallow copies wont work... (js pointer moment)

    // please look away
    let oldGrid = JSON.parse(JSON.stringify(grid));
    // you may look back

    for (var i =1; i<numRows-1;i++){
        for (var j =1; i<numColumns-1; i++){
            var currNeighbors = checkNeighbors(grid, i, j);
            console.log("neigh", currNeighbors);

            if (currNeighbors > 3){
                oldGrid[i][j] = false;
            }

            else if (currNeighbors < 2){
                oldGrid[i][j] = false;
            }

            else if (currNeighbors == 2){
                if (oldGrid[i][j] == true){
                    oldGrid[i][j] = true;
                }
                
                else {
                    oldGrid[i][j] = false;
                }
            }

            else if (currNeighbors == 3){
                oldGrid[i][j] = true;
            }
            


        }
    }

    // console.log("grid", grid);
    // console.log("Oldgrid", oldGrid);
    // console.log(grid == oldGrid);
    return oldGrid;


    




}

function checkNeighbors(currentGrid, x, y){

    
    let neighborCount = 0;

    


    if ((x>=1 && x<=currentGrid.length-1) && (y>=1 && y <= currentGrid[0].length-1)){

        let neighbors = [ currentGrid[x - 1][y - 1], currentGrid[x][y - 1], currentGrid[x + 1][y - 1], currentGrid[x + 1][y], currentGrid[x + 1][y + 1], currentGrid[x][y + 1], currentGrid[x - 1][y + 1], currentGrid[x - 1][y] ];


        for (var i = 0; i<neighbors.length; i++){
            if (neighbors[i]){
                neighborCount ++;
            }
        }

        }
    

	return neighborCount;

}


