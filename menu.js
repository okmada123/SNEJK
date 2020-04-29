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
    var button_instrukcie = new Button ("Instrukcie", canvas.width / 2 - 100, 400, 200, 50);
    button_instrukcie.onclick = function() {
        menu_scena.clickables.length = 0;
        instructions();
    }
    menu_scena.add_button(button_instrukcie);

    //high scores
    var button_high_scores = new Button ("Najvyssie skore", canvas.width / 2 - 100, 500, 200, 50);
    button_high_scores.onclick = function() {
        menu_scena.clickables.length = 0;
        high_scores();
    }
    menu_scena.add_button(button_high_scores);
    
    //pridanie zvuku do sceny
    menu_scena.add_button(zvuk);

    //tlacidla na vyber obtiaznosti
    var button_easy = new Button("Lahka", canvas.width / 2 - 100, 310, 100, 30);
    button_easy.draw_self = function() {
        ctx.save();
        ctx.fillStyle = "white";
        if (!tazka) {
            ctx.fillStyle = "green";
        }
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.font = "30px Calibri";
        ctx.fillText(this.text, this.x + this.width / 2, this.y + (this.height + 15) / 2);
        ctx.restore();
    }    
    
    button_easy.onclick = function() {
        if (tazka) {
            tazka = !tazka;
            this.draw_self();
            button_hard.draw_self();
        }
    }
    menu_scena.add_button(button_easy);


    var button_hard = new Button("Tazka", canvas.width / 2, 310, 100, 30);
    button_hard.draw_self = function() {
        ctx.save();
        ctx.fillStyle = "white";
        if (tazka) {
            ctx.fillStyle = "green";
        }
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.font = "30px Calibri";
        ctx.fillText(this.text, this.x + this.width / 2, this.y + (this.height + 15) / 2);
        ctx.restore();
    }   
    
    button_hard.onclick = function() {
        if (!tazka) {
            tazka = !tazka;
            this.draw_self();
            button_easy.draw_self();
        }
    }

    menu_scena.add_button(button_hard);


    //vykreslenie samotnej sceny
    menu_scena.draw_self();
    //logo
    ctx.drawImage(logo, canvas.width / 2 - logo.width / 2, 50);    
}