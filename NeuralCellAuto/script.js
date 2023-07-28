
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



let gridSizeX = 64;
let gridSizeY = 64;

let tickTime = 30;

var grid = Array(gridSizeY);

var isPressed;

let screenSize = 600;

var activationFunction = `if ({0}==3 || {0}==11 || {0}==12){return 1;} else{return 0;}`;
var fieldMap = [1,1,1,1,1,1,1,1,9]; // loops clockwise starting from top left and last element is current cell


function setup(){
    createCanvas(screenSize,screenSize);
    background(0);

    for (var i = 0; i < gridSizeY; i++){
        grid[i] = new Array(gridSizeX);
    }

    let count = 0;
    for (var i = 0; i<gridSizeY;i++){
        for (var j=0;j<gridSizeX;j++){
            grid[i][j] = new Cell(j, i);
            grid[i][j].value = 0;
        }
    }

    startMillis = millis();
    
    

}

function draw(){
    background(0);

    if (isPressed){
        if (grid[getHoveredCellX()][getHoveredCellY()]){ // D R Y
            grid[getHoveredCellX()][getHoveredCellY()].value = 1;
        }
        else {
            grid[getHoveredCellX()][getHoveredCellY()].value = 0;
        }
    }

    let elapsedMillis = millis() - startMillis;
    if (keyIsPressed && elapsedMillis > tickTime) {
        grid = getNextGrid();
        startMillis = millis(); // Reset the timer
    }

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

    for (var i = 0; i<gridSizeY; i++){
        for (var j = 0; j<gridSizeX; j++){
            fill(255*currGrid[i][j].value)
            rect(i*widthBetween, j*lengthBetween, widthBetween - 5, lengthBetween - 5);
            
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

    for (var i =1; i<gridSizeY-1;i++){
        for (var j =1; j<gridSizeX-1; j++){
            var currNeighbors = checkNeighbors(grid, i, j);
            console.log(currNeighbors);
            let newVal = 0;
            for (let l=0; l<currNeighbors.length; l++){
                newVal = newVal + (currNeighbors[l]*fieldMap[l]);
            }
            console.log(newVal);
            let F=new Function(activationFunction.format(newVal));
            console.log(activationFunction.format(newVal));

            oldGrid[i][j].value = F();
            console.log(F(), oldGrid[i][j].value);
        }

    }
    return oldGrid;

}

function getHoveredCellX(){
    let widthBetween = screenSize/gridSizeX;
    return floor(mouseX / widthBetween);
}

function getHoveredCellY(){
    let lengthBetween = screenSize/gridSizeY;
    return floor(mouseY / lengthBetween);
}

class Cell{
    constructor(x,y){
        this.x = x;
        this.y = y;

        this.value = 0;
    }
}



function checkNeighbors(currentGrid, x, y){

    let neighbors;
    if ((x>=1 && x<=currentGrid.length-1) && (y>=1 && y <= currentGrid[0].length-1)){

        neighbors = [ currentGrid[x - 1][y - 1].value, currentGrid[x][y - 1].value, currentGrid[x + 1][y - 1].value, currentGrid[x + 1][y].value, currentGrid[x + 1][y + 1].value, currentGrid[x][y + 1].value, currentGrid[x - 1][y + 1].value, currentGrid[x - 1][y].value, currentGrid[x][y].value ];
        // wraps around starting from top right going clockwise
    }

    return neighbors;

}



// TODO - some of the translations between x,y and i,j may not be consistent. make sure to ensure that these are correct if encountering any bugs.

// Rewriting the code architecture. Previously, I had thought that the activation function allowed the user to access each neighbor.
// Instead, they get an x, which is the sum of all weighted neighbors as per the field map.
// Of course, the latter would be the case since a field map where the user can access each neighbor anyway is completely useless.
// I think that I'll just reprogram the entire thing. Additionally, field maps are global, so they do not need to be in the Cell class.
// the cell will not be in the check neighbors but rather used and abused when the 
