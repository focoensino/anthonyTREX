//Sprites
var trex,chao,subchao,nuvem,cacto,escolherCacto,tempoJogo;

//imagens e animações
var trexCorrendo,imagemChao,imagemNuvem,imagemFim,imagemReiniciar;

//variaveis dos CACTOS
var imagemCacto1,imagemCacto2,imagemCacto3,imagemCacto4,imagemCacto5,imagemCacto6

var trexColidiu,fimDeJogo,reiniciar

//variaveis de som
var somPulo,somMorrendo,somCheckpoint

const jogar = 1;
const encerrar = 0;
var estadoJogo = jogar;

//função de gerar imagems
function preload(){
 trexCorrendo = loadAnimation("trex1.png","trex2.png","trex3.png")
  
  trexColidiu = loadAnimation("trex_collided.png")
  
  imagemChao = loadImage("ground2.png")
  
  imagemNuvem = loadImage("cloud.png")
  
  imagemCacto1 = loadImage("obstacle1.png")
  imagemCacto2 = loadImage("obstacle2.png")
  imagemCacto3 = loadImage("obstacle3.png")
  imagemCacto4 = loadImage("obstacle4.png")
  imagemCacto5 = loadImage("obstacle5.png")
  imagemCacto6 = loadImage("obstacle6.png")
  
  imagemFim = loadImage("gameOver.png")
  imagemReiniciar = loadImage("restart.png")
  
  somPulo = loadSound("jump.mp3")
  somMorrendo = loadSound("die.mp3")
  somCheckpoint = loadSound("checkPoint.mp3")
  
}

function setup() {
 createCanvas(600,200)
  
  trex = createSprite(50,100,20,40)
  trex.addAnimation("correndo",trexCorrendo)
   trex.addAnimation("colidiu",trexColidiu)
  
  trex.scale = 0.5
  
  chao = createSprite(200,180,500,10)
  chao.addAnimation("chao", imagemChao)
  
  subchao = createSprite(200,190,500,10)
  subchao.visible = false
  
  fimDeJogo = createSprite(300,80,30,30)
  fimDeJogo.addAnimation("fimDeJogo",imagemFim)
  fimDeJogo.scale = 0.5
  
    reiniciar = createSprite(300,120,30,30)
  reiniciar.addAnimation("reiniciar",imagemReiniciar)
  reiniciar.scale = 0.5
  
  
      fimDeJogo.visible = false
    reiniciar.visible = false
  tempoJogo = 0;
  
  trex.setCollider("circle", 0,0,40)
  trex.debug = false
  

  
  GrupoDeCactos = new Group();
  GrupoDeNuvens = new Group();
  
}

function draw() {
  background(180)

   text("Tempo:"+ tempoJogo,500,30)
 
  if(estadoJogo == jogar){
    
  //cronometro V
  //tempoJogo = tempoJogo + Math.round(frameCount / 60)
    
    tempoJogo = tempoJogo+1
    if(tempoJogo > 0 && tempoJogo % 100 == 0){
      somCheckpoint.play()
    }
      //velocidade do chão
  chao.velocityX = -(3 + tempoJogo / 100)
  //chão reniciando
  if(chao.x < 0){
    
    chao.x = chao.width / 2
  }
    //T-rex pulando
  if(keyDown("space") && trex.y > 161){
    trex.velocityY = - 10
    somPulo.play()
  }
  //gravidade
    trex.velocityY = trex.velocityY + 0.5
  
    gerarNuvens()
 
  gerarCactos()
    
    if(GrupoDeCactos.isTouching(trex)){
      estadoJogo = encerrar;
      somMorrendo.play()
                                      }
    
  }else if(estadoJogo == encerrar){
    
    chao.velocityX = 0
    
    GrupoDeNuvens.setVelocityXEach(0);
 GrupoDeCactos.setVelocityXEach(0);
    
 GrupoDeNuvens.setLifetimeEach(-1);
 GrupoDeCactos.setLifetimeEach(-1);
    trex.changeAnimation("colidiu",trexColidiu)
    
    trex.velocityY = 0;
    
     fimDeJogo.visible = true
    reiniciar.visible = true
  }

  trex.collide(subchao)

  if(mousePressedOver(reiniciar)){
    restart()
  }
  
  drawSprites()
}

function restart(){
  estadoJogo = jogar
  fimDeJogo.visible = false
  reiniciar.visible = false
  
tempoJogo=0
  
  GrupoDeCactos.destroyEach()
  GrupoDeNuvens.destroyEach()
  
  trex.changeAnimation("correndo",trexCorrendo)
}

function gerarNuvens(){
  
  if(frameCount % 60 == 0 ){
    
    nuvem = createSprite(600,100,50,10)
    nuvem.velocityX = -3
    
    nuvem.addAnimation("nuvem passando",imagemNuvem)
    
    nuvem.y = Math.round(random(60,100))
    
    nuvem.depth = nuvem.depth
    
    trex.depth = trex.depth + 1
    
    nuvem.scale = 0.4
    
     nuvem.lifetime = 300
    
    GrupoDeNuvens.add(nuvem);
    
  }
  
}

function gerarCactos(){
   if(frameCount % 60 == 0 ){
    
    cacto = createSprite(600,165,10,40)
    cacto.velocityX = -(3 + tempoJogo / 100)
     
   escolherCacto = Math.round(random(1,6))
     
// gerar cactos aleatoriamente aleatorios :/
     
     switch(escolherCacto){
         
       case 1 : cacto.addImage(imagemCacto1)
         break;
       case 2 : cacto.addImage(imagemCacto2)
         break;
       case 3 : cacto.addImage(imagemCacto3)
         break;
       case 4 : cacto.addImage(imagemCacto4)
         break;
       case 5 : cacto.addImage(imagemCacto5)
         break;
      case 6 : cacto.addImage(imagemCacto6)
         break;
         
    default : break;
         
     }
 cacto.scale = 0.4
     cacto.lifetime = 300;
     
     GrupoDeCactos.add(cacto);
   }
}
