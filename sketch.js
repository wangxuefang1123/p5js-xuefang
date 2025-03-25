function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  const s = 100;

  rect(0, 0, s, s);
  rect(0, height - s, s, s);
  rect(width - s, 0, s, s);
  rect(width - s, height - s, s, s);

  text("Wang Xuefang", width / 2, height / 2);
  textAlign("center");
  textSize(60);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
