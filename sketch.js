var END = 0
var PLAY = 1
var gameState = PLAY


var monkey , monkey_running, monkeystop;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0
var ground;
var survivaltime = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  monkeystop = loadImage("sprite_3.png")
 
}



function setup() {
  createCanvas(600,600)
  
  monkey = createSprite(70,550,30,30)
  monkey.addAnimation("running", monkey_running)
  monkey.scale = 0.1 
  
  ground = createSprite(300,600,600,30)
  ground.shapeColor = "brown"
  
  obstacleGroup = new Group();
  FoodGroup = new Group();
}


function draw() {
background("white")
  
stroke("black")
  textSize(20);
  fill("black");
  text("survival time: " + survivaltime,200,80)
 
  monkey.debug=true
  monkey.setCollider("circle",0,0,250) 

  
  if(gameState === PLAY){
  if(keyDown("space")&& monkey.y > 554){
    monkey.velocityY = -12
    
    
  
  }
  monkey.velocityY = monkey.velocityY + 0.5
  
 if(frameCount %10  === 0){
    survivaltime = survivaltime + 1
  }
  spawnobstacle();
  spawnbanana();
    
    if(obstacleGroup.isTouching(monkey)){
    gameState = END
      
  }
  }
  
  if(gameState === END){
    obstacleGroup.setVelocityXEach(0)
    FoodGroup.setVelocityXEach(0)
    
    monkey.velocityY=0;
    monkey.velocityX=0;
    obstacleGroup.setLifetimeEach(-1)
   
   
  }
  
  monkey.collide(ground)
  drawSprites();
  text("Score: " + score, 200,100)
 if (monkey.isTouching(FoodGroup)){
     score = score + 1; 
   FoodGroup.destroyEach();
   
     }
  
}

function spawnbanana() {
  if(frameCount %80 === 0){
    banana = createSprite(600,400,30,30)
    banana.addImage(bananaImage)
    banana.velocityX = -8
    banana.y = Math.round(random(350,450))
    banana.scale = 0.1
    FoodGroup.add(banana)
    banana.lifetime = 300
  }
}

 function spawnobstacle(){
   if(frameCount %100 === 0){
     obstacle = createSprite(600,560,30,30)
     obstacle.addImage(obstacleImage)
     obstacle.velocityX = -8
     obstacle.scale = 0.2
     obstacleGroup.add(obstacle)
     obstacle.lifetime = 300
   }
   
 }


