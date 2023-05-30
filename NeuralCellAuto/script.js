
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

    for (let i=1;i<oldGrid.length-1;i++){
        for (let j=1;j<oldGrid[0].length-1;j++){
            let tempCell = grid[i][j];
            let neighbors = checkNeighbors(oldGrid, i, j);
            tempCell.value = Function(tempCell.activation.format(tempCell.fieldValues[0] * neighbors[0], tempCell.fieldValues[1] * neighbors[1], tempCell.fieldValues[2] * neighbors[2], tempCell.fieldValues[3] * neighbors[3], tempCell.fieldValues[4] * neighbors[4], tempCell.fieldValues[5] * neighbors[5], tempCell.fieldValues[6] * neighbors[6], tempCell.fieldValues[7] * neighbors[7]))();

        }
    }

    return grid;


}

function getHoveredCellX(){
    let widthBetween = screenSize/gridSizeX;
    return floor(mouseX / widthBetween);
}

function getHoveredCellY(){
    let lengthBetween = screenSize/gridSizeY;
    return floor(mouseY / lengthBetween);
}


class Cell {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.activation = "return {0} + {1} + {2} + {3} + {4} + {5} + {6} + {7}";

        this.fieldValues = [1, 1, 1, 1, 1, 1, 1, 1]; // field map values.

        this.value = 0;
        
        // this.activation = () => Function(`return ${a}+${b}`)();
    }

    // getValue(){ return Function(this.activation.format(this.field[0], this.field[1], this.field[2], this.field[3], this.field[4], this.field[5], this.field[6], this.field[7], this.field[8]))()}
}


function checkNeighbors(currentGrid, x, y){

    let neighbors;
    if ((x>=1 && x<=currentGrid.length-1) && (y>=1 && y <= currentGrid[0].length-1)){

        neighbors = [ currentGrid[x - 1][y - 1].value, currentGrid[x][y - 1].value, currentGrid[x + 1][y - 1].value, currentGrid[x + 1][y].value, currentGrid[x + 1][y + 1].value, currentGrid[x][y + 1].value, currentGrid[x - 1][y + 1].value, currentGrid[x - 1][y].value ];

    }

    return neighbors;

}



// TODO - some of the translations between x,y and i,j may not be consistent. make sure to ensure that these are correct if encountering any bugs.