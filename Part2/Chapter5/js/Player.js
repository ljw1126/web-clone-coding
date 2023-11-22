import App from './App.js';

export default class Player {
  constructor() {
    this.img = document.querySelector("#bird-img");
    this.x = App.width * 0.1;
    this.y = App.height * 0.5;
    this.width = 130; // pixel
    this.height = this.width * (96 / 140); // 2096 / 15개 = 140pixel 정도

    this.frameX = 0;
    this.sx = this.img.width / 15;
    this.sy = 0 
    this.sw = this.img.width / 15;
    this.sh = this.img.height;

    this.counter = 0;

    this.vy = -10; // 시작 위치
    this.gravity = 0.3; // 중력
    App.canvas.addEventListener("click", () => {
        this.vy += -5; // 위로
    });
  }
  update() {
    this.counter += 1;
    if(this.counter % 2 === 0) {
      this.frameX = (++this.frameX % 15);
    }

    this.vy += this.gravity;
    this.y += this.vy;
  }
  draw() {
    App.ctx.drawImage(
      this.img,
      this.sx * this.frameX,
      this.sy,
      this.sw,
      this.sh,
      this.x, 
      this.y,
      this.width,
      this.height
    )
  }
}