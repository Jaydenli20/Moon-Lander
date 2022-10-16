let ground;
let lander;
var lander_img;
var bg_img;
var fuel = 100
var obstacle_img, lz, lz_img, obstacle


var vx = 0;
var g = 0.05;
var vy = 0;

function preload()
{
  

  lander_img = loadImage("normal.png");
  bg_img = loadImage("bg.png");

  thrust = loadAnimation("b_thrust_1.png","b_thrust_2.png","b_thrust_3.png")

  crash = loadAnimation("crash1.png","crash2.png","crash3.png")
  land = loadAnimation("landing1.png","landing2.png","landing_3.png")
  leftThruster = loadAnimation("left_thruster_1.png","left_thruster_2.png")
  rightThruster = loadAnimation("right_thruster_1.png","right_thruster_2.png")
  normal = loadAnimation("normal.png ")
  obstacle_img = loadImage("obstacle.png")
  lz_img =loadImage("lz.png")
  trhust.playing = true
  thrust.looping = false;
  land.looping = false;
  crash.looping = false;
  rightThruster.looping =false
  leftThruster.looping = false
}

function setup() {
  createCanvas(1000,700);
  frameRate(80);
  timer = 1500
  thrust.frameDelay = 5;
  land.frameDelay = 5;
  crash.frameDelay = 10;
  leftThruster.frameDelay = 5;
  rightThruster.frameDelay = 5;
  

  lander = createSprite(100,50,30,30);
  lander.addImage(lander_img);
  lander.scale = 0.1;
  lander.setCollider("rectangle", 0,0,200,200)
  //lander.debug =true;
  lander.addAnimation("thrusting", thrust)
  lander.addAnimation("left_thrusting", leftThruster)
  lander.addAnimation("right_thrusting", rightThruster)
  lander.addAnimation("normal",normal)
  lander.addAnimation("crashing",crash)
  lander.addAnimation("landing",land)

  obstacle = createSprite(320,530,50,100)
  obstacle.addImage(obstacle_img)
  obstacle.scale = 0.5
  obstacle.setCollider("rectangle",0,100,300,300)

  ground = createSprite(500,690,1000,20)
  lz=createSprite(880,160,50,30)
  lz.addImage("lz",lz_img)
  lz.scale = 0.3;
  lz.setCollider("rectangle",0,100,480,100)
  //lz.debug = true

  //lander.addAnimation("thrust")
  rectMode(CENTER);
  textSize(15);
}

function draw() 
{

  background(51);
  image(bg_img,0,0);
  push()
  fill(255);
  text("Vertical Velocity: "+round(vy),800,75);
  text("Horizantol Velocity: "+round(vx,2),800,50)
  text("Fuel: "+fuel,800, 25)
  pop();

  //fall down
  vy +=g;
  lander.position.y+=vy;
  lander.position.x+=vx;

  if(lander.collide(obstacle)===true){
    lander.changeAnimation("crashing")
    stop()
  }
  if(lander.collide(ground)===true){
    lander.changeAnimation("crashing")
    vx=0;
    vy=0
    g=0;
  }
  var d = dist(lander.position.x,lander.position.y,lz.position.x,lz.position.y)
  //console.log(d)
  if(d<=35 && (vy < 2 && vy >- 2) && (vx<2 && vx>-2)){
    lander.changeAnimation("landing")
    //console.log("LANDED")
    vx=0;
    vy=0;
    g=0;
  }



  drawSprites();
}

function keyPressed(){
  //right arrow
  if(keyCode=== RIGHT_ARROW && fuel>0){
    lander.changeAnimation("left_thrusting")
    vx += 0.2;
    fuel -= 1; 
  }
  //left arrow
  if(keyCode=== LEFT_ARROW && fuel>0){
    lander.changeAnimation("right_thrusting")
    vx -= 0.2;
    fuel -= 1; 
  }
  //up arrow
  if(keyCode=== UP_ARROW && fuel>0){
    lander.changeAnimation("thrusting")
    vy = -1;
    fuel -= 1; 
  }

}
function stop(){
  vy=0;
  vx=0;
  fuel=0;
  g=0;
}


