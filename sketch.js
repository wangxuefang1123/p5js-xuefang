let img;
let logo;
let useCircle = true; // 初始使用圆形遮罩

let rectX = 150;
let rectY = 200;
let rectW = 500;
let rectH = 300;
let speedX = 1;
let speedY = 1;

let square1 = {
  x: 50,
  y: 80,
  size: 400,
  speedX: 1,
  speedY: 2,
};

let square2 = {
  x: 200,
  y: 150,
  size: 300,
  speedX: 2,
  speedY: 1,
};

function preload() {
  img = loadImage("./assets/texture.png");
  logo = loadImage("./assets/spaziolimine-logo.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  //上层遮盖图
  fill(255);
  noStroke();
  rect(0, 0, width, height);

  //logo
  push();
  noSmooth();
  image(logo, 10, 10, 250, 125);
  pop();

  //长方形图案
  rectX += speedX;
  rectY += speedY;

  // 碰到边界反弹
  if (rectX <= 0 || rectX + rectW >= width) {
    speedX *= -1;
  }
  if (rectY <= 0 || rectY + rectH >= height) {
    speedY *= -1;
  }

  stroke(0);
  strokeWeight(3);
  noFill();
  rect(rectX, rectY, rectW, rectH);

  //第一个正方形位置并反弹
  square1.x += square1.speedX;
  square1.y += square1.speedY;
  if (square1.x <= 0 || square1.x + square1.size >= width) {
    square1.speedX *= -1;
  }
  if (square1.y <= 0 || square1.y + square1.size >= height) {
    square1.speedY *= -1;
  }

  //第二个正方形位置并反弹
  square2.x += square2.speedX;
  square2.y += square2.speedY;
  if (square2.x <= 0 || square2.x + square2.size >= width) {
    square2.speedX *= -1;
  }
  if (square2.y <= 0 || square2.y + square2.size >= height) {
    square2.speedY *= -1;
  }

  //第一个正方形
  stroke(0);
  strokeWeight(3);
  noFill();
  rect(square1.x, square1.y, square1.size, square1.size);

  //第二个正方形
  stroke(0);
  strokeWeight(3);
  noFill();
  rect(square2.x, square2.y, square2.size, square2.size);

  push();
  beginClip();
  if (useCircle) {
    ellipse(mouseX, mouseY, 300, 300); // 圆形遮罩
  } else {
    rect(mouseX - 100, mouseY - 100, 300, 300); // 方形遮罩（中心对齐）
  }
  endClip();

  image(img, 0, 0, width, height); // 彩色遮罩区域
  pop();
}

function mousePressed() {
  useCircle = !useCircle; // 每次点击切换形状
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
