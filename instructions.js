var instructions_scena = {}
instructions_scena.clickables = [];
instructions_scena.onclick = function(point) {
    for (i in this.clickables) {
        var aktualny = this.clickables[i];    
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

    //buttons
    var spat = new Button ("Spat", 10, 10, 100, 50);
    spat.onclick = function() {
        instructions_scena.clickables.length = 0;
        menu();
    }
    instructions_scena.clickables.push(spat);

    // //zvuk
    var zvuk = new Button ("Zvuk", canvas.width - 100, 10, zvuk_on.width, zvuk_on.height);
    zvuk.zapnuty = true;
    zvuk.draw_self = function() {
        ctx.save();
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.restore();
        var obrazok;
        if (this.zapnuty) obrazok = zvuk_off;
        else obrazok = zvuk_on;
        ctx.drawImage(obrazok, this.x, this.y);
    }
    zvuk.onclick = function() {
        this.zapnuty = !this.zapnuty;
        this.draw_self();
    }
    instructions_scena.clickables.push(zvuk);

    //vykreslenie vsetkych buttonov
    for (i in instructions_scena.clickables) {
        instructions_scena.clickables[i].draw_self();
    }

    ctx.save();
    ctx.drawImage(logo, canvas.width / 2 - logo.width / 2, 50);
    ctx.drawImage(sipky, canvas.width / 2 - sipky.width / 2, 400);
    ctx.drawImage(jablko, canvas.width / 5 - jablko.width, 300);
    ctx.drawImage(tabletka, canvas.width - canvas.width / 5, 300);
    ctx.font = "25px Calibri";
    ctx.textAlign = "center";
    ctx.fillText("Jablko +1 dlzka, +10 skore", canvas.width / 5, 250);
    ctx.fillText("Powerup -5 dlzka, +50 skore", canvas.width - canvas.width / 5, 250);
    ctx.fillText("Pohyb - sipky", canvas.width / 2, 630);
    ctx.restore();
}