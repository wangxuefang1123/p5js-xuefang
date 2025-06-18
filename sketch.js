/** @typedef {import("./p5").Image} Image */

/** @type {Image} */
let img_1;
/** @type {Image} */
let img_2;

let logo_1;
let logo_2;
let useCircle = true; // 初始使用圆形遮罩
let font;

let t = 0; // 时间参数

let floatOffsets = {
  rect1: 0,
  rect2: 0,
  square: 0,
  hex: 0,
};

let maskSize = 220;
let targetMaskSize = 220;

function preload() {
  img_1 = loadImage("./assets/cianotipia01.png");
  img_2 = loadImage("./assets/cianotipia02.png");
  logo_1 = loadImage("./assets/spaziolimine-logo.png");
  logo_2 = loadImage("./assets/logoo.png");
  font = loadFont("./assets/FunnelDisplay-Light.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  img_1.resize(width, 0);
  img_2.resize(width, 0);
}

// 画六边形
function drawHexagon(x, y, r) {
  beginShape();
  for (let i = 0; i < 6; i++) {
    let angle = (TWO_PI / 6) * i - PI / 6;
    let vx = x + cos(angle) * r;
    let vy = y + sin(angle) * r;
    vertex(vx, vy);
  }
  endShape(CLOSE);
}

function draw() {
  background(220);

  t += 0.03; // 控制速度，可调小一点更慢

  floatOffsets.rect1 = sin(t) * 5;
  floatOffsets.rect2 = sin(t + PI / 2) * 5;
  floatOffsets.square = sin(t + PI) * 5;
  floatOffsets.hex = sin(t + PI * 1.5) * 5;

  //上层遮盖图
  fill(255);
  noStroke();
  rect(0, 0, width, height);

  //logo
  push();
  noSmooth();
  image(logo_1, 10, 10, 250, 125);
  pop();

  //第一个长方形
  stroke(0);
  strokeWeight(2);
  fill("white");
  rect(150, 200 + floatOffsets.rect1, 450, 300);

  fill("black");
  textFont(font);
  textSize(30);
  text("SPAZIO", 165, 240 + floatOffsets.rect1);

  fill("black");
  textFont(font);
  textSize(30);
  text("LIMINE", 385, 480 + floatOffsets.rect1);

  //第二个长方形
  stroke(0);
  strokeWeight(2);
  fill("white");
  rect(500, 300 + floatOffsets.rect2, 270, 320);

  //最后一个正方形
  stroke(0);
  strokeWeight(2);
  fill("white");
  rect(950, 250 + floatOffsets.square, 320);

  fill("black");
  textFont(font);
  textSize(30);
  text("SPAZIO", 1150, 520 + floatOffsets.square);

  fill("black");
  textFont(font);
  textSize(30);
  text("LIMINE", 1150, 550 + floatOffsets.square);

  //正六边形
  stroke(0);
  strokeWeight(2);
  fill("white");
  drawHexagon(850, 250 + floatOffsets.hex, 200);

  image(logo_2, 740, 130 + floatOffsets.hex, 220, 250);

  targetMaskSize = mouseIsPressed ? 350 : 220; // 按下变大，松开变回
  maskSize = lerp(maskSize, targetMaskSize, 0.1); // 平滑过渡

  push();
  beginClip();
  if (useCircle) {
    ellipse(mouseX, mouseY, maskSize, maskSize); // 圆形遮罩
  } else {
    rect(mouseX - maskSize / 2, mouseY - maskSize / 2, maskSize, maskSize); // 方形遮罩（中心对齐）
  }
  endClip();

  image(img_1, 0, height / 2); // 彩色遮罩区域
  image(img_2, 0, height / 2 - img_2.height);
  pop();
}

function mousePressed() {
  useCircle = !useCircle; // 每次点击切换形状
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
