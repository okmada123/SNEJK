var menu_scena = {}
menu_scena.clickables = [];
menu_scena.onclick = function(point) {
    for (i in this.clickables) {
        var aktualny = this.clickables[i];    
        if (point.x >= aktualny.x && point.x <= aktualny.x + aktualny.width && point.y >= aktualny.y && point.y <= aktualny.y + aktualny.height) {
            aktualny.onclick();
        }
    }
}

//Inicializuje a vykresli menu
function menu() {    
    scena = 1;
    ctx.save();
    ctx.fillStyle = "yellow";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    //buttons
    //spustit hru
    menu_scena.clickables.push(new Button ("Spustit hru", canvas.width / 2 - 100, 250, 200, 50));
    menu_scena.clickables[0].onclick = function() {
        // var pocet_buttonov = menu_scena.clickables.length;
        // for (i = 0; i < pocet_buttonov; i++)        
        menu_scena.clickables.length = 0;
        start_game();
    }

    //instrukcie
    menu_scena.clickables.push(new Button ("Instrukcie", canvas.width / 2 - 100, 350, 200, 50));
    menu_scena.clickables[1].onclick = function() {
        menu_scena.clickables.length = 0;
        instructions();
    }

    menu_scena.clickables.push(new Button ("Najvyssie skore", canvas.width / 2 - 100, 450, 200, 50));
    
    //zvuk
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
    menu_scena.clickables.push(zvuk);
    
    for (i in menu_scena.clickables) {
        menu_scena.clickables[i].draw_self();
    }
    ctx.drawImage(logo, canvas.width / 2 - logo.width / 2, 50);
}