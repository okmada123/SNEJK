class Button {
    constructor(text, x, y, width, height) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height; 
    }
    draw_self = function() {
        ctx.fillStyle = "gray";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.font = "30px Calibri";
        ctx.fillText(this.text, this.x + this.width / 2, this.y + (this.height + 15) / 2);
    }
    onclick = function() {
        alert(this.text);
    }
}

var menu_scena = {}
menu_scena.clickables = [];
menu_scena.onclick = function(point) {
    for (i in menu_scena.clickables) {
        var aktualny = menu_scena.clickables[i];    
        if (point.x >= aktualny.x && point.x <= aktualny.x + aktualny.width && point.y >= aktualny.y && point.y <= aktualny.y + aktualny.height) {
            aktualny.onclick();
        }
    }
}

//Inicializuje a vykresli menu
function menu() {
    ctx.save();
    ctx.fillStyle = "yellow";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    //buttons
    menu_scena.clickables.push(new Button ("Spustit hru", canvas.width / 2 - 100, 250, 200, 50));
    menu_scena.clickables.push(new Button ("Instrukcie", canvas.width / 2 - 100, 350, 200, 50));
    menu_scena.clickables.push(new Button ("Najvyssie skore", canvas.width / 2 - 100, 450, 200, 50));

    //zvuk button
    var zvuk = new Button ("Zvuk", canvas.width - 100, 10, zvuk_on.width, zvuk_on.height);
    zvuk.zapnuty = true;
    zvuk.draw_self = function() {
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        var obrazok;
        if (this.zapnuty) obrazok = zvuk_off;
        else obrazok = zvuk_on;
        ctx.drawImage(obrazok, this.x, this.y);
    }
    zvuk.onclick = function() {
        this.zapnuty = !this.zapnuty;
        this.draw_self();
    }
    menu_scena.clickables.push(zvuk);

    for (i in menu_scena.clickables) {
        menu_scena.clickables[i].draw_self();
    }
    ctx.drawImage(logo, canvas.width / 2 - logo.width / 2, 50);
}