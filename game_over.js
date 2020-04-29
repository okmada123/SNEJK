var game_over_scena;

function game_over_render() {
    game_over_scena = new Scena();
    scena = 3;

    //musime implementovat onkeydown handler pre scenu
    game_over_scena.onkeydown = function(key) {
        for (i in this.clickables) {
            var aktualny = this.clickables[i];
            if (typeof(aktualny.onkeydown) == "function") {
                aktualny.onkeydown(key);
            }
        }
    }

    //musime implementovat vlastnu draw_self funkciu, lebo tato scena nie je na celu obrazovku
    game_over_scena.draw_self = function() {
        //pozadie
        ctx.save();
        ctx.fillStyle = "white";
        ctx.fillRect(canvas.width / 4, canvas.height / 3, canvas.width / 2, canvas.height / 3);
        ctx.restore();

        //buttons
        var i;
        for (i in this.clickables) {
            this.clickables[i].draw_self();
        }

        //score
        ctx.save();
        ctx.font = "30px Calibri";
        ctx.textAlign = "center";
        ctx.fillText("Dosiahol si skore: " + skore, canvas.width / 2, canvas.height / 2 - 50);
        ctx.restore();
    }

    //pridanie tlacidla hrat znova
    var button_play_again = new Button ("Hrat znova", canvas.width / 2 - 150 - 30, canvas.height / 2 + 50, 150, 50);
    button_play_again.onclick = function() {
        textfield.write_score();
        game_over_scena.clickables.length = 0;
        start_game();
    }
    game_over_scena.add_button(button_play_again);

    //pridania tlacidla navrat do menu
    var button_menu = new Button ("Menu", canvas.width - canvas.width / 2 + 30, canvas.height / 2 + 50, 150, 50);
    button_menu.onclick = function() {
        textfield.write_score();
        game_over_scena.clickables.length = 0;
        menu();
    }
    game_over_scena.add_button(button_menu);

    //pridanie textoveho pola aj so vsetkymi funkciami - handlermi
    var textfield = new Button("Klikni a napis meno!", canvas.width / 2 - 150, canvas.height / 2 - 20, 300, 50);
{
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

            function descending(a, b) {
                if (a[1] == b[1]) return 0;
                else if (a[1] < b[1]) return 1;
                else return -1;
            }

            data.sort(descending);

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
}

    //pridanie textfieldu do sceny
    game_over_scena.add_button(textfield);

    //pridanie zvuku do sceny
    game_over_scena.add_button(zvuk);

    //vykreslenie sceny
    game_over_scena.draw_self();
}