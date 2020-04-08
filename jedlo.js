var jedlo = {};
jedlo.powerup = Boolean;
jedlo.draw = function() {
    if (this.powerup) {
        //ctx.drawImage(this.typ[1], this.x - 25, this.y - 25);
        ctx.drawImage(tabletka, this.x - 25, this.y - 25);
    }
    else {
        ctx.drawImage(jablko, this.x - 25, this.y - 25);
    }
}
jedlo.update = function() {
    this.x = Math.floor(Math.random() * (canvas.width - 100)) + 50;
    this.y = Math.floor(Math.random() * (canvas.height - 150)) + 100;
    if (Math.floor((Math.random() * 100)) <= SANCA_NA_POWERUP) {
        this.powerup = true;
    }
    else this.powerup = false;
}