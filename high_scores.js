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
    //vypise skore podla toho co je ulozene v cache
    vypis_skore();
}

function vypis_skore() {
    ctx.save();
    ctx.fillStyle = "yellow";
    ctx.fillRect(200, 0, 400, canvas.height);
    ctx.restore();
    
    if (localStorage.getItem("score_array") === null) {
        ctx.save();
            ctx.font = "30px Calibri";
            ctx.textAlign = "center";
            ctx.fillText("Nemas ulozene ziadne skore.", canvas.width / 2, 300);
            ctx.restore();
    }
    else {
        var pole = JSON.parse(localStorage.getItem("score_array"));
        var y = 50;
        var poradie = 0;
        for (i in pole) {
            //console.log(pole[i]);
            poradie++;
            ctx.save();
            ctx.font = "20px Calibri";
            ctx.textAlign = "center";
            ctx.fillText(poradie + ": " + pole[i][0] + "        \t" + pole[i][1], canvas.width / 2, y);
            ctx.restore();
            if (poradie >= 10) break;
            y += 50;
        }
    }
}