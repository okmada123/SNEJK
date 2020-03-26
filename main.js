var canvas;
var ctx;
const POSUN = 10;
const DEFAULT_DLZKA_HADA = 20;
const FPS = 10;
var posun_x = 0;
var posun_y = 2*POSUN;
var keys = [];
var tick = 0;
var skore = 0;

class suradnice {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}


window.onload = function() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    
    //innicializacia tela hada
    for (i = 0; i < DEFAULT_DLZKA_HADA; i++) {
        snake.telo.push(new suradnice(100 + i * 2*POSUN, 110));
    }

    //this.requestAnimationFrame(step);
    setInterval(step, 1000 / FPS);
}

function step() {  
    tick++;  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 49);
    zmena_smeru();
    snake.move();
    snake.draw();    

    //odrazanie od stien, toto potom aj tak nikde nebude
    if (snake.telo[0].x >= canvas.width - POSUN || snake.telo[0].x <= 0 + POSUN) {
        posun_x *= -1;
    }
    else if (snake.telo[0].y >= canvas.height - POSUN || snake.telo[0].y <= 50 + POSUN) {
        posun_y *= -1;
    }

    //tieto blbosti potom presunut niekde inde, nech je tato funkcia cista
    //asi potom spravit funkciu view() alebo draw(), ktora vykresli vsetko
    ctx.beginPath();
    ctx.moveTo(0, 50);
    ctx.lineTo(canvas.width, 50);
    ctx.stroke();
    ctx.closePath();

    if (!(tick % FPS)) {
        skore++;
    }

    ctx.font = "30px Arial"
    ctx.fillText("Skore: " + skore, 10, 30);
}

//key presses
window.onkeydown = function(event) {
    if (!keys[event.keyCode]) {
        keys[event.keyCode] = true;
        console.log(event.keyCode);
    }
}

function zmena_smeru() {
    //hore
    if (keys[38]) {
        //kontrola, ci nejdeme dole
        if (!(posun_y > 0)) {
            posun_x = 0;
            posun_y = -2*POSUN;
        }
    }
    //dole
    if (keys[40]) {
        //kontrola, ci nejdeme hore
        if (!(posun_y < 0)) {
            posun_x = 0;
            posun_y = 2*POSUN;
        }
    }
    //doprava
    if (keys[39]) {
        //kontrola, ci nejdeme dolava
        if (!(posun_x < 0)) {
            posun_x = 2*POSUN;
            posun_y = 0;
        }
    }
    if (keys[37]) {
        //kontrola, ci nejdeme doprava
        if (!(posun_x > 0)) {
            posun_x = -2*POSUN;
            posun_y = 0;
        }
    }
    keys[37] = false;
    keys[38] = false;
    keys[39] = false;
    keys[40] = false;
}