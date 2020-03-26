var jedlo = {};
jedlo.typ = [jablko, tabletka]
jedlo.draw = function(typ_jedla) {
    ctx.drawImage(this.typ[typ_jedla], this.x - 25, this.y - 25);
}