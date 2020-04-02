var canvas;
var ctx;
var scena;  // 0 = game,  1 = menu,  2 = instructions


window.onload = function() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    
    menu();
}

//key presses handler
window.onkeydown = function(event) {
    if (!keys[event.keyCode]) {
        keys[event.keyCode] = true;
        //console.log(event.keyCode);
    }
}

//mouse click handler
window.onclick = function(event) {
    var x = event.pageX - canvas.offsetLeft;
    var y = event.pageY - canvas.offsetTop;
    var point = new Suradnice(x, y);
    //switch case na scenu...
    if (scena == 1) menu_scena.onclick(point);
    else console.log(point);
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