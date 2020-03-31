class Button {
    constructor(text, x, y, width, height) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height; 
    }
    draw_self = function() {
        ctx.strokeRect(this.x, this.y, this.width, this.height);
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

    menu_scena.clickables.push(new Button ("Spustit hru", canvas.width / 2 - 100, 50, 200, 50));
    menu_scena.clickables.push(new Button ("Instrukcie", canvas.width / 2 - 100, 150, 200, 50));
    menu_scena.clickables.push(new Button ("Najvyssie skore", canvas.width / 2 - 100, 250, 200, 50));
    for (i in menu_scena.clickables) {
        menu_scena.clickables[i].draw_self();
        console.log(i);
    }
}