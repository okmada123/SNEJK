const POSUN = 20;
const DEFAULT_DLZKA_HADA = 20;
var FPS;
var keys = [];
var tick = 1;
var skore;
var timer;
var tazka = false; //defaultna obtiaznost

var game_scena;

//inicializacia zaciatku hry
function start_game() {
    game_scena = new Scena();
    scena = 0;
    skore = 0;
    FPS = 10;

    //musime zmenit draw_self funkciu game sceny, lebo nechceme vzdy zmazat celu obrazovku, ale iba vykreslit tlacidla
    game_scena.draw_self = function() {
        //buttons
        var i;
        for (i in this.clickables) {
            this.clickables[i].draw_self();
        }
    }

    //pridanie zvuku do game sceny
    game_scena.add_button(zvuk);

    zvuk_gitara.play();
    if (!zvuk.zapnuty) {
        zvuk_gitara.muted = true;
    }

    //vytvorenie tela hada
    for (i = 0; i < DEFAULT_DLZKA_HADA; i++) {
        snake.telo.push(new Suradnice(240 + i * POSUN, 110));
    }

    //defaultne nastavenie smeru pohybu hada
    snake.dx = 0;
    snake.dy = POSUN;

    //nastavenie sance spawnovania powerupu (v %) podla obtiaznosti
    if (tazka) jedlo.powerup_sanca = 0;
    else jedlo.powerup_sanca = 10;
    //generovanie prveho jedla
    jedlo.update();
    jedlo.powerup = false; //prve jedlo nemoze byt tabletka
    
    timer = setInterval(mainloop, 1000 / FPS);
}

function mainloop() {
    zrychlovanie(); //zrychlovanie v tazkej obtiaznosti
    
    tick++;  
    zmena_smeru(); //handle key presses
    snake.move(); //posunutie hada
    zjedenie_check(); //kontrola zjedenia jedla
    powerup_timer(); //tabletka zmizne po 3sek.
    
    //potom sa vsetko vykresli
    render();
    
    game_over_check();

}

function render() {
    //vycistenie canvasu
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 49);
    
    //vykreslenie objektov
    draw_score_panel();
    draw_border();
    jedlo.draw();
    snake.draw();
    game_scena.draw_self(); //clickable buttony
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

function draw_border() {
    ctx.save();
    ctx.fillStyle = "brown";
    ctx.fillRect(0, 50, 25, canvas.height - 50);
    ctx.fillRect(canvas.width - 25, 50, 25, canvas.height - 50);
    ctx.fillRect(0, canvas.height-25, canvas.width, 25);
    ctx.fillRect(0, 50, canvas.width, 25);
    ctx.restore();
}

function zjedenie_check() {
    //ked sa zakusneme, triggerne to nad snake-om bud powerup() alebo zjedenie() - teda bud sa skrati alebo predlzi
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

function game_over_check() {
    //kontrola ci sme sa nezakusli do seba
    for (i = 1; i < snake.telo.length; i++) {
        if (snake.telo[i].x == snake.telo[0].x && snake.telo[i].y == snake.telo[0].y) {
            game_over();
            return;
        }
    }
    
    //kontrola, ci had nenarazil do steny
    if (snake.telo[0].x + 15 > canvas.width - 25 || snake.telo[0].x - 15 < 0 + 25 || snake.telo[0].y + 15 > canvas.height - 25 || snake.telo[0].y - 15 < 50 + 25) {
        game_over();
    }
}

function game_over() {
    timer = clearInterval(timer);
    snake.telo.length = 0;
    if (zvuk.zapnuty) {
        zvuk_smrt.play();
    }
    game_over_render();
}

function powerup_timer() {
    if (jedlo.powerup) {
        if ((tick - jedlo.powerup_tick) >= 3 * FPS) {
            jedlo.update();
        }
    }
}

function zrychlovanie() {
    if (tazka) {
        if (tick % (FPS * 10) == 0) { //zrychluje kazdych 10s
            FPS++;
            timer = clearInterval(timer);
            timer = setInterval(mainloop, 1000 / FPS);
            tick = 0;            
        }
    }
}