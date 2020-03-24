var canvas;
var ctx;
const POSUN = 15;
var posun_x = 2*POSUN;
var posun_y = 0;

// var background = new Image();
// background.src = './graphics/trava.jpg';

window.onload = function() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    
    //innicializacia tela hada
    for (i = 0; i < 10; i++) {
        snake.telo.push(new suradnice(100 + i * 2*POSUN, 110));
    }

    //this.requestAnimationFrame(step);
    setInterval(step, 1000 / 5);
}

function step() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 50);
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