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
}

function render() {
  let now, delta;
  let then = Date.now;

  const frame = () => {
    requestAnimationFrame(frame);

    now = Date.now;
    delta = now - then;
    if(delta < interval) return;

    // 애니메이션 동작
    ctx.fillStyle = 'red';
    ctx.fillRect(200, 200, 50, 50);

    then = now - (delta % interval);
  }

  requestAnimationFrame(frame);
}

window.addEventListener("resize", init);
window.addEventListener("load", () => {
  init();
  render();
});
