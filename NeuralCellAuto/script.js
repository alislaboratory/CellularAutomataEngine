
// for string formatting
String.prototype.format = function() {
    let formatted = this;
    for (let i = 0; i < arguments.length; i++) {
      let regexp = new RegExp('\\{'+i+'\\}', 'gi');
      formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
  };
//



let gridSizeX = 10;
let gridSizeY = 10;

var grid = Array(gridSizeY);

var isPressed;

let screenSize = 600;

let activationFunction = "function activation(x){return x;}";
let fieldMap = [1,1,1,1,1,1,1,1,1]
function setup(){
    createCanvas(screenSize,screenSize);
    background(0);

    for (var i = 0; i < gridSizeY; i++){
        grid[i] = new Array(gridSizeX);
    }

    for (var i = 0; i<gridSizeY;i++){
        for (var j=0;j<gridSizeX;j++){
            grid[i][j] = new Cell(j, i);
        }
    }
    
    

}

function draw(){
    background(0);

    if (isPressed){
        if (grid[getHoveredCellX()][getHoveredCellY()]){ // D R Y
            grid[getHoveredCellX()][getHoveredCellY()] = false;
        }
        else {
            grid[getHoveredCellX()][getHoveredCellY()] = true;
        }
    }

    grid = getNextGrid();

    drawGrid(grid);

    
    
    isPressed = false;
}

function drawGrid(currGrid){
    stroke(255);
    strokeWeight(1);

    let widthBetween = screenSize/gridSizeX;
    let a = 0;

    for (var i = 0; i<gridSizeX; i++){
        line(0, a, screenSize, a)

        a += widthBetween;
    }

    let lengthBetween = screenSize/gridSizeY;
    a = 0;

    for (var i = 0; i<gridSizeY;i++){
        line(a,0,a,screenSize);

        a += lengthBetween;
    }

    fill(255);
    for (var i = 0; i<gridSizeY; i++){
        for (var j = 0; j<gridSizeX; j++){
            if (currGrid[i][j]){
            rect(i*widthBetween, j*lengthBetween, widthBetween - 5, lengthBetween - 5);
            }
        }

    }
}

function mouseClicked(){
    isPressed = true;
}

function getNextGrid(){
    // JS deep copy chronicles - ep2: the array of objects.
    // well a shallow copy will work less than before, as the elements are literal class instances.
    // so we can't use the other method as custom objects are not JSON serialisable.
    // so lets just pull a python and import smart

    // look away please
    let oldGrid = structuredClone(grid);
    // you may look back.

}

function getHoveredCellX(){
    let widthBetween = screenSize/gridSizeX;
    return floor(mouseX / widthBetween);
}

function getHoveredCellY(){
    let lengthBetween = screenSize/gridSizeY;
    return floor(mouseY / lengthBetween);
}




function checkNeighbors(currentGrid, x, y){

    let neighbors;
    if ((x>=1 && x<=currentGrid.length-1) && (y>=1 && y <= currentGrid[0].length-1)){

        neighbors = [ currentGrid[x - 1][y - 1].value, currentGrid[x][y - 1].value, currentGrid[x + 1][y - 1].value, currentGrid[x + 1][y].value, currentGrid[x + 1][y + 1].value, currentGrid[x][y + 1].value, currentGrid[x - 1][y + 1].value, currentGrid[x - 1][y].value ];
        // wraps around starting from top right going clockwise
    }

    return neighbors;

}



// TODO - some of the translations between x,y and i,j may not be consistent. make sure to ensure that these are correct if encountering any bugs.

// Rewriting the code architecture. Previously, I had thought that the activation function allowed the user to access each neighbor.
// Instead, they get an x, which is the sum of all weighted neighbors as per the field map.
// Of course, the latter would be the case since a field map where the user can access each neighbor anyway is completely useless.
// I think that I'll just reprogram the entire thing. Additionally, field maps are global, so they do not need to be in the Cell class.
// There will also be 9 in the neighbors including the Cell itself.