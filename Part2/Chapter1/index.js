const canvas = document.querySelector("canvas");

const ctx = canvas.getContext("2d");
console.log(ctx);
console.log(window.devicePixelRatio); // dpr 확인

const dpr = window.devicePixelRatio;

const canvasWidth = 300;
const canvasHeight = 300;

canvas.style.width = `${canvasWidth}px`;
canvas.style.height = `${canvasHeight}px`;

canvas.width = canvasWidth * dpr;
canvas.height = canvasHeight * dpr;
ctx.scale(dpr, dpr);



class Particle {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI / 180 * 360); // 시작 반지름, 시작 각도, 종료 각도
    ctx.fillStyle = "red"
    ctx.fill();
    ctx.closePath();
  }
}

const x = 100;
const y = 100;
const radius = 50;
const particle = new Particle(x, y, radius);



function animate() {
  window.requestAnimationFrame(animate); // 매 프레임마다 실행됨 
  
  // 전체 화면을 매 프레임마다 지우고, particle을 그림
  ctx.clearRect(0, 0, canvasWidth, canvasHeight); 
  particle.draw();
}

animate();