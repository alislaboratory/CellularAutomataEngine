

function setup(){
    var myCell = new Cell(0,0);
    createCanvas(400,400);

}

function draw(){
    text(10,10, myCell.activation(5,6));

}


class Cell {
    constructor(x, y){
        this.x = x;
        this.y = y;

        this.activation = (a, b) => Function("${a}+${b}");
    }
}

