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
var powerup = 0;

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

    //umiestnenie jedla na nahodne suradnice.
    jedlo.x = Math.floor(Math.random() * canvas.width);
    jedlo.y = Math.floor(Math.random() * (canvas.height - 50)) + 50;
    
    setInterval(step, 1000 / FPS);
}

function step() {  
    tick++;  
    zmena_smeru();
    snake.move();
    
    //odrazanie od stien, toto potom aj tak nikde nebude
    if (snake.telo[0].x >= canvas.width - POSUN || snake.telo[0].x <= 0 + POSUN) {
        posun_x *= -1;
    }
    else if (snake.telo[0].y >= canvas.height - POSUN || snake.telo[0].y <= 50 + POSUN) {
        posun_y *= -1;
    }
    
    //toto tu potom nebude v takej podobe. nove jedlo sa bude generovat po zjedeni predosleho
    if (!(tick % FPS)) {
        skore++;
        if (!(tick % (5*FPS))) {
            jedlo.x = Math.floor(Math.random() * canvas.width);
            jedlo.y = Math.floor(Math.random() * (canvas.height - 50)) + 50;
            if (Math.floor((Math.random() * 100)) <= 25) {
                powerup = 1;
            }
            else powerup = 0;
            snake.zjedenie();
        }
    }
    
    render();
}

function render() {
    //vycistenie canvasu
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 49);
    
    //vykreslenie objektov
    jedlo.draw(powerup);
    snake.draw(); 
    draw_score_panel();
}

function draw_score_panel() {
    ctx.beginPath();
    ctx.moveTo(0, 50);
    ctx.lineTo(canvas.width, 50);
    ctx.stroke();
    ctx.closePath();
    ctx.font = "30px Arial"
    ctx.fillText("Skore: " + skore, 10, 30);
}

//key presses
window.onkeydown = function(event) {
    if (!keys[event.keyCode]) {
        keys[event.keyCode] = true;
        //console.log(event.keyCode);
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