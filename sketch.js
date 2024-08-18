// Variáveis do jogo
let telaStart = 3;
let telaInicial = 0;
let tela1Jogador = 1;
let tela2Jogador = 2;
let telaAtual = telaStart;
let bg;

let xDoX = 120;
let yDoX1Jogador = 26;
let yDoX2Jogador = 56;
let yDoX = yDoX1Jogador;

//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadeXBolinhaPadrao = 3;
let velocidadeXBolinha = velocidadeXBolinhaPadrao;
let velocidadeYBolinha = 3;

//sons do jogo
let raquetada
let ponto;
let trilha;
let trilhaMenu;

function preload() {
  trilhaMenu = loadSound("trilha.mp3");
  trilha = loadSound("trilha2.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
  bg = loadImage('elden.jpeg');
}

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;
let colidiu = false;

//Placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//variaveis do oponente 
let xRaqueteOponente = 585
let yRaqueteOponente = 150
let velocidadeYOponente;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);

  if(telaAtual === telaStart) {
    TelaStart();
  }
  else if(telaAtual === telaInicial) {
    background(bg);
    TitleScreen();
    TitleScreenComand();
  } else {
    mostraBolinha();
    movimentaBolinha();
    marcaPonto();
    verificaColisaoBorda();
    movimentaMinhaRaquete();
    verificaColisaoRaquete(xRaquete, yRaquete);
    mostraRaquete(xRaquete, yRaquete);
    mostraRaquete(xRaqueteOponente, yRaqueteOponente);

    if (telaAtual === tela1Jogador) {
      movimenteRaqueteOponente();
    } else {
      movimentaMinhaRaquete2();
    }
    
    verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente)
    incluiPlacar();
  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    if (telaAtual === telaStart) {
      telaAtual = telaInicial;
      trilhaMenu.loop();
      trilhaMenu.play();
    }
    else if (telaAtual === telaInicial) {
      if (yDoX === yDoX1Jogador) {
        telaAtual = tela1Jogador;
      } else {
        telaAtual = tela2Jogador;
      }
  
      trilhaMenu.stop();
      trilha.loop();
      trilha.play();
    }
  }
}

function TelaStart() {
  stroke(255);
  textAlign(CENTER);
  textSize(20);
  fill(color(255, 238, 0));
  text("Aperte ENTER para Começar", 300, 200);
}

function TitleScreen() {
  // X
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  fill(255);
  text("X", xDoX, yDoX);

  stroke(255);
  textAlign(CENTER);
  textSize(20);
  fill(color(255, 238, 0));
  text("Elden Ring", 300, 280);

  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 80, 20);
  fill(255);
  text("1 Player", 185, 26);

  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 40, 80, 20);
  fill(255);
  text("2 Player", 185, 56);
}

function TitleScreenComand() {
  if (keyIsDown(UP_ARROW)) {
    yDoX = yDoX1Jogador;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    yDoX = yDoX2Jogador;
  }
}

function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
  if (xBolinha + raio > width
    || xBolinha - raio < 0)
    {
      // Resetar velocidade da bolinha
      if (velocidadeXBolinha < 0) {
        velocidadeXBolinha = velocidadeXBolinhaPadrao;
      } else {
        velocidadeXBolinha = velocidadeXBolinhaPadrao * -1;
      }
      
      xBolinha = 300;
  }
  if (yBolinha + raio > height ||
    yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x, y) {
  rect(x, y, raqueteComprimento, raqueteAltura)
}

function movimentaRaqueteOponente() {
  if (keyIsDown(87)) {
    yRaqueteOponente -= 10;
  }
  if (keyIsDown(83)) {
    yRaqueteOponente += 10;
  }
}

function movimentaMinhaRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }
}

function movimentaMinhaRaquete2() {
  if (keyIsDown(87)) {
    yRaqueteOponente -= 10;
  }
  if (keyIsDown(83)) {
    yRaqueteOponente += 10;
  }
}

function verificaColisaoRaquete(x, y) {
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu) {
    if((velocidadeXBolinha > 0 && velocidadeXBolinha < 5)
      || (velocidadeXBolinha < 0 && velocidadeXBolinha > -5)){
      velocidadeXBolinha = (velocidadeXBolinha * -1) * 1.2;
    }
    raquetada.play();
  }
}

function movimenteRaqueteOponente() {
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente
}

function incluiPlacar() {
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosDoOponente, 470, 26);
}

function marcaPonto() {
  if (xBolinha > 591) {
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 9) {
    pontosDoOponente += 1;
    ponto.play();
  }
}
