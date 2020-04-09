var canvas;
var ctx;
var scena;  // 0 = game,  1 = menu,  2 = instructions,  3 = gameover_scena, 4 = high_scores
var zvuk;


window.onload = function() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    zvuk = new Zvuk ("Zvuk", canvas.width - 100, 10, zvuk_on.width, zvuk_on.height);
    
    //nacitanie zvukov
    load_sounds();
    
    menu();
}

//key presses handler
window.onkeydown = function(event) {
    if (scena == 0) {
        event.preventDefault();
        if (!keys[event.keyCode]) {
            keys[event.keyCode] = true;
            //console.log(event.keyCode);
        }
    }
    // else if (scena = 1) {
    //     menu_scena.onkeydown(event.keyCode);
    // }
    else if (scena == 3) {
        game_over_scena.onkeydown(event.keyCode);
    }
}

//mouse click handler
window.onclick = function(event) {
    var x = event.pageX - canvas.offsetLeft;
    var y = event.pageY - canvas.offsetTop;
    var point = new Suradnice(x, y);
    
    switch(scena) {
        case 0:
            game_scena.onclick(point);
            break;
        case 1:
            menu_scena.onclick(point);
            break;
        case 2:
            instructions_scena.onclick(point);
            break;
        case 3:
            game_over_scena.onclick(point);
            break;
        case 4:
            high_scores_scena.onclick(point);
    }
}

class Suradnice {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Button {
    constructor(text, x, y, width, height) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height; 
    }
    draw_self = function() {
        ctx.save();
        ctx.fillStyle = "gray";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.font = "30px Calibri";
        ctx.fillText(this.text, this.x + this.width / 2, this.y + (this.height + 15) / 2);
        ctx.restore();
    }
    onclick = function() {
        alert(this.text);
    }
}

class Zvuk extends Button {
    constructor(text, x, y, width, height) {
        super(text, x, y, width, height);
        this.zapnuty = true;
    }
    draw_self = function() {
        ctx.save();
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.restore();
        var obrazok;
        if (!this.zapnuty) obrazok = zvuk_off;
        else obrazok = zvuk_on;
        ctx.drawImage(obrazok, this.x, this.y);
    }
    onclick = function() {
        this.zapnuty = !this.zapnuty;
        zvuk_gitara.muted = !zvuk_gitara.muted;
        this.draw_self();
    }
}