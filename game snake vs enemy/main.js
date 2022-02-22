i=0,j=0, direcao="right", y=24, x=24, x1=0, y1=0, pontos=0, x3=0,y3=0, mudou=false, pos=0, enemyx=0, enemyy=0, contador=0, speedenemy=5, qtde=0, funcionar=true;

class Sneak {
    corpo = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
    tail = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];

    constructor(campo) {
        this.corpo = campo;
    }
    mover (evento) {
        if(evento.keyCode === 37 || evento.keyCode === 38 || evento.keyCode === 39 || evento.keyCode === 40) {
            if(evento.keyCode == 37 && direcao != "right") {
                if(direcao!="left") {
                    direcao = "left"; 
                    mudou=true;
                }
            }
            if(evento.keyCode == 38 && direcao != "down") {
                if(direcao!="up") {
                    direcao = "up";   
                    mudou=true;
                }
            }
            if(evento.keyCode == 39 && direcao != "left") {
                if(direcao!="right") {
                    direcao = "right";    
                    mudou=true;
                }
            }
            if(evento.keyCode == 40 && direcao != "up") {
                if(direcao!="down") {
                    direcao = "down";   
                    mudou=true;
                }
            }

        }
    }
    andarCampo() {
        if(direcao=="right") {
            this.tail[pos] = "right";
            x++;
            if(x>=45) {
                funcionar = perder();
            }
            this.corpo[y][x] = '*';
    }
        else if(direcao=="left") {
            this.tail[pos] = "left";
            x--;
            if(x<=14) {
                funcionar = perder();
            }
            this.corpo[y][x] = '*';
        }
        else if(direcao=="up") {
            this.tail[pos] = "up";
            y--;
            if(y<=15) {
                funcionar = perder();
            }
            this.corpo[y][x] = '*';
        }
        else if(direcao=="down") {
            this.tail[pos] = "down";
            y++;
            if(y>=30) {
                funcionar = perder();
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
    enemy = [];
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
        this.enemy[qtde] = new Enemy(this.campo);
    }
    defaultBehavior() {
        document.getElementById("camp").innerHTML = '';
        this.cobra.andarCampo();
            for(i=0;i<(qtde+1);i++) {
            this.enemy[i].movement();
            }
        document.addEventListener('keydown', c.cobra.mover);
        if(enemyy==y && enemyx==x) {
            funcionar = perder();
        }
        if(funcionar!=false) {
        for(i=15;i<30;i++) {
            for(j=15;j<45;j++) {
                document.getElementById("camp").innerHTML += this.campo[i][j] + ' ';
            }
            document.getElementById("camp").innerHTML += '<br>';
        }
    }
        if(funcionar==true) {
            document.getElementById("pontos").innerHTML = "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <i>points:</i> " + pontos;
            }
            else {
                if(localStorage.getItem('maxpontos')==null) {
                localStorage.setItem('maxpontos', pontos);
                }
                if (localStorage.getItem('maxpontos')>pontos){
                    pontos = localStorage.getItem('maxpontos');
                }
                else {
                    localStorage.setItem('maxpontos', pontos);
                }
                document.getElementById("pontos").innerHTML = "x";
                document.getElementById("pontos").innerHTML = "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>Maximum score:</b> " + pontos; 
            }
        }
    fazerPonto() {
        if(x===x1 && y===y1) {
            pos++;                              //cauda aumenta de tamanho
            this.comida.remake();
            pontos++;
            if(pontos<3) {
                speedenemy=(4);
            }
            else if(pontos<5) {
                speedenemy=(3);
            }
            else {
                speedenemy=(3-(pontos*(0.01)));
            }
        }
        if(enemyx===x1 && enemyy===y1) {
            this.campo[enemyy][enemyx] = '_';
            this.comida.remake();
            pontos--;
            speedenemy=(3-(pontos*0.05));
        }
    }
}

class Enemy {
    enemy = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];

    constructor(campo) {
        this.enemy = campo;
        enemyx = Math.floor(Math.random() * (40 - 20) + 20);
        enemyy = Math.floor(Math.random() * (27 - 17) + 17);
    } 
    movement() {
        contador++;
        this.enemy[enemyy][enemyx] = '_';
        if(contador>speedenemy) {
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
    }
    if(this.enemy[enemyy+1][enemyx] === '*' && this.enemy[enemyy-1][enemyx] === '*') {
        this.enemy[enemyy][enemyx] = 'X';
        this.reset();
    }
    else if(this.enemy[enemyy][enemyx+1] === '*' && this.enemy[enemyy][enemyx-1] === '*') {
        this.enemy[enemyy][enemyx] = 'X';
        this.reset();
    }
    else {
        this.enemy[enemyy][enemyx] = '?';
    }
    }
    reset() {
        this.enemy[enemyy][enemyx] = 'X';
        enemyx = Math.floor(Math.random() * (40 - 20) + 20);
        enemyy = Math.floor(Math.random() * (27 - 17) + 17);
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

function perder() {
    document.getElementById("camp").innerText = " ";
    document.getElementById("camp").innerHTML = "<h1>You LOSE! F5 to restart</h1>";
    return false;
}

const c = new Field();

function startTimer(duration) {
    var timer = duration, seconds;
    setInterval(function () {
        seconds = parseInt(timer % 60, 10);
        seconds = seconds < 10 ? "0" + seconds : seconds;
        
        if(funcionar===true) {
        c.defaultBehavior();
        c.cobra.tailPosicao();
        c.fazerPonto();
        }
        if (--timer < 0) {
            timer = duration;
        }
    }, 170);
}

window.onload = function () {
    let minutes = 60 * 0.1;
    
    startTimer(minutes);
};