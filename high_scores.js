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

    for (i in high_scores_scena.clickables) {
        high_scores_scena.clickables[i].draw_self();
    }

    //vypisanie ulozenych skore
    if (localStorage.getItem("score_array") === null) console.log("Nemas ulozene ziadne skore.");
    else {
        var pole = JSON.parse(localStorage.getItem("score_array"));
        var y = 50;
        for (i in pole) {
            console.log(pole[i]);
            ctx.save();
            ctx.font = "20px Calibri";
            ctx.textAlign = "center";
            ctx.fillText(i + ": " + pole[i][0] + ", " + pole[i][1], canvas.width / 2, y);
            ctx.restore();

            y += 50;
        }
    }

}