class Button {
    constructor(text, x, y, width, height) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height; 
    }
    draw_self = function() {
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    action = function() {
        alert("Tento button este nema priradenu ziadnu funkciu.");
    }
}

//Inicializuje a vykresli menu
function menu() {
    var buttons = [];
    buttons.push(new Button ("Spustit hru", 50, 50, 100, 50));
    buttons.push(new Button ("Instrukcie", 50, 150, 100, 50));
    buttons.push(new Button ("Najvyssie skore", 50, 250, 100, 50));
    for (i in buttons) {
        buttons[i].draw_self();
    }
}