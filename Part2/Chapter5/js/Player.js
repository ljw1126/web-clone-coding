import App from './App.js';
import BoundingBox from './BoundingBox.js';

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

    this.boundingBox = new BoundingBox(this.x + 10, this.y + 16, this.width - 20, this.height - 20);
  }
  update() {
    this.counter += 1;
    if(this.counter % 2 === 0) {
      this.frameX = (++this.frameX % 15);
    }

    this.vy += this.gravity;
    this.y += this.vy;
    this.boundingBox.y = this.y + 16;
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
    );

    //this.boundingBox.draw();
  }
}