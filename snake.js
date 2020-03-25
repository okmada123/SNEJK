var snake = {}
snake.telo = [];
snake.draw = function() {
    for (i = 1; i < this.telo.length-1; i++) {
        // ctx.beginPath();
        // ctx.arc(this.telo[i].x, this.telo[i].y, 20, 0, 360);
        // ctx.closePath();
        // ctx.fill();
        //ctx.stroke();
        ctx.drawImage(body, this.telo[i].x-15, this.telo[i].y-15);
    }
    //vykreslenie hlavy
    //ak ideme smerom dolava
    if (posun_x < 0 && posun_y == 0) {
        ctx.save();
        ctx.translate(this.telo[0].x, this.telo[0].y);
        ctx.rotate(Math.PI / 2);  
        ctx.drawImage(head, -15, -15);
        ctx.restore();
    }
    //ak ideme smerom doprava
    else if (posun_x > 0 && posun_y == 0) {
        ctx.save();
        ctx.translate(this.telo[0].x, this.telo[0].y);
        ctx.rotate(3 * Math.PI / 2);  
        ctx.drawImage(head, -15, -15);
        ctx.restore();
    }
    //ak ideme dole
    else if (posun_x == 0 && posun_y > 0) {        
        ctx.drawImage(head, this.telo[0].x - 15, this.telo[0].y - 15);        
    }
    //ak ideme hore
    else if (posun_x == 0 && posun_y < 0) {
        ctx.save();
        ctx.translate(this.telo[0].x, this.telo[0].y);
        ctx.rotate(Math.PI);  
        ctx.drawImage(head, -15, -15);
        ctx.restore();
    }
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