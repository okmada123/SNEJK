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

game_over_scena.onkeydown = function(key) {
    var znak = String.fromCharCode(key);
    alert(znak);
}

function game_over_render() {
    scena = 3;
    ctx.save();
    ctx.fillStyle = "white";
    ctx.fillRect(canvas.width / 4, canvas.height / 3, canvas.width / 2, canvas.height / 3);
    ctx.restore();
    game_over_scena.clickables.push(new Button ("Hrat znova", canvas.width / 2 - 150 - 30, canvas.height / 2 + 50, 150, 50));
    game_over_scena.clickables[0].onclick = function() {
        game_over_scena.clickables.length = 0;
        start_game();
    }
    game_over_scena.clickables.push(new Button ("Menu", canvas.width - canvas.width / 2 + 30, canvas.height / 2 + 50, 150, 50));
    game_over_scena.clickables[1].onclick = function() {
        game_over_scena.clickables.length = 0;
        menu();
    }

    var textfield = new Button("asdasdas", canvas.width / 2 - 100, canvas.height / 2 - 20, 200, 50);
    game_over_scena.clickables.push(textfield);

    //render buttonov
    for (i in game_over_scena.clickables) {
        game_over_scena.clickables[i].draw_self();
    }

    ctx.save();
    ctx.font = "30px Calibri";
    ctx.textAlign = "center";
    ctx.fillText("Dosiahol si skore: " + skore, canvas.width / 2, canvas.height / 2 - 50);
    ctx.restore();
}