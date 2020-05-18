let img;
let friedolin;
let fluid;
let sentence = 'MAKE\nYOUR\nPATH';
//var maxDiameter;
//var pulse;


function preload() {
  myFont = loadFont('assets/BentonSansF-Bold.otf');
  bottom = loadImage('assets/images/Bottom-black.png');
  friedolin = loadImage('assets/images/top.png');
  fluid = loadImage('assets/images/fluid-gradient.png');

}

function setup() {
  createCanvas(1170, 1654);
  maxDiameter = 50;
  pulse = 0;
  pixelDensity(1);
  background(fluid);
  filter(BLUR, 0);
}

function draw() {

  //Text
  textSize(300);
  textFont(myFont);
  textStyle(BOLD);
  textLeading(350);
  text(sentence, 150, 550);
  fill('rgb(0,0,0)');
  text(sentence, 150, 550);
  fill('rgb(0,0,0)');
  fill('rgb(255,255,255)');
  stroke('rgb(0,0,0)');
  strokeWeight(1);

  //Background gradient;
 //  loadPixels();
 //
 // for (var y = 0; y < height; y++) {
 //    for (var x = 0; x < width; x++) {
 //      var index = (x + y * width) * 4;
 //      pixels[index + 0] = x;
 //      pixels[index + 1] = 0;
 //      pixels[index + 2] = y;
 //      pixels[index + 3] = 255;
 //    }
 //  }
 //
 //  updatePixels();

  if (mouseIsPressed) {
    var diam = 200 + sin(pulse) * maxDiameter;
    ellipse(mouseX, mouseY, diam, diam);
    pulse += .05;

  }

}

function keyPressed() {
  if (key == "a") {
    image(bottom, 0, 1499);
    image(friedolin, 0, 0);
    save('export.png');
  }
}
