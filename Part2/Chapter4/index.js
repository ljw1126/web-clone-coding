import Particle from './js/Particle.js';

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const dpr = window.devicePixelRatio > 1 ? 2 : 1;
let canvasWidth = innerWidth;
let canvasHeight = innerHeight;
const interval = 1000 / 50;

function init() {
  canvasWidth = innerWidth;
  canvasHeight = innerHeight;
  canvas.style.width = `${canvasWidth}px`;
  canvas.style.height = `${canvasHeight}px`;
  canvas.width = canvasWidth * dpr;
  canvas.height = canvasHeight * dpr;
  ctx.scale(dpr, dpr);

  confetti({
    x : canvasWidth / 2,
    y : canvasHeight / 2,
    count : 10
  })
}

const particles = [];

function confetti({x, y, count, deg}) {
  for(let i = 0; i < count; i++) {
    particles.push(new Particle(x, y, deg));
  }
}

function render() {
  let now, delta;
  let then = Date.now;

  let x = innerWidth / 2;
  let y = innerHeight / 2;
  let widthAlpha = 0;
  const width = 50;
  const height = 50;
  let deg = 0.1;

  const frame = () => {
    requestAnimationFrame(frame);

    now = Date.now;
    delta = now - then;
    if(delta < interval) return;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight); // 리셋

    for(let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].draw(ctx);
    }

    then = now - (delta % interval);
  }

  requestAnimationFrame(frame);
}

window.addEventListener("click", () => {
  confetti({
    x : 0,
    y : canvasHeight / 2,
    count : 10,
    deg : -50
  })
});
window.addEventListener("resize", init);
window.addEventListener("load", () => {
  init();
  render();
});
