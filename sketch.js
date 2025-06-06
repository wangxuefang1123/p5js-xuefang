let img;
let poster;
let maskImage;
let m;
let useCircle = true; // 初始使用圆形遮罩

function preload() {
  img = loadImage("./assets/sitocianotipia.jpg");
  poster = loadImage("./assets/sitoposter.jpg");
}

function setup() {
  createCanvas(450, 450);
  maskImage = img.get();
}

function draw() {
  background(220);

  // 创建遮罩图层
  m = createGraphics(width, height);
  m.clear();

  if (useCircle) {
    m.ellipse(mouseX, mouseY, 200, 200); // 圆形遮罩
  } else {
    m.rect(mouseX - 100, mouseY - 100, 200, 200); // 方形遮罩（中心对齐）
  }

  // 重新应用遮罩
  maskImage = img.get();
  maskImage.mask(m);

  // 绘制图像
  image(poster, 0, 0, width, height); // 上层海报图
  image(maskImage, 0, 0, width, height); // 彩色遮罩区域
}

function mousePressed() {
  useCircle = !useCircle; // 每次点击切换形状
}
