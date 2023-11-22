import App from './App.js';
import BoundingBox from './BoundingBox.js';
import { randomNumBetween } from './utils.js';

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

    this.gapY = randomNumBetween(App.height * 0.2, App.height * 0.35);
    this.x = App.width;
    // 최소: -this.height
    // 최대: App.height - this.gapY - this.height
    this.y1 = -this.height + randomNumBetween(30, App.height - this.gapY - 30); // 30px
    this.y2 = this.y1 + this.height + this.gapY;

    this.generatedNext = false; 
    this.gapNextX = App.width * randomNumBetween(0.6, 0.75);

    // 바운딩 박스
    this.boundingBox1= new BoundingBox(this.x + 30, this.y1 + 30, this.width - 60, this.height - 60);
    this.boundingBox2= new BoundingBox(this.x + 30, this.y2 + 30, this.width - 60, this.height - 60);
  
    this.vx = -6;
  }
  isColliding(target) {
    return this.boundingBox1.isColliding(target) || this.boundingBox2.isColliding(target);
  }

  update() {
    this.x += this.vx;
    this.boundingBox1.x = this.boundingBox2.x = this.x + 30;
  }
  get canGenerateNext() { // 벽 생성 가능 시점
    return !this.generatedNext && this.x + this.width < this.gapNextX;
  }
  get isOutside() {
    return this.x + this.width < 0; // 밖으로 사라진 경우
  }

  draw() {
    // this.x = 700; //벽 고정 확인용
    // this.boundingBox1.x = this.boundingBox2.x = this.x + 30;

    // 벽 이미지
    App.ctx.drawImage(
      this.img,
      this.sx,
      0,
      this.img.width * this.sizeX,
      this.img.height,
      this.x,
      this.y1,
      this.width,
      this.height
    )

    App.ctx.drawImage(
      this.img,
      this.sx,
      0,
      this.img.width * this.sizeX,
      this.img.height,
      this.x,
      this.y2,
      this.width,
      this.height
    )

    this.boundingBox1.draw();
    this.boundingBox2.draw();
  }
}