//first slide of the game
var  titleIMG, startbuttonIMG, bgIMG
//second slide
var storyIMG
//third

//game
var gunIMG, cameraIMG, background1
var START = 0
var PLAY = 1
var MIDDLE = 2
var END = 3
var gameState = START
var gunpos, gun1, gunIMG2, gunIMG3, gunIMG4
var road1IMG, road1, roadIMG2, road2
var startbIMG1


//middle
var dronef
var bulletIMG, bulletlIMG
//var bullet2;
//var story


const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

function preload(){
	//first slide
	bgIMG = loadImage("yb.jpg");
	startbuttonIMG = loadImage("start.png");
	titleIMG = loadImage("title.png");
	
	//second slide
	storyIMG = loadImage("story.png");

//	gunIMG = loadImage("gun.png");

	gunpos = loadImage("gunpos.png");

	road1IMG = loadImage("city1.jpg");

	gunIMG2 = loadImage("gun2.png");

	gunIMG3 = loadImage("gunback.png")

	gunIMG4 = loadImage("gunback1.png");

	roadIMG2 = loadImage("city2.png");

	dronef = loadImage("dronef.png");

	bulletIMG = loadImage("bullet.png");

	bulletlIMG = loadImage("bulletl.png")

	startbIMG1 = loadImage("startb.png");

	

	}

function setup() {
	createCanvas(1700,900);


	engine = Engine.create();
	world = engine.world;

	
//first slide of the game
	bg = createSprite(800,550,500,800);
	bg.addImage(bgIMG);
	bg.scale = 0.5
	bg.visible = true;

	startbutton = createSprite(750,600,120,50);
	startbutton.addImage(startbuttonIMG);
	startbutton.scale = 0.5
	startbutton.visible = true;

	title = createSprite(850,180,50,50);
	title.addImage(titleIMG);
	title.scale = 0.5
	title.visible = true

	//second slide
	story = createSprite(700,450,1400,700);
	story.addImage(storyIMG);
	story.scale = 1.5;
	story.visible = false

	//game
	

	background1 = createSprite(1500,500,1700,800);
	background1.shapeColor = "blue";
	background1.scale = 50;
	background1.visible = false;

	road1 = createSprite(850,400,1700,900);
	road1.addImage(road1IMG);
	road1.scale = 2.0
	road1.visible = false;

	road2 = createSprite(900,400,1700,900);
	road2.scale = 2.5;
	road2.addImage(roadIMG2);
	road2.visible = false;


	gun1 = createSprite(130,810,50,50);
	gun1.addImage(gunpos);
	gun1.scale = 0.10;
	gun1.visible = false;

	startm = createSprite(800,500,100,100);
	startm.scale = 0.9;
	startm.addImage(startbIMG1);
	startm.visible = false;

	

	//gamestate3

	dronefr = createSprite(900,400,25,25);
	dronefr.addImage(dronef);
	dronefr.scale = 0.3;
	dronefr.visible = false;

	bullet2 = createSprite(gun1.x + 50  , gun1.y +10 ,25,25)
	bullet2.addImage(bulletlIMG);
	bullet2.scale = 4;
	bullet2.visible = false;
	

	

	
	
	
   Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background("black");
  Engine.update(engine);

  
  
  
   if(gameState === "START"){
	startbutton.visible = true;
	bg.visible = true;
	title.visible = true;

	
}

if(gameState === PLAY){
	
	gun1.visible = true;
	road1 .visible = true;
	startm.visible = true;
	
	
	if(mousePressedOver(startm)){
		gameState = MIDDLE;
	}
	//fire1.visible = true;
	
	
}

if(gameState === MIDDLE){
	road1.visible = false;
	road2.visible = true;
	gun1.visible = true;
	dronefr.visible = true;
	startm.visible = false;
	bullet2.visible = true;
	

	dronefr.y = gun1.y - 400;
	

	gun1.addImage(gunIMG2);
	gun1.x = 870;
	gun1.scale = 0.12

	camera.x = World.mouseX
	camera.y= World.mouseY;

	


	

	

	

	spawnBullet();
	spawnBullet2();

	
	
}







//console.log(gameState === START)
//console.log(gun1.y);
//console.log(gameState === PLAY);
 // startbutton.display();
  
  drawSprites();
  
 

}

function keyPressed(){
	if(gameState === START && keyCode === RIGHT_ARROW){
		startbutton.visible = false;
		bg.visible = false;
		title.visible = false;
		story.visible = true;
		gun1.visible = false;
		//gameState = PLAY;
		
	}
	if(gameState === START && keyCode === DOWN_ARROW){
		story.visible = false;
		gameState = PLAY
	}
	if(gameState === PLAY && keyCode === 087){
		gun1.x = gun1.x +50;
		gun1.addImage(gunpos)
		
		console.log("w pressed");
	}
	if(gameState === PLAY && keyCode === 65){
		gun1.addImage(gunIMG2);
		gun1.y = gun1.y -15

}
if(gameState === PLAY && keyCode === 83){
	gun1.addImage(gunIMG4)
	gun1.y = gun1.y +15;

}
if(gameState === MIDDLE && keyCode === 087){
	gun1.velocityY= -5;
	gun1.addImage(gunpos)
	
	//console.log("w pressed");
}
if(gameState === MIDDLE && keyCode === 83){
gun1.addImage(gunIMG4)
gun1.velocityY = 5;

}
if(gameState === MIDDLE && keyCode === 065){
gun1.velocityX = 5;
gun1.addImage(gunIMG3);
//console.log("a pressed");
}
if(gameState === MIDDLE && keyCode === 88 && gun1.addImage(gunIMG2)){
	bullet2.velocityY = random(-1,3)
	bullet2.velocityX = 5;

}
if(gameState === MIDDLE && keyCode === 081){
	bullet2.velocityY = 5;
}




}

function spawnBullet(){
	if(frameCount % 100 === 0){
		var bullets = createSprite(dronefr.x +3, dronefr.y +46, 10,10)
		bullets.addImage(bulletIMG);
		bullets.scale = 0.05;
		bullets.velocityY = random(5,3);
		bullets.velocityX = random(-1,3);
		bullets.lifetime = 200;

	}
}
function spawnBullet2(){
	if(bullet2.y < 0){
		 bullet2 = createSprite(700, gun1.y -10,25,25)
	}
	bullet2.addImage(bulletlIMG);
	bullet2.scale = 0.4
	bullet2.visible = true;
		

	
			
	

	
	
}

function isTouching(Object1, Object2){
    if (Object1.x - Object2.x < Object2.width/2 + Object1.width/2
      && Object2.x - Object1.x < Object2.width/2 + Object1.width/2
      &&Object1.y - Object2.y < Object2.height/2 + Object1.height/2
      && Object2.y - Object1.y < Object2.height/2 + Object1.height/2) {
      
    
  return true;
    
  }
  else return false;
  }

  

