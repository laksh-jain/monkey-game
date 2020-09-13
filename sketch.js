var player,playerRunning;
var score = 0;
var bananaImage,bananaGroup ; 
var obstaclesGroup, obstacleImage;
var backgroundImage,loadBackground;
var ground;
var numberCollided = 0;
var play = 1;
var end = 0;
var gameState = play;
var restartImage;
var gameOverImage;
var restart,gameOver;

function preload() {
  backgroundImage = loadImage("jungle.jpg");
playerRunning = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

  bananaImage = loadImage("banana.png");

  obstacleImage = loadImage("stone.png");

  restartImage = loadImage("restart.png");
  gameOverImage = loadImage("gameOver.png");
}
function setup(){
createCanvas(800,400);
loadBackground = createSprite(0,0,800,400);
loadBackground.addImage("ground",backgroundImage);
loadBackground.scale = 1.5;
loadBackground.velocityX = -4;
loadBackground.x = loadBackground.width/2;

player  = createSprite(100,340,100,50);
player.addAnimation("monkey",playerRunning);
player.scale = 0.1;
  
ground = createSprite(400,350,800,10);
ground.visible = false;  
 
bananaGroup = new Group();
obstaclesGroup = new Group(); 
  
gameOver = createSprite(200,50);
restart = createSprite(200,90);
gameOver.addImage(gameOverImage);
gameOver.scale = 0.5;
restart.addImage(restartImage);
restart.scale = 0.5;


}
function draw() {

background(255);
edges = createEdgeSprites();
  player.bounceOff(edges[2]);
  

if(gameState === play){
  gameOver.visible = false;
restart.visible = false;
  
  loadBackground.velocityX = -4;
if (loadBackground.x < 0) 
{
loadBackground.x = loadBackground.width/2;
}

if (keyDown("space"))
{
player.velocityY = -9;
}
player.velocityY = player.velocityY +0.3;
  
player.collide(ground);
  
  spawnBanana();
spawnObstacle();
  
  if(bananaGroup.isTouching(player)){
      score = score+2;
    bananaGroup.destroyEach();
  }
  switch(score)
    {
      case 10:player.scale = 0.12;
            break;
      case 20:player.scale = 0.14;
            break;
      case 30:player.scale = 0.16;
            break;
      case 40:player.scale = 0.18;
            break;
      case 50:player.scale = 0.20;
            break;
      case 60:player.scale = 0.22;
            break;  
      default:break; 
    }
  if (obstaclesGroup.isTouching(player)) {
    numberCollided = numberCollided + 1;
    obstaclesGroup.destroyEach();
    player.scale = 0.1;
  }
  if (numberCollided == 2) {
    gameState = end;
  }
}
  
 else if(gameState === end) {
  gameOver.visible = true;
  restart.visible = true;
   
   loadBackground.velocityX = 0;
    player.velocityY = 0;
    player.X = 400;
   player.Y = 350;
    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
  }
     
   if(mousePressedOver(restart)) {
    reset();
  }
drawSprites();
  
  stroke("white");
textSize(20);
fill("white");
text("score: "+ score, 500,50)  
  
}

function spawnBanana(){

if (frameCount%80 ==0)
{
var banana = createSprite();
banana.addImage("Banana",bananaImage);
banana.scale  =0.05;
banana.x = 400;

var rand = random(120,200);
banana.y = rand;
banana.velocityX = -7;
banana.lifetime = 100;

bananaGroup.add(banana);
}
}

function spawnObstacle(){                                                                          
if (frameCount%150 == 0) {
  
var obstacle = createSprite(400,310);
obstacle.addImage("stone",obstacleImage);
obstacle.scale  =0.3; 

obstacle.velocityX = -10;
obstacle.lifetime = 120;

obstaclesGroup.add(obstacle);
}
}
function reset() {
 gameState = play;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
 bananaGroup.destroyEach();
  
  score = 0;
  numberCollided = 0; 
}

  
