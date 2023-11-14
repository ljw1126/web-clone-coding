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

ctx.fillRect(10, 10, 50, 50);