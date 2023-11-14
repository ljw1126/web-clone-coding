const canvas = document.querySelector("canvas");

const ctx = canvas.getContext("2d");
console.log(ctx);
console.log(window.devicePixelRatio); // dpr 확인

const dpr = window.devicePixelRatio;
let canvasWidth, canvasHeight;
let particles;
let TOTAL;

function init() {
  canvasWidth = innerWidth;
  canvasHeight = innerHeight;
  
  canvas.style.width = `${canvasWidth}px`;
  canvas.style.height = `${canvasHeight}px`;
  
  canvas.width = canvasWidth * dpr;
  canvas.height = canvasHeight * dpr;
  ctx.scale(dpr, dpr);

  particles = [];
  TOTAL = canvasWidth / 10;
  for(let i = 0; i < TOTAL; i++) {
    const x = randomNumBetween(0, canvasWidth);
    const y = randomNumBetween(0, canvasHeight);
    const radius = randomNumBetween(50, 100);
    const vy = randomNumBetween(1, 5);

    const particle = new Particle(x, y, radius, vy);
    particles.push(particle);
  }  
}

// dot.GUT 설정
const feGaussianBlur = document.querySelector("feGaussianBlur");
const feColorMatrix = document.querySelector("feColorMatrix");

const controls = new function() {
  this.blurValue = 40
  this.alphaChannel = 100
  this.alphaOffset = -23
  this.acc = 1.03
}

let gui = new dat.GUI();

const f1 = gui.addFolder("gooey effect");
// 블러                      최소, 최대 값 
f1.add(controls, 'blurValue', 0, 100).onChange(value => {
  feGaussianBlur.setAttribute("stdDeviation", value);
}) 

// 대비
f1.add(controls, "alphaChannel", 1, 200).onChange(value => {
  feColorMatrix.setAttribute('values', `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${value} ${controls.alphaOffset}`);
});

f1.add(controls, "alphaOffset", -40, 40).onChange(value => {
  feColorMatrix.setAttribute('values', `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${controls.alphaChannel} ${value}`);
});

const f2 = gui.addFolder("particle property");
// 가속도
f2.add(controls, "acc", 1, 1.5, 0.01).onChange(value => {
  particles.forEach(particle => particle.acc = value);
});

f1.open();
f2.open();


class Particle {
  constructor(x, y, radius, vy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.vy = vy; // y 변속도
    this.acc = 1.03; // 가속도, 1미만 값을 곱하면 0으로 수렴해서 멈추게 됨
  }
  update() {
    this.vy *= this.acc;
    this.y += this.vy;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI / 180 * 360); // 시작 반지름, 시작 각도, 종료 각도
    ctx.fillStyle = "orange"
    ctx.fill();
    ctx.closePath();
  }
}

const x = 100;
const y = 100;
const radius = 50;
const particle = new Particle(x, y, radius);

const randomNumBetween = (min, max) => {
  return Math.random() * (max - min + 1) + min;
};


let interval = 1000 / 60; 
let now, delta;
let then = Date.now();

function animate() {
  window.requestAnimationFrame(animate); // 매 프레임마다 실행됨 
  now = Date.now();
  delta = now - then;

  if(delta < interval) return;

  // 전체 화면을 매 프레임마다 지우고, particle을 그림
  ctx.clearRect(0, 0, canvasWidth, canvasHeight); 
 
  particles.forEach(particle => {
    particle.update();
    particle.draw();

    if(particle.y - particle.radius > canvasHeight) {
      particle.y = -particle.radius;
      particle.x = randomNumBetween(0, canvasWidth);
      particle.radius = randomNumBetween(50, 100);
      particle.vy = randomNumBetween(1, 5);
    }
  });

  then = now - (delta % interval);
}

window.addEventListener("load", () => {
  init();
  animate();
})

window.addEventListener("resize", () => {
  init();
})