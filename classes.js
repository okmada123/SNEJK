class Suradnice {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Button {
    constructor(text, x, y, width, height) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height; 
    }
    draw_self = function() {
        ctx.save();
        ctx.fillStyle = "gray";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.font = "30px Calibri";
        ctx.fillText(this.text, this.x + this.width / 2, this.y + (this.height + 15) / 2);
        ctx.restore();
    }
    onclick = function() {
        alert(this.text);
    }
}

class Zvuk extends Button {
    constructor(text, x, y, width, height) {
        super(text, x, y, width, height);
        this.zapnuty = false;
    }
    draw_self = function() {
        ctx.save();
        //pozadie je podla toho aka je aktualne scena
        if (scena == 0 || scena == 3) {
            ctx.fillStyle = "white";
        }
        else ctx.fillStyle = "yellow";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.restore();
        var obrazok;
        if (!this.zapnuty) obrazok = zvuk_off;
        else obrazok = zvuk_on;
        ctx.drawImage(obrazok, this.x, this.y);
    }
    onclick = function() {
        this.zapnuty = !this.zapnuty;
        zvuk_gitara.muted = !zvuk_gitara.muted;
        this.draw_self();
    }
}

class Scena {
    constructor() {
        this.clickables = [];
    }

    //pridanie buttonu do sceny
    add_button = function(button) {
        this.clickables.push(button);
    }

    draw_self = function() {
        //pozadie
        ctx.save();
        ctx.fillStyle = "yellow";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.restore();

        //buttons
        var i;
        for (i in this.clickables) {
            this.clickables[i].draw_self();
        }
    }

    //onclick handler priamo v scene - skontroluje vsetky buttony
    onclick = function(point) {
        var i;
        for(i in this.clickables) {
            var aktualny = this.clickables[i];
            if (point.x >= aktualny.x && point.x <= aktualny.x + aktualny.width && point.y >= aktualny.y && point.y <= aktualny.y + aktualny.height) {
                aktualny.onclick();
            }
        }
    }
}