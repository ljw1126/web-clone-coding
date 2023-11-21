import App from "./App.js"

export default class Background {
  constructor(config) {
     this.img = config.img;
     this.height = App.height;
     this.width = App.height * (this.img.width / this.img.height); // this.width : this.height= App.width : App.height;

     this.leftPos = {x : 0, y : 0};
     this.rightPos = {x : this.width - 4, y : 0};
     this.speed = config.speed;
  }
  update() {
    // 오른쪽 방향으로 진행할 때, 이미지 두개를 번갈아 붙여간다
    if(this.leftPos.x + this.width < 0) { // 왼쪽 이미지 width가 0보다 작아진다면
      this.leftPos.x = this.rightPos.x + this.width - 4; // 오른쪽 이미지 옆에 붙임
    }
    
    if(this.rightPos.x + this.width < 0) { // 오른쪽 이미지 width가 0보다 작아진다면
      this.rightPos.x = this.leftPos.x + this.width - 4; // 왼쪽 이미지 옆에 붙임 
    }
    
    this.leftPos.x += this.speed;
    this.rightPos.x += this.speed;
  }
  draw() {
    App.ctx.drawImage(
      this.img,
      this.leftPos.x,
      this.leftPos.y,
      this.width,
      this.height
    );

    App.ctx.drawImage(
      this.img,
      this.rightPos.x,
      this.rightPos.y,
      this.width,
      this.height
    );
  }
}