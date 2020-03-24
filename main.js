var canvas;
var ctx;
const POLOMER = 15;
var posun_x = 0;
var posun_y = 2*POLOMER;

window.onload = function() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    
    //innicializacia tela hada
    for (i = 0; i < 5; i++) {
        snake.telo.push(new suradnice(100 + i * 2*POLOMER, 100));
    }

    //this.requestAnimationFrame(step);
    setInterval(step, 1000 /2);
}

function step() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.draw();
    snake.move();
    
    for (i in snake.telo) {
        console.log(snake.telo[i].x + ' ' + snake.telo[i].y);
    }
}