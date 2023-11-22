import App from './App.js';

export default class Coin {
  constructor(x, y, vx) {
    this.img = document.querySelector("#coin-img");

    this.x = x;
    this.y = y;
    this.width = 50; // 코인 사이즈
    this.height = 50;

    this.frameX = 0;
    this.counter = 0;

    this.vx = vx;
  }
  update() {
    if(++this.counter % 5 === 0) {
      this.frameX = ++this.frameX % 10;
    }

    this.x += this.vx;
  }
  draw() {
    App.ctx.drawImage(
      this.img,
      this.img.width / 10 * this.frameX,
      0,
      this.img.width / 10,
      this.img.height,
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width,
      this.height
    );
  }
}