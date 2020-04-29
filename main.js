var canvas;
var ctx;
var scena;  // 0 = game,  1 = menu,  2 = instructions,  3 = gameover_scena, 4 = high_scores
var zvuk;


window.onload = function() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    zvuk = new Zvuk ("Zvuk", canvas.width - 100, 0, zvuk_on.width, zvuk_on.height);
    
    //nacitanie zvukov
    load_sounds();
    
    menu();
}

//key presses handler
window.onkeydown = function(event) {
    if (scena == 0) { //in game
        event.preventDefault();
        if (!keys[event.keyCode]) {
            keys[event.keyCode] = true;
            //console.log(event.keyCode);
        }
    }
    else if (scena == 3) { //gameover
        event.preventDefault();
        game_over_scena.onkeydown(event.keyCode);
    }
}

//mouse click handler
window.onclick = function(event) {
    var x = event.pageX - canvas.offsetLeft;
    var y = event.pageY - canvas.offsetTop;
    var point = new Suradnice(x, y);
    
    switch(scena) {
        case 0:
            game_scena.onclick(point);
            break;
        case 1:
            menu_scena.onclick(point);
            break;
        case 2:
            instructions_scena.onclick(point);
            break;
        case 3:
            game_over_scena.onclick(point);
            break;
        case 4:
            high_scores_scena.onclick(point);
    }
}