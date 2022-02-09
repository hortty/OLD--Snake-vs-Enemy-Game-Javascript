i=0,j=0, direcao="right", y=7, x=15, x1=0, y1=0, pontos=0;

class Sneak {
    corpo = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];

    constructor(campo) {
        this.corpo = campo;
        this.corpo[y][x] = '*';
    }
    mover (evento) {
        if(evento.keyCode === 37 || evento.keyCode === 38 || evento.keyCode === 39 || evento.keyCode === 40) {
            if(evento.keyCode == 37 && direcao != "right") direcao = "left";
            if(evento.keyCode == 38 && direcao != "down") direcao = "up";
            if(evento.keyCode == 39 && direcao != "left") direcao = "right";
            if(evento.keyCode == 40 && direcao != "up") direcao = "down";
            document.getElementById("camp").innerHTML += direcao;
        }
    }
    andarCampo() {
        if(direcao=="right") {
            this.corpo[y][x] = '-';
            x++;
            if(x===30) {
            x=0;    
            }
            this.corpo[y][x] = '*';
    }
        else if(direcao=="left") {
            this.corpo[y][x] = '-';
            x--;
            if(x===-1) {
                x=29;    
            }
            this.corpo[y][x] = '*';
        }
        else if(direcao=="up") {
            this.corpo[y][x] = '-';
            y--;
            if(y===-1) {
                y=14;    
            }
            this.corpo[y][x] = '*';
        }
        else if(direcao=="down") {
            this.corpo[y][x] = '-';
            y++
            if(y===15) {
                y=0;    
            }
            this.corpo[y][x] = '*';
        }
    }
}

class Field {
    campo = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];

    constructor() {
        for(i=0;i<15;i++) {
            for(j=0;j<30;j++) {
                this.campo[i][j] = '-';
            }
        }
        this.comida = new Food(this.campo);
        this.cobra = new Sneak(this.campo);
        
    }
    defaultBehavior() {
        document.getElementById("camp").innerHTML = '';
        c.cobra.andarCampo();
        document.addEventListener('keydown', c.cobra.mover);
        for(i=0;i<15;i++) {
            for(j=0;j<30;j++) {
                document.getElementById("camp").innerHTML += this.campo[i][j] + ' ';
            }
            document.getElementById("camp").innerHTML += '<br>';
        }
        document.getElementById("pontos").innerHTML = "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; points: " + pontos;
    }
    fazerPonto() {
        if(x===x1 && y===y1) {
            console.log("Yaaay!")
            this.comida.remake();
            pontos++;
        }
    }
}

class Food {
    food = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];

    constructor(campo) {
    this.food = campo;
    y1 = Math.floor(Math.random() * (14 - 0) + 0);
    x1 = Math.floor(Math.random() * (29 - 0) + 0);
    this.food[y1][x1] = '@';
    }
    remake() {
    y1 = Math.floor(Math.random() * (14 - 0) + 0);
    x1 = Math.floor(Math.random() * (29 - 0) + 0);
    this.food[y1][x1] = '@'; 
    }
}

const c = new Field();

function startTimer(duration) {
    var timer = duration, seconds;
    setInterval(function () {
        seconds = parseInt(timer % 60, 10);
        seconds = seconds < 10 ? "0" + seconds : seconds;

        console.log("Oi");
        
        c.defaultBehavior();
        c.fazerPonto();

        if (--timer < 0) {
            timer = duration;
        }
    }, 700);
    document.getElementById("pontos").innerHTML = "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; points: " + this.pontos;
}

window.onload = function () {
    let minutes = 60 * 0.1;
    
    startTimer(minutes);
};

