var canvas;
var ctx;
const POSUN = 15;
var posun_x = 2*POSUN;
var posun_y = 0;

window.onload = function() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    
    //innicializacia tela hada
    for (i = 0; i < 50 - 3* POSUN; i++) {
        snake.telo.push(new suradnice(100 + i * 2*POSUN, 100));
    }

    //this.requestAnimationFrame(step);
    setInterval(step, 1000 / 5);
}

function step() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.draw();
    snake.move();

    if (snake.telo[0].x >= canvas.width - POSUN || snake.telo[0].x <= 0 + POSUN) {
        posun_x *= -1;
    }
    else if (snake.telo[0].y >= canvas.height - POSUN || snake.telo[0].y <= 50 + POSUN) {
        posun_y *= -1;
    }

    ctx.beginPath();
    ctx.moveTo(0, 50);
    ctx.lineTo(canvas.width, 50);
    ctx.stroke();
    ctx.closePath();
}