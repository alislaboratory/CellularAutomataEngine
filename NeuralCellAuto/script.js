
let myCell;
function setup(){
    myCell = new Cell(0,0);
    createCanvas(400,400);

}

function draw(){
    text(myCell.activation(5,6), 100, 100);
    

}


class Cell {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.activation = "field[0] + field[1] + field[2] + field[3] + field[4] + field[5] + field[6] + field[7] + field[8]";
        // this.activation = () => Function(`return ${a}+${b}`)();
    }
}

