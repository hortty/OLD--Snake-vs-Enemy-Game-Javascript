i=0,j=0, direcao="right", y=24, x=24, x1=0, y1=0, pontos=0, x3=0,y3=0, mudou=false, pos=0, enemyx=0, enemyy=0, contador=0;

class Sneak {
    corpo = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
    tail = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];

    constructor(campo) {
        this.corpo = campo;
    }
    mover (evento) {
        if(evento.keyCode === 37 || evento.keyCode === 38 || evento.keyCode === 39 || evento.keyCode === 40) {
            if(evento.keyCode == 37 && direcao != "right") direcao = "left"; mudou=true;
            if(evento.keyCode == 38 && direcao != "down") direcao = "up";   mudou=true;
            if(evento.keyCode == 39 && direcao != "left") direcao = "right";    mudou=true;
            if(evento.keyCode == 40 && direcao != "up") direcao = "down";   mudou=true;
        }
    }
    andarCampo() {
        if(direcao=="right") {
            this.tail[pos] = "right";
            x++;
            if(x>=45) {
                console.log("Voce perdeu!");
            }
            this.corpo[y][x] = '*';
    }
        else if(direcao=="left") {
            this.tail[pos] = "left";
            x--;
            if(x<=14) {
                console.log("Voce perdeu!");
            }
            this.corpo[y][x] = '*';
        }
        else if(direcao=="up") {
            this.tail[pos] = "up";
            y--;
            if(y<=15) {
                console.log("Voce perdeu!");
            }
            this.corpo[y][x] = '*';
        }
        else if(direcao=="down") {
            this.tail[pos] = "down";
            y++;
            if(y>=30) {
                console.log("Voce perdeu!");
            }
            this.corpo[y][x] = '*';
        }
    }
    tailPosicao() {
        y3 = y;
        x3 = x;
        try{
            if(this.tail[pos]==="right") {
            for(i=0;i<pos;i++) {
                x3--;
            }
            this.corpo[y3][x3] = '_';
            
            if(mudou==true){
                for(i=0;i<pos;i++) {
                    x3++;
                }
                x3--;

                while(y3<(y+pos) && y3<30) {
                    if(this.corpo[y3][x3] != '@') {
                        this.corpo[y3][x3] = '_';
                    }
                    y3++;
                }
                y3=y;
                while(y3>(y-pos) && y3>15) {
                    if(this.corpo[y3][x3] != '@') {
                        this.corpo[y3][x3] = '_';
                    }
                    y3--;
                }
                mudou=false;
            }
            }
            else if(this.tail[pos]==="left") {
                for(i=0;i<pos;i++) {
                    x3++;
                }
                this.corpo[y3][x3] = '_';
            
            
            if(mudou==true) {
                for(i=0;i<pos;i++) {
                    x3--;
                }
                x3++;
                while(y3<(y+pos) && y3<30) {
                    if(this.corpo[y3][x3] != '@') {
                        this.corpo[y3][x3] = '_';
                    }
                    y3++;
                }
                y3=y;
                while(y3>(y-pos) && y3>15) {
                    if(this.corpo[y3][x3] != '@') {
                        this.corpo[y3][x3] = '_';
                    }
                    y3--;
                }
                mudou=false;
            }
            }
            else if(this.tail[pos]==="up") {
                for(i=0;i<pos;i++) {
                    y3++;
                }
                if(y3<30) {
                    this.corpo[y3][x3] = '_';
                    }
                
                if(mudou==true) {
                    for(i=0;i<pos;i++) {
                        y3--;
                    }
                    y3++;
                    while(x3<(x+pos) && x3<45) {
                        if(this.corpo[y3][x3] != '@') {
                            this.corpo[y3][x3] = '_';
                        }
                        x3++;
                    }
                    x3=x;
                    while(x3>(x-pos) && x3>15) {
                        if(this.corpo[y3][x3] != '@') {
                            this.corpo[y3][x3] = '_';
                        }
                        x3--;
                    }
                    mudou=false;
                }
            }
            else if(this.tail[pos]==="down") {
                for(i=0;i<pos;i++) {
                    y3--;
                }
                if(y3>15) {
                this.corpo[y3][x3] = '_';
                }
                
                if(mudou==true) {
                    for(i=0;i<pos;i++) {
                        y3++;
                    }
                        y3--;
                        while(x3<(x+pos) && x3<45) {
                            if(this.corpo[y3][x3] != '@') {
                                this.corpo[y3][x3] = '_';
                            }
                            x3++;
                        }
                        x3=x;
                        while(x3>(x-pos) && x3>=15) {
                            if(this.corpo[y3][x3] != '@') {
                                this.corpo[y3][x3] = '_';
                            }
                            x3--;
                        }
                        mudou=false;
                    }   
            }
        }catch(Exception) {}
    } 
    }

class Field {
    campo = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];

    constructor() {
        for(i=0;i<45;i++) {
            for(j=0;j<60;j++) {
                if(j>=45 && i>=30) {
                    this.campo[i][j] = '';
                }
                else if(i<=15) {
                    this.campo[i][j] = '';
                }
                else {
                    this.campo[i][j] = '_';
                }
            }
        }
        this.comida = new Food(this.campo);
        this.cobra = new Sneak(this.campo);
        this.enemy = new Enemy(this.campo);
    }
    defaultBehavior() {
        document.getElementById("camp").innerHTML = '';
        this.cobra.andarCampo();
        this.enemy.movement();
        document.addEventListener('keydown', c.cobra.mover);
        for(i=15;i<30;i++) {
            for(j=15;j<45;j++) {
                document.getElementById("camp").innerHTML += this.campo[i][j] + ' ';
            }
            document.getElementById("camp").innerHTML += '<br>';
        }
        document.getElementById("pontos").innerHTML = "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; points: " + pontos;
    }
    fazerPonto() {
        if(x===x1 && y===y1) {
            pos++;                              //cauda aumenta de tamanho
            this.comida.remake();
            pontos++;
        }
        if(enemyx===x1 && enemyy===y1) {
            pos--;
            this.campo[enemyy][enemyx] = '_';
            this.comida.remake();
            pontos--;
        }
    }
}

class Enemy {
    enemy = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
    constructor(campo) {
        this.enemy = campo;
        enemyx = Math.floor(Math.random() * (40 - 20) + 20);
        enemyy = Math.floor(Math.random() * (27 - 15) + 15);
    } 
    movement() {
        contador++;
        this.enemy[enemyy][enemyx] = '_';
        if(contador===6) {
        if(enemyx<x1) {
            enemyx++;
        }
        if(enemyx>x1) {
            enemyx--;
        }
        if(enemyy<y1) {
            enemyy++;
        }
        if(enemyy>y1) {
            enemyy--;
        }
        contador=0;
        console.log("Contador:", contador);
        
    }
    if(this.enemy[enemyy+1][enemyx] === '*') {
        this.enemy[enemyy][enemyx] = 'X';
        this.reset();
    }
    else if(this.enemy[enemyy-1][enemyx] === '*') {
        this.enemy[enemyy][enemyx] = 'X';
        this.reset();
    }
    else if(this.enemy[enemyy][enemyx+1] === '*') {
        this.enemy[enemyy][enemyx] = 'X';
        this.reset();
    }
    else if(this.enemy[enemyy][enemyx-1] === '*') {
        this.enemy[enemyy][enemyx] = 'X';
        this.reset();
    }
    else {
        this.enemy[enemyy][enemyx] = '?';
    }
    }
    reset() {
        this.enemy[enemyy][enemyx] = '_';
        enemyx = Math.floor(Math.random() * (40 - 20) + 20);
        enemyy = Math.floor(Math.random() * (27 - 15) + 15);
    }
}

class Food {
    food = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];

    constructor(campo) {
    this.food = campo;
    y1 = Math.floor(Math.random() * (27 - 17) + 17);
    x1 = Math.floor(Math.random() * (40 - 20) + 20);
    this.food[y1][x1] = '@';
    }
    remake() {
    y1 = Math.floor(Math.random() * (27 - 17) + 17);
    x1 = Math.floor(Math.random() * (40 - 20) + 20);
    this.food[y1][x1] = '@'; 
    }
}

const c = new Field();

function startTimer(duration) {
    var timer = duration, seconds;
    setInterval(function () {
        seconds = parseInt(timer % 60, 10);
        seconds = seconds < 10 ? "0" + seconds : seconds;
        
        c.defaultBehavior();
        c.cobra.tailPosicao();
        c.fazerPonto();

        if (--timer < 0) {
            timer = duration;
        }
    }, 200);
    document.getElementById("pontos").innerHTML = "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; points: " + this.pontos;
}

window.onload = function () {
    let minutes = 60 * 0.1;
    
    startTimer(minutes);
};

