const POSUN = 20;
const DEFAULT_DLZKA_HADA = 20;
const FPS = 10;
const SANCA_NA_POWERUP = 20;
var keys = [];
var tick = 0;
var skore = 0;
var timer;


function start_game() {
    scena = 0;
     //innicializacia tela hada
     for (i = 0; i < DEFAULT_DLZKA_HADA; i++) {
        snake.telo.push(new Suradnice(100 + i * POSUN, 110));
    }

    //defaultne nastavenie smeru pohybu hada
    snake.dx = 0;
    snake.dy = POSUN;

    //generovanie prveho jedla
    jedlo.powerup = false;
    jedlo.x = Math.floor(Math.random() * canvas.width);
    jedlo.y = Math.floor(Math.random() * (canvas.height - 50)) + 50;
    
    timer = setInterval(mainloop, 1000 / FPS);
}

function mainloop() {  
    tick++;  
    zmena_smeru();
    snake.move();
    zjedenie_check();
    
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
    //pomocna funkcia, ktora sa zavola ked sa zakusneme do jablka/powerupu
    function hit() {
        if (jedlo.powerup) snake.powerup();
        else snake.zjedenie();
        jedlo.update();
    }

    //porovnavame podla toho akym ideme smerom
    if (snake.dy == 0) {
        //ak ideme doprava
        if (snake.dx > 0) {
            if (snake.telo[0].x < jedlo.x) {
                if (snake.telo[0].x + 15 >= (jedlo.x - 25) && ((snake.telo[0].y - 15 > jedlo.y - 25 && snake.telo[0].y - 15 < jedlo.y + 25) || (snake.telo[0].y + 15 > jedlo.y - 25 && snake.telo[0].y + 15 < jedlo.y + 25))) {
                    hit();
                }
            }
        }
        //ak ideme dolava
        else if (snake.dx < 0) {
            if (snake.telo[0].x > jedlo.x) {
                if (snake.telo[0].x - 15 <= (jedlo.x + 25) && ((snake.telo[0].y - 15 > jedlo.y - 25 && snake.telo[0].y - 15 < jedlo.y + 25) || (snake.telo[0].y + 15 > jedlo.y - 25 && snake.telo[0].y + 15 < jedlo.y + 25))) {
                    hit();
                }
            }
        }
    }
    if (snake.dx == 0) {
        //ak ideme dole
        if (snake.dy > 0) {
            if (snake.telo[0].y < jedlo.y) {
                if (snake.telo[0].y + 15 >= (jedlo.y - 25) && ((snake.telo[0].x - 15 > jedlo.x - 25 && snake.telo[0].x - 15 < jedlo.x + 25) || (snake.telo[0].x + 15 > jedlo.x - 25 && snake.telo[0].x + 15 < jedlo.x + 25))) {
                    hit();
                }
            }
        }
        //ak ideme hore
        else if (snake.dy < 0) {
            if (snake.telo[0].y > jedlo.y) {
                if ((snake.telo[0].y - 15 <= (jedlo.y + 25)) && ((snake.telo[0].x - 15 > jedlo.x - 25 && snake.telo[0].x - 15 < jedlo.x + 25) || (snake.telo[0].x + 15 > jedlo.x - 25 && snake.telo[0].x + 15 < jedlo.x + 25))) {
                    hit();
                }
            }
        }
    }
}

// //key presses
// window.onkeydown = function(event) {
//     if (!keys[event.keyCode]) {
//         keys[event.keyCode] = true;
//         //console.log(event.keyCode);
//     }
// }

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