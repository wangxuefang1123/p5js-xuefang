let speed = 0.05;
let amplitude = 5;

/** @typedef {import("./p5").Image} Image */

/** @type {Image} */
let img_1_source;
/** @type {Image} */
let img_2_source;

/** @type {number} */
let aspectRatio;

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
  img_1_source = loadImage("./assets/cianotipia01.png");
  img_2_source = loadImage("./assets/cianotipia02.png");
  logo_1 = loadImage("./assets/spaziolimine-logo.png");
  logo_2 = loadImage("./assets/logoo.png");
  font = loadFont("./assets/FunnelDisplay-Light.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  aspectRatio = img_1_source.width / (img_1_source.height * 2);
  resizeImages();
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

  t += speed; // 控制速度，可调小一点更慢

  floatOffsets.rect1 = sin(t) * amplitude;
  floatOffsets.rect2 = sin(t + PI / 2) * amplitude;
  floatOffsets.square = sin(t + PI) * amplitude;
  floatOffsets.hex = sin(t + PI * 1.5) * amplitude;

  //上层遮盖图
  fill(255);
  noStroke();
  rect(0, 0, width, height);

  //logo
  push();
  noSmooth();
  let rapporto = 245 / 125;
  let dimensione = height / 3;
  image(logo_1, 10, 10, dimensione, dimensione / rapporto);
  pop();

  //第一个长方形
  stroke(0);
  strokeWeight(2);
  fill("white");
  rect(width / 10, height / 3 + floatOffsets.rect1, width / 3, height / 2.5);

  fill("black");
  textFont(font);
  textSize(30);
  text("SPAZIO", width / 6.5, height / 2.6 + floatOffsets.rect1);

  fill("black");
  textFont(font);
  textSize(30);
  text("LIMINE", width / 4, height / 1.4 + floatOffsets.rect1);

  //第二个长方形
  stroke(0);
  strokeWeight(2);
  fill("white");
  rect(width / 3, height / 2.5 + floatOffsets.rect2, width / 5, height / 2);

  //最后一个正方形
  stroke(0);
  strokeWeight(2);
  fill("white");
  rect((width / 4) * 3, height / 3 + floatOffsets.square, width / 4.5);

  fill("black");
  textFont(font);
  textSize(30);
  text("SPAZIO", (width / 4) * 3.5, height / 1.5 + floatOffsets.square);

  fill("black");
  textFont(font);
  textSize(30);
  text("LIMINE", (width / 4) * 3.5, height / 1.4 + floatOffsets.square);

  //正六边形
  stroke(0);
  strokeWeight(2);
  fill("white");
  drawHexagon(width / 1.65, height / 2.5 + floatOffsets.hex, height / 3.5);

  image(
    logo_2,
    width / 1.89,
    height / 4.4 + floatOffsets.hex,
    width / 6.5,
    height / 3
  );

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
  resizeImages();
}

function resizeImages() {
  img_1 = img_1_source.get();
  img_2 = img_2_source.get();

  const r = getCoverRect(aspectRatio);
  img_1.resize(0, r.h / 2);
  img_2.resize(0, r.h / 2);
}

function getCoverRect(targetAspectRatio) {
  let canvasAspect = width / height;
  let rectWidth, rectHeight;

  if (canvasAspect < targetAspectRatio) {
    // Canvas is wider: match height, crop width
    rectHeight = height;
    rectWidth = rectHeight * targetAspectRatio;
  } else {
    // Canvas is taller: match width, crop height
    rectWidth = width;
    rectHeight = rectWidth / targetAspectRatio;
  }

  let x = (width - rectWidth) / 2;
  let y = (height - rectHeight) / 2;

  return { x, y, w: rectWidth, h: rectHeight };
}
