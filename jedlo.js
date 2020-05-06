var jedlo = {};
jedlo.powerup = Boolean;
jedlo.powerup_sanca;
jedlo.powerup_tick;
jedlo.draw = function() {
    if (this.powerup) {
        ctx.drawImage(tabletka, this.x - 25, this.y - 25);
    }
    else {
        ctx.drawImage(jablko, this.x - 25, this.y - 25);
    }
}
jedlo.update = function() { //generovanie jedla na novej pozicii
    this.x = Math.floor(Math.random() * (canvas.width - 100)) + 50;
    this.y = Math.floor(Math.random() * (canvas.height - 150)) + 100;
    if (Math.floor((Math.random() * 100)) < this.powerup_sanca) {
        this.powerup = true;
        this.powerup_tick = tick;
    }
    else this.powerup = false;
}