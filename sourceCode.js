var context;
var queue;
var WIDTH = 1024;
var HEIGHT = 768;
var mouseX;
var mouseY;
var batImage;
var stage;
var animation;
var deathAnimation;
var spriteSheet;
var enemyXPos=100;
var enemyYPos=100;
var enemyXSpeed = 1.5;
var enemyYSpeed = 1.75;
var score = 0;
var scoreText;
var gameTimer;
var gameTime = 0;
var timerText;
window.onload = function()
{
function setup() {
  
  function preload() {
    id: 'backgroundimage', img = loadImage('background.png') 
    id: 'crossHair', img = loadImage('crosshair.png')
    id: 'batSpriteSheet', img = loadImage('batSpritesheet.png')
    id: 'batDeath', img = loadImage('batDeath.png')
  }
  gameTimer = setInterval(updateTime, 1000);
	}
}
function queueLoaded(event) {
  var backgroundImage = new createjs.Bitmap(queue.getResult('backgroundimage'))
  stage.addChild(backgroundImage);
  
  //Adding the score element
  scoreText = new createjs.Text("1UP:" + score.toString(), "36px Arial", "#FFF");
  scoreText.x = 10;
  scoreText.y = 10;
  stage.addChild(scoreText);
  
  //Adding the time element
  timerText = new createjs.Text("Time: " + gameTime.toString(), "36px Arial", "#FFF");
  timerText.x = 800;
  timerText.y = 10;
  stage.addChild(timerText);
  
  // Create bat spritesheet
  spriteSheet = new createjs.SpriteSheet({
    "images": [queue.getResult('batSpriteSheet')],
    "frames": {"width": 198, "height": 117},
  	"animations": { "flap": [0,4] }
  })
  
  // Create bat death spritesheet
  batDeathsSpriteSheet = new createjs.Spritesheet({
  	"images": [queue.getResult('batDeath')],
  	"frames": {"width": 198, "height": 148},
  	"animations": { "die": [0,4] }
})
	createEnemy();
  createjs.Ticker.setFPS(15);
  window.onmousedown = handleMouseDown;
}
                                         


function createEnemy()
{
  animation = new createjs.Sprite(spriteSheet, "flap");
  	animation.regX = 99;
  	animation.regY = 58;
  	animation.x = enemyXPos;
  	animation.y = enemyYPos;
  	animation.gotoAndPlay("flap");
  	stage.addChildAt(animation, 1);
  
}

function batDeath()
{
  deathAnimation = new createjs.Sprite(batDeathSpriteSheet, "diehard");
  	animation.regX = 99;
  	animation.regY = 58;
  	animation.x = enemyXPos;
  	animation.y = enemyYPos;
  	animation.gotoAndPlay("diehard");
  	stage.addChildAt(animation, 1);
  
  
}
function tickEvent()
{
 if(enemyXPos < WIDTH && enemyXPos > 0)
 {
	enemyXPos += enemyXSpeed;
 } else
 {
   enemyXSpeed = enemyXSpeed * (-1);
   enemyXPos += enemyXSpeed;
 }
  if(enemyYPos < HEIGHT && enemyYPos > 0)
  {
    enemyYPos += enemyYSpeed;
  } else
  {
    enemyYSpeed = enemyXSpeed * (-1);
    enemyYPos += enemyYSpeed;
  }
  animation.x = enemyXPos;
  animation.y = enemyYPos;
}

function handleMouseDown(event)
{
  	//For displaying crosshair
  	crossHair = new createjs.Bitmap(queue.getResult("crossHair"));
  	crossHair.x = event.clientX - 45;
  	crossHair.y = event.clientY - 45;
  	stage.addChild(crossHair);
  	createjs.Tween.get(crossHair).to({alpha: 0}, 1000);
  
  	enemyXSpeed *= 1.05;
  	enemyYSpeed *= 1.06;
  
  	var shotX = Math.round(event.clientX);
  	var shotY = Math.round(event.clientY);
  	var spriteX = Math.round(animation.x);
  	var spriteY = Math.round(animation.y);
  
  	var distX = Math.abs(shotX-spriteX);
  	var distY = Math.abs(shotY-spriteY);

  	if(distX < 30 && distY < 59)
    {
      stage.removeChild(animation);
      batDeath();
      score += 100;
      scoreText.text = "1UP: " + score.toString();
      
      enemyYSpeed *= 1.25;
      enemyXSpeed *= 1.3;
      var timeToCreate = Math.floor((Math.random()*3500)+1);
      setTimeout(createEnemy, timeToCreate);
    }else
    {
      score -= 10;
      scoreText.text = "1UP: " + score.toString();
    }
}
// Create one second interval timer
$(function() {
  var test = $('#test'); 
  setInterval(function() {
    test.text(1 + (+test.text())); 
  }, 1000);
});

function updateTime()
{
  gameTime += 1;
  if(gameTime > 60)
  {
    timerText.text = "GAME OVER";
    stage.removeChild(animation);
    stage.removeChild(crossHair);
    clearInterval(gameTimer);
  }
  else
  {
    timerText.text = "Time: " + gameTimer
    
  }
}





























































































































































