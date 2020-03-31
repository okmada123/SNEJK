var canvas;
var ctx;
var scene;

class Suradnice {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

window.onload = function() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    
    menu();
    //scene = 0;
    //start_game();
}

//key presses handler
window.onkeydown = function(event) {
    if (!keys[event.keyCode]) {
        keys[event.keyCode] = true;
        //console.log(event.keyCode);
    }
}

window.onclick = function(event) {
    var x = event.pageX - canvas.offsetLeft;
    var y = event.pageY - canvas.offsetTop;
    var point = new Suradnice(x, y);
    //switch case na scenu...
    menu_scena.onclick(point);
}