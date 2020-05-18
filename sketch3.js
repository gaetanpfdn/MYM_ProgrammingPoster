// Looping parts of an image
// by https://www.instagram.com/schultzschultzgrafik/ and thanks to @kevinvennitti for the help


var grid = 30;

var speed = 1;
var speedMin = 0;
var speedStep = 0.1;
var speedMax = 5;




let blocs = [];
let img;
let dragX, dragY, dragW, dragH, dragDirection;
let sentence = 'MAKE\nYOUR\nMARK';
let pixelDensity = 2;
let layerImg;
let layerUI;
let layerCursor;


function preload() {
  myFont = loadFont('assets/BentonSansF-Bold.otf');
  bottom = loadImage('assets/images/bottom.png');
  friedolin = loadImage('assets/images/friedolin-top.png');
  img = loadImage('assets/images/helmet.png');
}

function setup() {
  createCanvas(1170, 1654);
  noStroke();
  noCursor();

  layerImg = createGraphics(width * pixelDensity, height * pixelDensity);
  layerImg.image(img, 0, 0, width * pixelDensity, height * pixelDensity);
  layerUI = createGraphics(width, height);
  layerCursor = createGraphics(width, height);
  layerCursor.noStroke();
  layerCursor.fill(255, 0, 150);


}

function draw() {

  image(layerImg, 0, 0, width, height);
  for (let i in blocs) {
    blocs[i].update();
    blocs[i].draw();
  }
  textSize(150);
  textFont(myFont);
  textStyle(BOLD);
  textLeading(150);
  text(sentence, 600, 250);
  fill('rgb(255,255,255)');
  image(layerUI, 0, 0);


  layerCursor.clear();
  layerCursor.push();
  layerCursor.translate(
    closestPointOnGrid(mouseX),
    closestPointOnGrid(mouseY));
  layerCursor.rect(-10, 0, 20, 1); // —
  layerCursor.rect(0, -10, 1, 20); // |
  layerCursor.pop();

  image(layerCursor, 0, 0);
}

function Bloc(x, y, w, h, dir) {
  this.w = w;
  this.h = h;
  this.x = x;
  this.y = y;
  this.direction = dir;
  this.progress = .1;
  this.img1 = null;
  this.img2 = null;


  let imgGet1x = this.x;
  let imgGet1y = this.y;
  let imgGet1w = this.w;
  let imgGet1h = this.h;

  let imgGet2x = this.x;
  let imgGet2y = this.y;
  let imgGet2w = this.w;
  let imgGet2h = this.h;

  this.img1 = layerImg.get(
    imgGet1x * pixelDensity,
    imgGet1y * pixelDensity,
    imgGet1w * pixelDensity,
    imgGet1h * pixelDensity
  );

  this.img2 = layerImg.get(
    imgGet2x * pixelDensity,
    imgGet2y * pixelDensity,
    imgGet2w * pixelDensity,
    imgGet2h * pixelDensity
  );

  this.draw = function() {

    let img1x = this.x;
    let img1y = this.y;
    let img1w = this.w;
    let img1h = this.h;

    let img2x = this.x;
    let img2y = this.y;
    let img2w = this.w;
    let img2h = this.h;

    // De gauche à droite
    if (this.direction == 0) {
      img1w = w * this.progress / 100;
      img2x = x + w * this.progress / 100;
      img2w = w - w * this.progress / 100;
    }

    // De droite à gauche
    if (this.direction == 2) {
      img1w = w - w * this.progress / 100;
      img2x = x + w - w * this.progress / 100;
      img2w = w * this.progress / 100;
    }

    // De haut en bas
    if (this.direction == 1) {
      img1h = h * this.progress / 100;
      img2y = y + h * this.progress / 100;
      img2h = h - h * this.progress / 100;

    }

    // De bas en haut
    if (this.direction == 3) {
      img1h = h - h * this.progress / 100;
      img2y = y + h - h * this.progress / 100;
      img2h = h * this.progress / 100;

    }


    image(this.img1,
      img1x, img1y, img1w, img1h);

    image(this.img2,
      img2x, img2y, img2w, img2h);

  }

  this.update = function() {
    this.progress += speed;

    if (this.progress >= 100) {
      this.progress = .1;
    }
  }
}


function closestPointOnGrid(pos) {
  let gridPos = (round(pos / grid)) * grid;

  return gridPos;
}

function mousePressed() {


  dragX = closestPointOnGrid(mouseX);
  dragY = closestPointOnGrid(mouseY);
}

function mouseDragged() {
  dragW = closestPointOnGrid(mouseX) - dragX;
  dragH = closestPointOnGrid(mouseY) - dragY;

  let angle = degrees(atan2(mouseY - dragY, mouseX - dragX));

  if (angle >= -45 && angle <= 45) {
    dragDirection = 0; // De gauche à droite
  }

  if (angle > 45 && angle <= 135) {
    dragDirection = 1; // De haut en bas
  }

  if (angle > 135 || angle <= -135) {
    dragDirection = 2; // De droite à gauche
  }

  if (angle > -135 && angle <= -45) {
    dragDirection = 3; // De bas en haut
  }

  // On affiche le rectangle de sélection
  layerUI.clear();
  layerUI.stroke(255, 0, 255);
  layerUI.strokeWeight(1);
  layerUI.noFill();
  layerUI.rect(dragX, dragY, dragW, dragH);
}

function mouseReleased() {

  if (abs(dragW) > 0 && abs(dragH) > 0) {

    if (dragW < 0) {
      dragW = abs(dragW);
      dragX -= dragW;
    }

    if (dragH < 0) {
      dragH = abs(dragH);
      dragY -= dragH;
    }


    blocs.push(new Bloc(dragX, dragY, dragW, dragH, dragDirection));
  }

  layerUI.clear();

  dragX = dragY = dragW = dragH = dragDirection = null;

}

function keyPressed() {
  if (key == "a") {
    image(bottom,0,1499);
    image(friedolin,0,0);
    save('export.png');
  }
}
//python -m SimpleHTTPServer
