var snake = {}
snake.telo = [];
snake.draw = function() {
    for (i in this.telo) {
        ctx.beginPath();
        ctx.arc(this.telo[i].x, this.telo[i].y, 15, 0, 360);
        ctx.closePath();
        //ctx.fill();
        ctx.stroke();
    }
}
snake.move = function() {
    //vsetky okrem hlavy sa poposuvaju v poli
    for (i = this.telo.length - 1; i > 0; i--) {
        this.telo[i].x = this.telo[i-1].x;
        this.telo[i].y = this.telo[i-1].y;
    }
    this.telo[0].x += posun_x;
    this.telo[0].y += posun_y;
}

class suradnice {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}