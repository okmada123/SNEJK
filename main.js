var canvas;
var ctx;

window.onload = function() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    
    menu();
    //start_game();
}

//key presses handler
window.onkeydown = function(event) {
    if (!keys[event.keyCode]) {
        keys[event.keyCode] = true;
        //console.log(event.keyCode);
    }
}

