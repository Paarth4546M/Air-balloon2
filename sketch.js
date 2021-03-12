var balloon;
var balloonImg1,balloonImg2,balloonImg3;
var backgroundImg;
var pos,database;

function preload(){
  balloonImg1 = loadImage("Hot Air Ballon-02.png")
  balloonImg2 = loadImage("Hot Air Ballon-03.png")
  balloonImg3 = loadImage("Hot Air Ballon-04.png")

  backgroundImg = loadImage("Hot Air Ballon-01.png")

  balloon_ani = loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-03.png","Hot Air Ballon-04.png")
}



function setup() {
  database = firebase.database()
  createCanvas(500,500);
 balloon = createSprite(250,250,20,20)
 balloon.addAnimation("ani",balloon_ani)

 var  balloonpos = database.ref("Balloon/position");
 balloonpos.on("value",readpos)
  text("Use Arrow Key to Control The Balloon",70,30)
}

function draw() {
  background(backgroundImg);
  if(keyDown(LEFT_ARROW)){
    writePosition(-1,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    writePosition(1,0);
  }
  else if(keyDown(UP_ARROW)){
    writePosition(0,-1);
   // balloon.scale -= 0.3
  }
  else if(keyDown(DOWN_ARROW)){
    writePosition(0,+1);
   // balloon.scale += 0.3
  }
  
drawSprites();
}
function readpos(data){

  pos = data.val();

  balloon.x = pos.x
  balloon.y = pos.y
}
function writePosition(x,y){
  database.ref("Balloon/position").set({
   "x": pos.x + x,
   "y":  pos.y + y
  })
  
}
