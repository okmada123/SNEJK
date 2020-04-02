var game_over_scena = {};
game_over_scena.clickables = [];
game_over_scena.onclick = function(point) {
    for (i in this.clickables) {
        var aktualny = this.clickables[i];    
        if (point.x >= aktualny.x && point.x <= aktualny.x + aktualny.width && point.y >= aktualny.y && point.y <= aktualny.y + aktualny.height) {
            aktualny.onclick();
        }
    }
}

function game_over_render() {
    scane = 3;
    ctx.save();
    ctx.fillStyle = "white";
    ctx.fillRect(canvas.width / 3, canvas.height / 3, canvas.width / 3, canvas.height / 3);

    game_over_scena.clickables.push(new Button ("Hrat znova", canvas.width / 3 - 50, canvas.height / 3 + 50, 100, 50));

    for (i in game_over_scena.clickables) {
        game_over_scena.clickables[i].draw_self();
    }
}