var snake = {}
snake.telo = [];
snake.draw = function() {
    for (i = 1; i < this.telo.length-1; i++) {
        ctx.beginPath();
        ctx.arc(this.telo[i].x, this.telo[i].y, 20, 0, 360);
        ctx.closePath();
        ctx.fill();
        //ctx.stroke();
    }
    //vykreslenie hlavy
    // ctx.fillStyle = "blue";
    // ctx.beginPath();
    // ctx.arc(this.telo[0].x, this.telo[0].y, 20, 0, 360);
    // ctx.closePath();
    // ctx.fill();
    // ctx.fillStyle = "black";
    ctx.drawImage(head, this.telo[0].x-15, this.telo[0].y-15);
}
snake.move = function() {
    //vsetky okrem hlavy sa poposuvaju v poli
    for (i = this.telo.length - 1; i > 0; i--) {
        this.telo[i].x = this.telo[i-1].x;
        this.telo[i].y = this.telo[i-1].y;
    }
    //hlava sa posunie v smere posunu
    this.telo[0].x += posun_x;
    this.telo[0].y += posun_y;
}

class suradnice {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}