import App from './App.js';

export default class Wall {
  constructor(config) {
    this.img = document.querySelector("#wall-img");
    this.type = config.type; // 'BIG', 'SMALL'

    switch(this.type) {
      case 'BIG' : 
        this.sizeX = 18 / 30;
        this.sx = this.img.width * (9 / 30); // 9번째 타일부터 그림
        break;
      case 'SMALL' : 
        this.sizeX = 9 / 30;
        this.sx = this.img.width * (0 / 30); // 0번째 타일 부터
        break;
    }

    this.width = App.height * this.sizeX; 
    this.height = App.height;
  }
  update() {

  }
  draw() {
    App.ctx.drawImage(
      this.img,
      this.sx,
      0,
      this.img.width * this.sizeX,
      this.img.height,
      0,
      0,
      this.width,
      this.height
    )
  }
}