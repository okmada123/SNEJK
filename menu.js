var menu_scena;

//Inicializuje a vykresli menu
function menu() {    
    menu_scena = new Scena();
    scena = 1;

    //buttons
    //spustit hru
    var button_spustit_hru = new Button ("Spustit hru", canvas.width / 2 - 100, 250, 200, 50);
    button_spustit_hru.onclick = function() {   
        menu_scena.clickables.length = 0;
        start_game();
    }
    menu_scena.add_button(button_spustit_hru);

    //instrukcie
    var button_instrukcie = new Button ("Instrukcie", canvas.width / 2 - 100, 350, 200, 50);
    button_instrukcie.onclick = function() {
        menu_scena.clickables.length = 0;
        instructions();
    }
    menu_scena.add_button(button_instrukcie);

    //high scores
    var button_high_scores = new Button ("Najvyssie skore", canvas.width / 2 - 100, 450, 200, 50);
    button_high_scores.onclick = function() {
        menu_scena.clickables.length = 0;
        high_scores();
    }
    menu_scena.add_button(button_high_scores);
    
    //pridanie zvuku do sceny
    menu_scena.add_button(zvuk);

    //vykreslenie samotnej sceny
    menu_scena.draw_self();
    //logo
    ctx.drawImage(logo, canvas.width / 2 - logo.width / 2, 50);    
}