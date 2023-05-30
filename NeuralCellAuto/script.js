
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
    
    drawGrid();

    getNextGrid();
    

}

function drawGrid(){
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


class Cell {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.activation = "return {0} + {1} + {2} + {3} + {4} + {5} + {6} + {7}";

        this.fieldValues = [1, 1, 1, 1, 1, 1, 1, 1]; // field map values.
        this.neighbors = []; // TODO get this algorithm
        this.field = []; // actual field of weighted values
        let i;
        for (i=0; i<8; i++) {
            this.field.push(this.fieldValues[i]); // change this to multiply the field values by the neighbours.
        }
        
        // this.activation = () => Function(`return ${a}+${b}`)();
    }

    // getValue(){ return Function(this.activation.format(this.field[0], this.field[1], this.field[2], this.field[3], this.field[4], this.field[5], this.field[6], this.field[7], this.field[8]))()}
    getValue(){ return Function(this.activation.format(this.field[0], this.field[1], this.field[2], this.field[3], this.field[4], this.field[5], this.field[6], this.field[7]))();}
}


function checkNeighbors(grid, x, y){

    if ((x>=1 && x<=currentGrid.length-1) && (y>=1 && y <= currentGrid[0].length-1)){

        let neighbors = [ currentGrid[x - 1][y - 1].getValue(), currentGrid[x][y - 1].getValue(), currentGrid[x + 1][y - 1].getValue(), currentGrid[x + 1][y].getValue(), currentGrid[x + 1][y + 1].getValue(), currentGrid[x][y + 1].getValue(), currentGrid[x - 1][y + 1].getValue(), currentGrid[x - 1][y].getValue() ];

    }

}
