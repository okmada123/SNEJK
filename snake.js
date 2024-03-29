var snake = {};
snake.telo = [];
snake.draw = function() {
    //vykreslenie tela
    for (i = 1; i < this.telo.length; i++) {
        ctx.drawImage(body, this.telo[i].x-15, this.telo[i].y-15);
    }

    //vykreslenie hlavy
    //ak ideme smerom dolava
    if (this.dx < 0 && this.dy == 0) {
        ctx.save();
        ctx.translate(this.telo[0].x, this.telo[0].y);
        ctx.rotate(Math.PI / 2);  
        ctx.drawImage(head, -15, -15);
        ctx.restore();
    }
    //ak ideme smerom doprava
    else if (this.dx > 0 && this.dy == 0) {
        ctx.save();
        ctx.translate(this.telo[0].x, this.telo[0].y);
        ctx.rotate(3 * Math.PI / 2);  
        ctx.drawImage(head, -15, -15);
        ctx.restore();
    }
    //ak ideme dole
    else if (this.dx == 0 && this.dy > 0) {        
        ctx.drawImage(head, this.telo[0].x - 15, this.telo[0].y - 15);        
    }
    //ak ideme hore
    else if (this.dx == 0 && this.dy < 0) {
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
    this.telo[0].x += this.dx;
    this.telo[0].y += this.dy;
}
snake.zjedenie = function() {
    this.telo.push(new Suradnice(this.telo[this.telo.length - 1].x, this.telo[this.telo.length - 1].y));
    skore += 10;
    if (zvuk.zapnuty) {
        zvuk_zjedenie.play();
    }
}
snake.powerup = function() {    
    for (i = 0; i < 5 && this.telo.length > 3; i++) {
        this.telo.pop();
    }
    skore += 50;
    if (zvuk.zapnuty) {
        zvuk_powerup.play();
    }
}