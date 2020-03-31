var jedlo = {};
//jedlo.typ = [jablko, tabletka]
jedlo.powerup = Boolean;
jedlo.draw = function() {
    if (this.powerup) {
        //ctx.drawImage(this.typ[1], this.x - 25, this.y - 25);
        ctx.drawImage(tabletka, this.x - 25, this.y - 25);
    }
    else {
        //ctx.drawImage(this.typ[0], this.x - 25, this.y - 25);
        ctx.drawImage(jablko, this.x - 25, this.y - 25);
    }
}
jedlo.update = function() {
    this.x = Math.floor(Math.random() * canvas.width);
    this.y = Math.floor(Math.random() * (canvas.height - 50)) + 50;
    if (Math.floor((Math.random() * 100)) <= SANCA_NA_POWERUP) {
        this.powerup = true;
    }
    else this.powerup = false;
}