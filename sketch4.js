const canvasWidth = 1170;
const canvasHeight= 1654;
const grSize = canvasWidth;
let bottom;
let friedolin;
let img;

function setup() {
  font = loadFont('assets/BentonSansF-Bold.otf');
  bottom = loadImage('assets/images/bottom.png');
  friedolin = loadImage('assets/images/friedolin-top.png');
  img = loadImage('assets/images/texture.png');
  createCanvas(canvasWidth ,canvasHeight);
  frameRate(30);
  pg = createGraphics(grSize, grSize);
}

function draw() {
  background(img);
  pg.background(0,0);
  pg.fill(255);
  pg.textFont(font);
  pg.textSize(350);
  pg.push();
  pg.translate(grSize/2, grSize/2);
  pg.textAlign(CENTER, CENTER);
  pg.textLeading(250);
  pg.text("Make \n Your\n Mark", -canvasWidth/50, canvasWidth/5.25);
  pg.pop();

  let tilesX = 50;
  let tilesY = 8;

  let tileW = int(width/tilesX);
  let tileH = int(height/tilesY);

  for (let y = 0; y < tilesY; y++) {
    for (let x = 0; x < tilesX; x++) {

      // WARP
      let wave = int(sin(frameCount * 0.05 + ( x * y ) * 0.04) * mouseX/20);
      //wave = 0;
      // SOURCE
      let sx = x*tileW + wave;
      let sy = y*tileH + wave*1.25;
      let sw = tileW;
      let sh = tileH;


      // DESTINATION
      let dx = x*tileW;
      let dy = y*tileH;
      let dw = tileW;
      let dh = tileH;

      copy(pg, sx, sy, sw, sh, dx, dy, dw, dh);

    }
  }
}


// let font;
// let pg;
// let bottom;
// let friedolin;
//
// function setup() {
//   font = loadFont('assets/BentonSansF-Bold.otf');
//   bottom = loadImage('assets/images/Bottom-black.png');
//   friedolin = loadImage('assets/images/friedolin-top.png');
//   createCanvas(1170, 1654, P2D);
//   pg = createGraphics(1170, 1654, P2D);
// }
//
// function draw() {
//
//   // PGraphics
//
//   pg.background(0);
//   pg.fill(255);
//   pg.textFont(font);
//   pg.textSize(300);
//   pg.push();
//   pg.translate(width/2, height/2-100);
//   pg.textAlign(CENTER, CENTER);
//   pg.text("MAKE\n YOUR\n MARK", 0, 0);
//   pg.textLeading(10);
//   pg.pop();
//
//   var tilesX = 16;
//   var tilesY = 16;
//
//   var tileW = int(width/tilesX);
//   var tileH = int(height/tilesY);
//
//   for ( y = 0; y < tilesY; y++) {
//     for ( x = 0; x < tilesX; x++) {
//
//       // WARP
//       var wave = int(sin(frameCount * 0.05 + ( x * y ) * 0.07) * mouseX/3);
//
//       // SOURCE
//       var sx = x*tileW + wave;
//       var sy = y*tileH;
//       var sw = tileW;
//       var sh = tileH;
//
//
//       // DESTINATION
//       var dx = x*tileW;
//       var dy = y*tileH;
//       var dw = tileW;
//       var dh = tileH;
//
//       copy(pg, sx, sy, sw, sh, dx, dy, dw, dh);
//
//     }
//   }
// }
function keyPressed() {
  if (key == "a") {
    image(bottom,0,1499);
    image(friedolin,0,0);
    save('export.png');
  }
}
