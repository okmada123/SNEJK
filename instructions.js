var instructions_scena = {}
instructions_scena.clickables = [];
instructions_scena.onclick = function(point) {
    for (i in this.clickables) {
        var aktualny = menu_scena.clickables[i];    
        if (point.x >= aktualny.x && point.x <= aktualny.x + aktualny.width && point.y >= aktualny.y && point.y <= aktualny.y + aktualny.height) {
            aktualny.onclick();
        }
    }
}

function instructions() {
    scena = 2;
    ctx.save();
    ctx.fillStyle = "yellow";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
}