var PLAY = 0;
var END = 1;
var gameState;
var ground;
var monkey, monkeyAnimation, monkeyStop;
var food, foodImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var bG, bGImage;
var score = 0;
var survivalTime = 0;
var minutes = 0;
var startTime;
var time;
var monkeyInjured = 0;

function preload() {

  
  monkeyAnimation = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");

  bGImage = loadImage("jungle.jpg");
}



function setup() {
  createCanvas(600, 600);

  monkey = createSprite(60, 540, 50, 50);
  monkey.addAnimation("monkey", monkeyAnimation);
  monkey.scale = 0.1;

  ground = createSprite(200, 570, 800, 60);
  ground.shapeColor = "green";
  ground.visible = false;

  bG = createSprite(200, 200, 50, 50);
  bG.addImage(bGImage);
  bG.velocityX = -5;
  bG.scale = 1.2;
  bG.visible = true;

  var d = new Date();
  startTime = Math.round(d.getTime() / 1000);

  foodGroup = new Group();
  obstacleGroup = new Group();

}


function draw() {
  background("black");

  var tempTime;
  
  gameState = PLAY;

  if (bG.x < 0) {
    bG.x = bG.width / 2 - 50;
  }

  
  monkeyInjuredCheck(); 
  
   if (gameState === PLAY) {
            
    monkey.velocityY = monkey.velocityY + 0.5;

    monkeyJump();
    createFood();
    createObstacle();
    addScore();
   
    eatFood();
    survivalTimeing();

    monkey.collide(ground);
    bG.depth = monkey.depth;
    bG.depth = bG.depth - 1;

  }

  if (gameState === END) {

    bG.velocityX = 0;
    foodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
          
     monkey.collide(ground);
  }
 

  drawSprites();

  
  if(gameState===PLAY){
    
    displayScore();
    
    if(monkeyInjured===1){
      textSize(10);
      
      text("Monkey is Injured.Grow in size to regain health!",100,570);
      
    }
    
  }

  
  if(gameState===END){
        
    
    fill("White");
    textSize(60);
    text("GAME OVER!",150,300);
  
  }

}

function monkeyJump() {

  if (monkey.y > 470 && keyDown("space")) {
    monkey.velocityY = -15;

  }

}

function createFood() {

  if (frameCount % 140 === 0) {

    var foodY = random(210, 360);
    food = createSprite(610, foodY, 100, 50);
    food.addImage(bananaImage);
    food.scale = 0.1;
    food.velocityX = -5;
    food.lifetime = 120;
    food.depth = monkey.depth - 1;
    foodGroup.add(food);
 }
}

function createObstacle() {

  if (frameCount % 300 === 0) {

    obstacle = createSprite(610, 500, 50, 50);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -5;
    obstacle.lifetime = 120;
    obstacle.scale = 0.2;
    obstacleGroup.add(obstacle);
   
  }

}

function survivalTimeing() {

  //var time;
  var d = new Date();
  //survivalTime=Math.ceil(frameCount/frameRate());
  //survivalTime = Math.ceil(frameCount / 50);
  time = Math.round(d.getTime() / 1000);
  survivalTime = time - startTime;

}

function displayScore(){

  stroke("black");
  textSize(20);
  fill("black");

  text("Survival Time :" + Math.floor(survivalTime / 60) + "min  " + survivalTime % 60 + "secs", 150, 50);

  text("Score :" + score, 500, 70);


}

function eatFood() {

  switch (score) {

    case 10:
      monkey.scale = 0.12;
      if (monkeyInjured > 0) {
        monkeyInjured = 0;
      }


      break;

    case 20:
      monkey.scale = 0.14;

      break;

    case 30:
      monkey.scale = 0.16;

      break;

    case 40:
      monkey.scale = 0.18;

      break;

    default:

      break;
  }

}

function addScore() {

  if (foodGroup.isTouching(monkey)) {

    score = score + 2;
    foodGroup.destroyEach();

  }

}

function monkeyInjuredCheck() {

  if (obstacleGroup.isTouching(monkey)) {
    score = score - 2;
    monkey.scale = 0.1;
    monkeyInjured = monkeyInjured + 1;
    obstacleGroup.destroyEach();
    score = 0;
  }
  if (monkeyInjured >= 2) {

    gameState = END;

  }
     console.log(monkeyInjured);
}