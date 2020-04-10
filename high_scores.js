var high_scores_scena = {};
high_scores_scena.clickables = [];
high_scores_scena.onclick = function(point) {
    for (i in this.clickables) {
        var aktualny = this.clickables[i];
        if (point.x >= aktualny.x && point.x <= aktualny.x + aktualny.width && point.y >= aktualny.y && point.y <= aktualny.y + aktualny.height) {
            aktualny.onclick();
        }
    }
}

function high_scores() {
    scena = 4;
    ctx.save();
    ctx.fillStyle = "yellow";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    var spat = new Button ("Spat", 10, 10, 100, 50);
    spat.onclick = function() {
        high_scores_scena.clickables.length = 0;
        menu();
    }
    high_scores_scena.clickables.push(spat);

    var zmaz = new Button ("Zmaz historiu", canvas.width - 210, canvas.height - 60, 200, 50);
    zmaz.onclick = function() {
        localStorage.clear();
        vypis_skore();
    }
    high_scores_scena.clickables.push(zmaz);

    for (i in high_scores_scena.clickables) {
        high_scores_scena.clickables[i].draw_self();
    }

    //vypisanie ulozenych skore
    // if (localStorage.getItem("score_array") === null) alert("Nemas ulozene ziadne skore.");
    // else {
    //     var pole = JSON.parse(localStorage.getItem("score_array"));
    //     var y = 50;
    //     var poradie = 0;
    //     for (i in pole) {
    //         //console.log(pole[i]);
    //         poradie++;
    //         ctx.save();
    //         ctx.font = "20px Calibri";
    //         ctx.textAlign = "center";
    //         ctx.fillText(poradie + ": " + pole[i][0] + "        \t" + pole[i][1], canvas.width / 2, y);
    //         ctx.restore();

    //         y += 50;
    //     }
    // }
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