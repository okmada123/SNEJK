var menu_scena;

//Inicializuje a vykresli menu
function menu() {    
    menu_scena = new Scena("yellow");
    scena = 1;

    //buttons
    //spustit hru
    menu_scena.clickables.push(new Button ("Spustit hru", canvas.width / 2 - 100, 250, 200, 50));
    menu_scena.clickables[0].onclick = function() {   
        menu_scena.clickables.length = 0;
        start_game();
    }

    //instrukcie
    menu_scena.clickables.push(new Button ("Instrukcie", canvas.width / 2 - 100, 350, 200, 50));
    menu_scena.clickables[1].onclick = function() {
        menu_scena.clickables.length = 0;
        instructions();
    }

    menu_scena.clickables.push(new Button ("Najvyssie skore", canvas.width / 2 - 100, 450, 200, 50));
    menu_scena.clickables[2].onclick = function() {
        menu_scena.clickables.length = 0;
        high_scores();
    }
    
    //pridanie zvuku do sceny
    menu_scena.clickables.push(zvuk);

    menu_scena.draw_self();    
}