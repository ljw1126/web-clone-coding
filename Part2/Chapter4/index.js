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
    x : 0,
    y : canvasHeight / 2,
    count : 10
  })
}

const particles = [];

function confetti({x, y, count, deg, colors, shapes, spread}) {
  for(let i = 0; i < count; i++) {
    particles.push(new Particle(x, y, deg, colors, shapes, spread));
  }
}

function render() {
  let now, delta;
  let then = Date.now;

  let deg = 0;

  const frame = () => {
    requestAnimationFrame(frame);

    now = Date.now;
    delta = now - then;
    if(delta < interval) return;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight); // 리셋

    deg += 1;

    // confetti({
    //   x : 0, // 0 ~ 1
    //   y : 0, // 0 ~ 1
    //   count : 5,
    //   deg : 45,
    // })

    // confetti({
    //   x : 1, // 0 ~ 1
    //   y : 0, // 0 ~ 1
    //   count : 5,
    //   deg : 136,
    // })

    // 0.5, 0.5
    // confetti({
    //   x : Math.random(), 
    //   y : Math.random(), 
    //   count : 5,
    //   deg : 270,
    // })

    confetti({
      x : 0.5, 
      y : 0.5, 
      count : 5,
      deg : 225 + deg,
      spread : 1
    })

    confetti({
      x : 0.5, 
      y : 0.5, 
      count : 5,
      deg : 90 + deg,
      spread : 1
    })

    confetti({
      x : 0.5, 
      y : 0.5, 
      count : 5,
      deg : 315 + deg,
      spread : 1
    })

    for(let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].draw(ctx);

      if(particles[i].opacity < 0) {
        particles.splice(i, 1);
      }

      if(particles[i].y > canvasHeight) {
        particles.splice(i, 1);
      }
    }
    
    then = now - (delta % interval);
  }

  requestAnimationFrame(frame);
}

window.addEventListener("click", () => {
  confetti({
    x : 0, // 0 ~ 1
    y : 0.5, // 0 ~ 1
    count : 50,
    deg : -50,
    shapes : ['circle'],
    spread : 1
  })
});
window.addEventListener("resize", init);
window.addEventListener("load", () => {
  init();
  render();
});
