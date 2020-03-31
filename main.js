var canvas;
var ctx;
const POSUN = 20;
const DEFAULT_DLZKA_HADA = 20;
const FPS = 10;
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
        snake.telo.push(new suradnice(100 + i * POSUN, 110));
    }

    //defaultne nastavenie smeru pohybu hada
    snake.dx = 0;
    snake.dy = POSUN;

    //generovanie prveho jedla
    jedlo.powerup = false;
    jedlo.x = Math.floor(Math.random() * canvas.width);
    jedlo.y = Math.floor(Math.random() * (canvas.height - 50)) + 50;
    
    setInterval(mainloop, 1000 / FPS);
}

function mainloop() {  
    tick++;  
    zmena_smeru();
    snake.move();

    //po pohybe skontrolovat, ci nezakusol do jedla
    if (zjedenie_check()) {
        if (jedlo.powerup) snake.powerup();
        else snake.zjedenie();
        jedlo_update();
        console.log(snake.telo);
    }
    
    //odrazanie od stien, toto potom aj tak nikde nebude
    if (snake.telo[0].x >= canvas.width - POSUN || snake.telo[0].x <= 0 + POSUN) {
        snake.dx *= -1;
    }
    else if (snake.telo[0].y >= canvas.height - POSUN || snake.telo[0].y <= 50 + POSUN) {
        snake.dy *= -1;
    }
    
    if (!(tick % FPS)) {
        skore++;
    }
    
    render();
}

function render() {
    //vycistenie canvasu
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 49);
    
    //vykreslenie objektov
    jedlo.draw();
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

function zjedenie_check() {
    //porovnavame podla toho akym ideme smerom
    if (snake.dy == 0) {
        //ak ideme doprava
        if (snake.dx > 0) {
            if (snake.telo[0].x < jedlo.x) {
                if (snake.telo[0].x + 15 >= (jedlo.x - 25) && (snake.telo[0].y >= jedlo.y - 25 && snake.telo[0].y <= jedlo.y + 25)) {
                    console.log("HIT! VYCHOD");
                    console.log("Hlava hada: " + snake.telo[0].x + "," + snake.telo[0].y);
                    console.log("Jedlo: " + jedlo.x + "," + jedlo.y);
                    console.log("---------------------------");
                    //jedlo_update();
                    return 1;
                }
            }
        }
        //ak ideme dolava
        else if (snake.dx < 0) {
            if (snake.telo[0].x > jedlo.x) {
                if ((snake.telo[0].x - 15 <= (jedlo.x + 25)) && (snake.telo[0].y >= jedlo.y - 25 && snake.telo[0].y <= jedlo.y + 25)) {
                    console.log("HIT! ZAPAD");
                    console.log("Hlava hada: " + snake.telo[0].x + "," + snake.telo[0].y);
                    console.log("Jedlo: " + jedlo.x + "," + jedlo.y);
                    console.log("---------------------------");
                    //jedlo_update();
                    return 1;
                }
            }
        }
    }
    if (snake.dx == 0) {
        //ak ideme dole
        if (snake.dy > 0) {
            if (snake.telo[0].y < jedlo.y) {
                if (snake.telo[0].y + 15 >= (jedlo.y - 25) && (snake.telo[0].x >= jedlo.x - 25 && snake.telo[0].x <= jedlo.x + 25)) {
                    console.log("HIT! JUH");
                    console.log("Hlava hada: " + snake.telo[0].x + "," + snake.telo[0].y);
                    console.log("Jedlo: " + jedlo.x + "," + jedlo.y);
                    console.log("---------------------------");
                    //jedlo_update();
                    return 1;
                }
            }
        }
        //ak ideme hore
        else if (snake.dy < 0) {
            if (snake.telo[0].y > jedlo.y) {
                if ((snake.telo[0].y - 15 <= (jedlo.y + 25)) && (snake.telo[0].x >= jedlo.x - 25 && snake.telo[0].x <= jedlo.x + 25)) {
                    console.log("HIT! SEVER");
                    console.log("Hlava hada: " + snake.telo[0].x + "," + snake.telo[0].y);
                    console.log("Jedlo: " + jedlo.x + "," + jedlo.y);
                    console.log("---------------------------");
                    //jedlo_update();
                    return 1;
                }
            }
        }
    }
}

function jedlo_update() {
    jedlo.x = Math.floor(Math.random() * canvas.width);
    jedlo.y = Math.floor(Math.random() * (canvas.height - 50)) + 50;
    if (Math.floor((Math.random() * 100)) <= 50) {
        jedlo.powerup = true;
    }
    else jedlo.powerup = false;
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
        if (!(snake.dy > 0)) {
            snake.dx = 0;
            snake.dy = -POSUN;
        }
    }
    //dole
    if (keys[40]) {
        //kontrola, ci nejdeme hore
        if (!(snake.dy < 0)) {
            snake.dx = 0;
            snake.dy = POSUN;
        }
    }
    //doprava
    if (keys[39]) {
        //kontrola, ci nejdeme dolava
        if (!(snake.dx < 0)) {
            snake.dx = POSUN;
            snake.dy = 0;
        }
    }
    if (keys[37]) {
        //kontrola, ci nejdeme doprava
        if (!(snake.dx > 0)) {
            snake.dx = -POSUN;
            snake.dy = 0;
        }
    }
    keys[37] = false;
    keys[38] = false;
    keys[39] = false;
    keys[40] = false;
}