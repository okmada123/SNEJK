var instructions_scena;

//inicializacia prepnutia do sceny instrukcie
function instructions() {
    instructions_scena = new Scena();
    scena = 2;

    //buttons
    var button_spat = new Button ("Spat", 10, 10, 100, 50);
    button_spat.onclick = function() {
        instructions_scena.clickables.length = 0;
        menu();
    }
    instructions_scena.add_button(button_spat);

    //pridanie zvuku do sceny
    instructions_scena.add_button(zvuk);

    //vykreslenie sceny - pozadie + tlacidla
    instructions_scena.draw_self();

    //vykreslenie instrukcii
    ctx.save();
    ctx.drawImage(logo, canvas.width / 2 - logo.width / 2, 50);
    ctx.drawImage(jablko, canvas.width / 5 - jablko.width, 300);
    ctx.drawImage(tabletka, canvas.width - canvas.width / 5, 300);
    ctx.font = "25px Calibri";
    ctx.textAlign = "center";
    ctx.fillText("Jablko +1 dlzka, +10 skore", canvas.width / 5, 250);
    ctx.fillText("Powerup -5 dlzka, +50 skore", canvas.width - canvas.width / 5, 250);
    ctx.drawImage(sipky, canvas.width / 4 - sipky.width / 2, 400);
    ctx.fillText("Pohyb - sipky", canvas.width / 4, 630);
    ctx.fillText("Tazka obtiaznost:", canvas.width - canvas.width / 5, 430);
    ctx.fillText("Rychlost pohybu sa zvysuje", canvas.width - canvas.width / 5, 500);
    ctx.fillText("kazdych 10 sekund.", canvas.width - canvas.width / 5, 520);
    ctx.fillText("Tabletka na skratenie", canvas.width - canvas.width / 5, 560);
    ctx.fillText("sa vobec neobjavuje.", canvas.width - canvas.width / 5, 580);
    ctx.restore();
}