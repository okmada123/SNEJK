var high_scores_scena;

function high_scores() {
    high_scores_scena = new Scena();
    scena = 4;

    //pridanie tlacidla spat
    var button_spat = new Button ("Spat", 10, 10, 100, 50);
    button_spat.onclick = function() {
        high_scores_scena.clickables.length = 0;
        menu();
    }
    high_scores_scena.add_button(button_spat);

    //pridanie tlacidla zmaz historiu score
    var button_zmaz = new Button ("Zmaz historiu", canvas.width - 210, canvas.height - 60, 200, 50);
    button_zmaz.onclick = function() {
        localStorage.clear();
        vypis_skore();
    }
    high_scores_scena.add_button(button_zmaz);

    //pridanie zvuku do sceny
    high_scores_scena.add_button(zvuk);

    //vykresli scenu - pozadie + buttons
    high_scores_scena.draw_self();
    //vypise skore podla toho co je ulozene v localStorage
    vypis_skore();
}

function vypis_skore() {
    ctx.save();
    ctx.fillStyle = "yellow";
    ctx.fillRect(0, 100, canvas.width, canvas.height - 200);
    ctx.restore();
    
    ctx.save();
    ctx.font = "30px Calibri";
    ctx.fillText("Lahka:", canvas.width / 2 - 300, 100);
    ctx.fillText("Tazka:", canvas.width / 2 + 150, 100);
    ctx.restore();

    var x = canvas.width / 2 - 350;
    //easy
    if (localStorage.getItem("score_array_easy") === null) {
        ctx.save();
        ctx.font = "20px Calibri";
        ctx.textAlign = "center";
        ctx.fillText("Nemas ulozene ziadne skore", x+100, 130);
        ctx.fillText("pre lahku obtiaznost.", x+100, 160);
        ctx.restore();
    }
    else {
        var pole = JSON.parse(localStorage.getItem("score_array_easy"));
        var y = 130;
        var poradie = 0;
        for (i in pole) {
            poradie++;
            ctx.save();
            ctx.font = "20px Calibri";
            ctx.fillText(poradie + ": " + pole[i][0], x, y);
            ctx.textAlign = "center";
            ctx.fillText(pole[i][1], x+250, y);
            ctx.restore();
            if (poradie >= 15) break;
            y += 30;
        }
    }

    x = canvas.width / 2 + 80;
    //hard
    if (localStorage.getItem("score_array_hard") === null) {
        ctx.save();
            ctx.font = "20px Calibri";
            ctx.textAlign = "center";
            ctx.fillText("Nemas ulozene ziadne skore", x+100, 130);
            ctx.fillText("pre tazku obtiaznost.", x+100, 160);
            ctx.restore();
    }
    else {
        var pole = JSON.parse(localStorage.getItem("score_array_hard"));
        var y = 130;
        var poradie = 0;
        for (i in pole) {
            poradie++;
            ctx.save();
            ctx.font = "20px Calibri";
            ctx.fillText(poradie + ": " + pole[i][0], x, y);
            ctx.textAlign = "center";
            ctx.fillText(pole[i][1], x+250, y);
            ctx.restore();
            if (poradie >= 15) break;
            y += 30;
        }
    }
}