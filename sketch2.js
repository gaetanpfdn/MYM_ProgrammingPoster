var fg = 'rgb(40,94,243)';
var bg = 'rgb(255,255,255)';
let img;
let bottom;
let friedolin;
let sentence = 'MAKE\nYOUR\nMARK';

function preload() {
  myFont = loadFont('assets/BentonSansF-Bold.otf');
  bottom = loadImage('assets/images/Bottom-black.png');
  friedolin = loadImage('assets/images/friedolin-top.png');
  img = loadImage("assets/images/Harmut-Esslinger.png");

}

function setup() {
  createCanvas(1170,1654);
  background(bg);
}

function draw() {
  background(bg);
  fill(fg);
  var ratio = float(height)/float(width);
  var tilesX = map(mouseX, 0, width, 10, 60);
  var tilesY = ratio * tilesX;
  var tileSize = width / tilesX;
  for (var y = 0; y < img.height; y += tileSize) {
    for (var x = 0; x < img.width; x += tileSize) {
      var c = img.get(x, y);
      var b = map(brightness(c), 0, 255, 1, 0);
      // Open a new matrix
      push();

      // set the position
      translate(x, y);

      // Draw the tile
      rect(0, 0, b * tileSize, b * tileSize);

      // close matrix
      pop()
        } // x
  } // y
  textSize(300);
  textFont(myFont);
  textStyle(BOLD);
  textLeading(350);
  text(sentence, 150, 550);
  fill('rgb(0,0,0)');
  text(sentence, 150, 550);
  fill('rgb(0,0,0)');
  //fill('rgb(255,255,255)');
    noStroke();
} // draw()

function keyPressed() {
  if (key == "a") {
    image(bottom,0,1499);
    image(friedolin,0,0);
    save('export.png');
  }
}
//python -m SimpleHTTPServer
