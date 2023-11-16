const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const dpr = window.devicePixelRatio;
let canvasWidth = innerWidth;
let canvasHeight = innerHeight;

function init() {
  canvasWidth = innerWidth;
  canvasHeight = innerHeight;
  canvas.style.width = `${canvasWidth}px`;
  canvas.style.height = `${canvasHeight}px`;
  canvas.width = canvasWidth * dpr;
  canvas.height = canvasHeight * dpr;
  ctx.scale(dpr, dpr);
}

const fps = 1;
const interval = 1000 / fps;

function render() {
  let now, delta;
  let then = Date.now();
  
  const frame = () => {
    requestAnimationFrame(frame);
    
    now = Date.now();
    delta = now - then
    if(delta < interval) return;
    
    console.log(1);
    then = now - (delta % interval);
  };  
  
  requestAnimationFrame(frame);
}

window.addEventListener("load", () => {
  init();
  render();
});

window.addEventListener("resize", () => {
  render();
})

