var game_over_scena = {};
game_over_scena.clickables = [];
game_over_scena.onclick = function(point) {
    for (i in this.clickables) {
        var aktualny = this.clickables[i];    
        if (point.x >= aktualny.x && point.x <= aktualny.x + aktualny.width && point.y >= aktualny.y && point.y <= aktualny.y + aktualny.height) {
            aktualny.onclick();
        }
    }
}

game_over_scena.onkeydown = function(key) {
    //var znak = String.fromCharCode(key);
    for (i in this.clickables) {
        var aktualny = this.clickables[i];
        if (typeof(aktualny.onkeydown) == "function") {
            aktualny.onkeydown(key);
        }
    }
}

function game_over_render() {
    scena = 3;
    ctx.save();
    ctx.fillStyle = "white";
    ctx.fillRect(canvas.width / 4, canvas.height / 3, canvas.width / 2, canvas.height / 3);
    ctx.restore();
    game_over_scena.clickables.push(new Button ("Hrat znova", canvas.width / 2 - 150 - 30, canvas.height / 2 + 50, 150, 50));
    game_over_scena.clickables[0].onclick = function() {
        textfield.write_score();
        game_over_scena.clickables.length = 0;
        start_game();
    }
    game_over_scena.clickables.push(new Button ("Menu", canvas.width - canvas.width / 2 + 30, canvas.height / 2 + 50, 150, 50));
    game_over_scena.clickables[1].onclick = function() {
        textfield.write_score();
        game_over_scena.clickables.length = 0;
        menu();
    }

    //vytvorenie textoveho pola
    var textfield = new Button("Klikni a napis meno!", canvas.width / 2 - 150, canvas.height / 2 - 20, 300, 50);
    textfield.focus = false;
    
    textfield.draw_self = function() {
        if (this.focus) {
            ctx.save();
            ctx.fillStyle = "yellow";
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.font = "30px Calibri";
            ctx.fillText(this.text + "_", this.x + this.width / 2, this.y + (this.height + 15) / 2);
            ctx.restore();
        }
        else {
            ctx.save();
            ctx.fillStyle = "gray";
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.font = "30px Calibri";
            ctx.fillText(this.text + "_", this.x + this.width / 2, this.y + (this.height + 15) / 2);
            ctx.restore();
        }
    }

    textfield.write_score = function() {
        if (this.text == "" || this.text == "Klikni a napis meno!") {
            return;
        }

        //otvorit
        var data;
        if ((data = JSON.parse(localStorage.getItem("score_array"))) === null) {
            data = [];
            data.push([this.text, skore]);
            localStorage.setItem("score_array", JSON.stringify(data));
        }
        else {
            data.push([this.text, skore]);
            localStorage.setItem("score_array", JSON.stringify(data));
        }
    }

    textfield.onclick = function() {
        this.focus = !this.focus;
        if (this.text == "Klikni a napis meno!") this.text = "";
        this.draw_self();
    }

    textfield.onkeydown = function(key) {
        if (this.focus) {
            //backspace
            if (key == 8) {
                this.text = this.text.substring(0, this.text.length - 1);
            }
            //enter
            else if (key == 13) {
                alert(this.text);
                //if (this.text != "") this.write_score();
            }
            else {
                var znak = String.fromCharCode(key);
                this.text = this.text + znak;
            }
            this.draw_self();
        }
    }

    game_over_scena.clickables.push(textfield);
    game_over_scena.clickables.push(zvuk);

    //render buttonov
    for (i in game_over_scena.clickables) {
        game_over_scena.clickables[i].draw_self();
    }

    ctx.save();
    ctx.font = "30px Calibri";
    ctx.textAlign = "center";
    ctx.fillText("Dosiahol si skore: " + skore, canvas.width / 2, canvas.height / 2 - 50);
    ctx.restore();
}