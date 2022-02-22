i=0,j=0, direcao="right", y=24, x=24, x1=0, y1=0, pontos=0, x3=0,y3=0, mudou=false, pos=0, enemyx=0, enemyy=0, contador=0, speedenemy=5, qtde=0, funcionar=true;

                                        /* comments in portuguese */
class Sneak {                                                                                   /* criando classe cobra, que vai ser responsavel por toda a movimentacao do jogador */
    corpo = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
    tail = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];

    constructor(campo) {
        this.corpo = campo;                                                             /* passando o campo por parametro */
    }
    mover (evento) {
        if(evento.keyCode === 37 || evento.keyCode === 38 || evento.keyCode === 39 || evento.keyCode === 40) {                  /* identifica a tecla digitada 'setinhas do teclado', e fornece uma direcao para a cobra */
            if(evento.keyCode == 37 && direcao != "right") {                                                /* 37 eh seta para esquerda, como a cobra nao pode ir pra direita se tiver indo para esquerda (180 graus) colocamos essa condicao */
                if(direcao!="left") {                                                   /* if colocado por causa de bug que acontecia com a cauda quando se apertava a mesma tecla da direcao */
                    direcao = "left"; 
                    mudou=true;                                     /* mudou eh uma condicao para avaliar se a cobra mudou de direcao, usamos essa variavel para resetar a cauda quando mudamos a direcao */
                }
            }                                                          /* a direcao segue 'fixa' em linha reta, ate que alguma tecla seja apertada e entao a direcao pode mudar */
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
    andarCampo() {                                      /* usei essa funcao para andar a 'cabeca' da cobra, a partir dessa parte do corpo, eu crio a cauda futuramente */
        if(direcao=="right") {
            this.tail[pos] = "right";                       /* setamos a direcao, que usaremos posteriormente */
            x++;
            if(x>=45) {
                funcionar = perder();                       /* caso x que eh a posicao do player passe do limite do campo estipulado 45, o usuario ira perder, funcao mostrada futuramente */
            }
            this.corpo[y][x] = '*';                         /* posicao antiga -> posicao nova, no campo */
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
        y3 = y;                         /* uso essas novas variaveis, para alterar a cauda da cobra mas sem mexer na cabeca, de forma que nao altero o 'valor da frente', lido apenas com os 'valores posteriores' */
        x3 = x;                         /* y e y3 sao linhas, enquanto x e x3 sao colunas, usei y e x da mesma forma que em um plano cartesiano, para facilitar a vida */
        try{
            if(this.tail[pos]==="right") {                      /* se a cabeca estiver para direita */
            for(i=0;i<pos;i++) {
                x3--;                                           /* conto quantas posicao a cauda possue de tamanho, puxando o x para esquerda <- */
            }
            this.corpo[y3][x3] = '_';                           /* assim eu zero a cauda da ultima posicao , quando a cobra anda em linha reta sem mudar de direcao */
                                                                /* ou seja, a cobra permanece formando '*' no campo ate atingir a ultima posicao da cauda */
            if(mudou==true){
                for(i=0;i<pos;i++) {
                    x3++;                                       /* caso tenha mudado de direcao, o procedimento eh diferente */
                }                                               /* preciso andar novamente ate a parte 'head' da cobra, e a partir dela colocar '_' em valores de y (linha), para esse caso */
                x3--;               

                while(y3<(y+pos) && y3<30) {
                    if(this.corpo[y3][x3] != '@') {
                        this.corpo[y3][x3] = '_';
                    }
                    y3++;                                       /* aqui eh onde eu zero as linhas da cauda da cobra, de forma que ela perde toda a cada, mas comeca a crescer novamente por causa da programacao que expliquei acima */
                }
                y3=y;
                while(y3>(y-pos) && y3>15) {
                    if(this.corpo[y3][x3] != '@') {
                        this.corpo[y3][x3] = '_';              /* aqui estou zerando o outro 'lado' de y */
                    }
                    y3--;
                }
                mudou=false;                                    /* preciso mudar para false, para que so entre nessa condicao novamente, se mudar de direcao, ou seja, se o usuario pressionar uma setinha do teclado */
            }
            }
            else if(this.tail[pos]==="left") {                  /* o mesmo procedimento acontece com os outros if abaixo, com a diferenca que para up e down, trocase o x por y, por que precisamos 'zerar' as colunas dai, e nao as linhas */
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
    constructor() {                     /* criando o campo */
        for(i=0;i<45;i++) {
            for(j=0;j<60;j++) {
                if(j>=45 && i>=30) {                /* uso intervalos diferentes, nao comecando em zero por exemplo, pra evitar bugs, dessa forma nao tem um indice menor que zero por exemplo */
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
        this.comida = new Food(this.campo);             /* instanciando objeto comida */
        this.cobra = new Sneak(this.campo);             /* instanciando objeto cobra */
        this.enemy[qtde] = new Enemy(this.campo);       /* instanciando objeto enemigo, todos dentro da classe Field, que 'contem' todos esses objetos */
    }
    defaultBehavior() {                                 /* funcao padrao que funciona desde o inicio ate o final do codigo, eh nela que chamo a maioria das funcoes */
        document.getElementById("camp").innerHTML = '';
        this.cobra.andarCampo();                            /* cobra andando pelo campo */
            for(i=0;i<(qtde+1);i++) {
            this.enemy[i].movement();                       /* enemigo andando pelo campo */
            }
        document.addEventListener('keydown', c.cobra.mover);                /* recebendo tecla do usuario */
        if(enemyy==y && enemyx==x) {
            funcionar = perder();                               /* se a posicao 'head' do player e a posicao do inimigo forem iguais, o player perde */
        }
        if(funcionar!=false) {
        for(i=15;i<30;i++) {
            for(j=15;j<45;j++) {
                document.getElementById("camp").innerHTML += this.campo[i][j] + ' ';                /* aqui eh onde eu faco 'print' da minha matriz campo, onde todo o game acontece */
            }
            document.getElementById("camp").innerHTML += '<br>';
        }
    }
        if(funcionar==true) {
            document.getElementById("pontos").innerHTML = "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <i>points:</i> " + pontos;        /* exibindo a pontuacao */
            }
            else {
                if(localStorage.getItem('maxpontos')==null) {
                localStorage.setItem('maxpontos', pontos);                          /* uso local storage para armazenar o valor maximo que o usuario atingiu, de forma que o valor fica guardado ate mesmo se o usuario fechar o navegador */
                }
                if (localStorage.getItem('maxpontos')>pontos){                      /* faco a comparacao , se a pontuacao na rodada atual foi maior que o valor ja armazenado */
                    pontos = localStorage.getItem('maxpontos');
                }
                else {
                    localStorage.setItem('maxpontos', pontos);
                }
                document.getElementById("pontos").innerHTML = "x";
                document.getElementById("pontos").innerHTML = "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>Maximum score:</b> " + pontos; 
            }
        }
    fazerPonto() {                          /* quando a cobra come a comida */
        if(x===x1 && y===y1) {
            pos++;                              //cauda aumenta de tamanho
            this.comida.remake();               /* recriando a comida novamente */
            pontos++;
            if(pontos<3) {
                speedenemy=(4);
            }
            else if(pontos<5) {
                speedenemy=(3);
            }
            else {
                speedenemy=(3-(pontos*(0.01)));                 /* mudando a velocidade do enemigo, conforme a pontuacao atingida */
            }
        }
        if(enemyx===x1 && enemyy===y1) {
            this.campo[enemyy][enemyx] = '_';               /* uso enemyy e enemyx para 'saber' a posicao do enemigo dentro da matriz */
            this.comida.remake();
            pontos--;                                   /* usuario perde ponto quando o enemigo consegue atingir a comida */
            speedenemy=(3-(pontos*0.05));
        }
    }
}

class Enemy {
    enemy = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];

    constructor(campo) {
        this.enemy = campo;
        enemyx = Math.floor(Math.random() * (40 - 20) + 20);
        enemyy = Math.floor(Math.random() * (27 - 17) + 17);                    /* usando random para 'criar valor aleatorio', estabelecendo a posicao para o enemigo */
    } 
    movement() {
        contador++;
        this.enemy[enemyy][enemyx] = '_';
        if(contador>speedenemy) {                           /* uso contador para atrasar a movimentacao do inimigo */
        if(enemyx<x1) {                                  /* atraves desse conjunto de if's, ele 'persegue' a comida */
            enemyx++;
        }
        if(enemyx>x1) {                                     /* ... */
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
    if(this.enemy[enemyy+1][enemyx] === '*' && this.enemy[enemyy-1][enemyx] === '*') {                      /* aqui identifico se o enemigo esta entre a cauda da cobra, em caso afirmativo, o enemigo eh reiniciado, pois ele leva dano se atingir a cauda da cobra */
        this.enemy[enemyy][enemyx] = 'X';
        this.reset();
    }
    else if(this.enemy[enemyy][enemyx+1] === '*' && this.enemy[enemyy][enemyx-1] === '*') {                 /* identifico na horizontal e tbm na vertical, usando esse if e o outro de cima */
        this.enemy[enemyy][enemyx] = 'X';
        this.reset();
    }
    else {
        this.enemy[enemyy][enemyx] = '?';                                       /* caso nenhuma das condicoes acima seja atingida, entao definimos o novo lugar da matriz onde o enemigo ficara */
    }
    }
    reset() {                                           /* funcao para resetar o enemigo */
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
    remake() {                                  /* refazendo a comida */
    y1 = Math.floor(Math.random() * (27 - 17) + 17);
    x1 = Math.floor(Math.random() * (40 - 20) + 20);
    this.food[y1][x1] = '@';                    /* uso x1 e y1 para saber exatamente a posicao da comida na matriz */
    }
}

function perder() {                     /* caso o usuario acabe sofrendo algum dano durante o jogo, chamamos essa funcao para terminar o jogo */
    document.getElementById("camp").innerText = " ";
    document.getElementById("camp").innerHTML = "<h1>You LOSE! F5 to restart</h1>";
    return false;                               /* retornamos false e armazenamos na variavel 'funcionar', e da variavel 'funcionar' eu uso um if para desativar o 'print' da matriz do campo */
}

const c = new Field();                  /* instanciamos o objeto campo */

function startTimer(duration) {             /* aqui crio funcao para estabelecer a duracao do evento. Mudando valores aqui eh possivel alterar o ritmo com que o codigo funciona, acelerando ou deixando lento tudo que ocorre dentro do jogo */
    var timer = duration, seconds;
    setInterval(function () {
        seconds = parseInt(timer % 60, 10);
        seconds = seconds < 10 ? "0" + seconds : seconds;
        
        if(funcionar===true) {
        c.defaultBehavior();                    /* aquela funcao que chamamos para executar o comportamento padrao da matriz */
        c.cobra.tailPosicao();                  /* pegamos a funcao que cobra possui, estando cobra dentro de campo */
        c.fazerPonto();
        }
        if (--timer < 0) {
            timer = duration;
        }
    }, 170);
}

window.onload = function () {                       /* quando a pagina eh carregada */
    let minutes = 60 * 0.1;
    
    startTimer(minutes);
};