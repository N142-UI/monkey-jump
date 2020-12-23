var PLAY = 1;
var END = 0;
var gameState = PLAY;


var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkeyImg=loadAnimation("sprite_0.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
  FoodGroup= new Group();
 obstacleGroup= new Group();
  
}



function setup() {
  
   createCanvas(600, 400);
  
  monkey = createSprite(70,250,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale =0.2;
  
  
  ground = createSprite(200,310,1200,5);
  ground.x = ground.width/2;
  ground.velocityX = -5
  
  invisibleGround = createSprite(200,315,400,5);
  invisibleGround.visible = false;
  
  var score=0
}


function draw() {
  background(255);
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
   
    if(monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach();
       score=score+1
      }

  
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  Obstacle();
  banana();
  
  monkey.collide(invisibleGround);
  
   if(keyDown("space") && monkey.y >= 180) {
      monkey.velocityY = -12;
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
    
    if(obstacleGroup.isTouching(monkey)){
        gameState = END;
    }
  }
    else if(gameState === END){
     
    background("white")  
    textSize(50);  
    text("GAME OVER", 170,200);
    textSize(20);  
    text("Press A to reset", 250,300);
      
     monkey.addAnimation("running", monkeyImg);     
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0); 
    FoodGroup.setLifetimeEach(-1); 
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();    
      
     if(keyDown("A")){
       reset()
     }
}
  

  drawSprites();
}
function banana() {
  
  if (frameCount % 180 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(120,150));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
    FoodGroup.add(banana);
    
    banana.lifetime = 200;

  }
   
}



function Obstacle() {
 if(frameCount % 100 ===0) {
    var obstacle = createSprite(600,290,10,40);  
    obstacle.velocityX = -( 5+ 3*score/100);
    obstacle.scale=0.1
   
     obstacleGroup.add(obstacle);
   
  var rand = Math.round(random(1,1));
    switch(rand) {
      case 1: obstacle.addImage(obstaceImage);
               break;
      default: break;
      
    }
 }
}
function reset(){
  gameState = PLAY;
  monkey.addAnimation("running", monkey_running)
  obstacleGroup.destroyEach();
  FoodGroup.destroyEach(); 
  score = 0;
  
}







