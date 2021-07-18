var balloon,balloonImage;
var database;




function preload(){
   bg =loadImage("cityImage.png");
   balloonImage=loadAnimation("hotairballoon1.png","hotairballoon2.png","hotairballoon3.png");


   
  }
function setup() {
  
  createCanvas(1500,700);

  
  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage);
  balloon.scale=0.5;

 
  database=firebase.database();
  console.log(database)
  var balloon = database.ref('hot-balloon/position');
  balloon.on("value", readPosition, showError);
}
function draw() {
  background(bg);

  fill("black");
  stroke("black");
  textFont("Freestyle Script")
  textSize(50);
  text("Use arrow keys to move the hot air balloon!",40,40);


  if(keyDown(LEFT_ARROW)){
    
    writePosition(-3,0);
  }
  else if(keyDown(RIGHT_ARROW)){
   
    writePosition(3,0);
  }
  else if(keyDown(UP_ARROW)){
   
    writePosition(0,-3);
  }
  else if(keyDown(DOWN_ARROW)){
    
    writePosition(0,+3);
  }

  
  drawSprites();

  
}

function writePosition(x,y){
  database.ref('hot balloon/position').set({
    'x': position.x + x ,
    'y': position.y + y
  })
}


function readPosition(data){
  position = data.val();
  console.log(position.x);
  balloon.x = position.x;
  balloon.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}
