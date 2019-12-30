let s;
let scl = 15;

function setup() {
  createCanvas(windowWidth, windowHeight);
  s = new Snake();
  f = new food()
  f.getLocation();
  f.show();
  s.init();
  frameRate(20);
}


function draw() {
  background(25);
  f.show();
  s.update();
  s.show();
  s.death();
  if(dist(s.body[0].x, s.body[0].y, f.pos.x, f.pos.y) < 1){
    s.eat();
    f.getLocation();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function food(){
  this.getLocation = function(){
    this.pos = createVector(floor(random(floor(width / scl))) * scl, floor(random(floor(height / scl))) * scl)
  };
  this.show = function(){
    fill(1,255,0);
    rect(this.pos.x, this.pos.y, scl, scl)
  };
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    s.dir(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    s.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    s.dir(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    s.dir(-1, 0);
  }
}

function Snake() {
  this.init = function(){
    this.pos = createVector(floor(random(floor(width / scl))) * scl, floor(random(floor(height / scl))) * scl);
    this.velX = 0;
    this.velY = 0;
    this.length = 0;
    this.body = [];
    this.body[0] = this.pos;
  };

  this.dir = function(x,y){
    this.velX = x;
    this.velY = y;
  };

  this.death = function(){
    var x = this.body[this.body.length-1].x
    var y = this.body[this.body.length-1].y

    for(var i=0; i<this.body.length-1; i++){
      if(this.body[i].x == x && this.body[i].y == y){
        this.init()
      }
    }



    if (this.body[this.body.length-1].x > width || this.body[this.body.length-1].x < 0){
      this.init();
    }
    if (this.body[this.body.length-1].y > height || this.body[this.body.length-1].y < 0){
      this.init();
    }
  };

  this.update = function() {
    let head = this.body[this.body.length-1].copy();
    this.body.shift();
    head.x += this.velX * scl;
    head.y += this.velY * scl;
    this.body.push(head)

  };

  this.eat = function(){
    let head = this.body[this.body.length-1].copy();
    this.body.push(head);
  };

  this.show = function() {
    for(var i = 0; i<this.body.length; i++){
      fill(255);
      rect(this.body[i].x, this.body[i].y, scl, scl);
    }
  };
}
