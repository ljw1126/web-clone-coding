import { hexToRgb, randomNumBetween } from './utils.js';

export default class Particle {
  constructor(x, y, deg = 0, colors) {
    this.x = x * innerWidth;
    this.y = y * innerHeight;
    this.angle =  Math.PI / 180 * randomNumBetween(deg - 30, deg + 30); // 라디안을 degree로, -30 ~ 30 사이로 
    this.r = randomNumBetween(30, 100); // 반지름, 나가는 힘의 크기

    this.vx = this.r * Math.cos(this.angle);
    this.vy = this.r * Math.sin(this.angle);

    this.friction = 0.89; // 마찰력
    this.gravity = 0.5; // 중력

    // 종이 사이즈
    this.width = 12;
    this.height = 12;

    this.opacity = 1;

    this.widthDelta = randomNumBetween(0, 360);
    this.heightDelta = randomNumBetween(0, 360);

    this.rotation = randomNumBetween(0, 360);
    this.rotationDelta = randomNumBetween(-1, 1); // 시계 방향/반시계 방향

    this.colors = colors || ['#FF577F', '#FF884B', '#FFD384', '#FFF9B0'];
    this.color = hexToRgb(
      this.colors[Math.floor(randomNumBetween(0, this.colors.length))]
    ); // 임의 한 개만 뽑음
  }
  update() {
    this.vy += this.gravity; // 아래로 내려감

    this.vx *= this.friction; // 마찰력을 더해서 느려지게 함
    this.vy *= this.friction;

    this.x += this.vx;
    this.y += this.vy;

    this.opacity -= 0.01;

    this.widthDelta += 2;
    this.heightDelta += 2;

    this.rotation += this.rotationDelta;
  }
  draw(ctx) {
    ctx.translate(this.x + this.width * 1.2, this.y + this.height * 1.2); // 축에서 더 이동시켜서 
    ctx.rotate(Math.PI / 180 * this.ratation);
    ctx.translate(- this.x - this.width * 1.2, -this.y - this.height * 1.2);

    ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;
    ctx.fillRect(
      this.x, 
      this.y,  
      this.width * Math.cos(Math.PI / 180 * this.widthDelta), // 좌우로 팔랑팔랑
      this.height * Math.sin(Math.PI / 180 * this.heightDelta) // 위 아래로 팔랑 팔랑
      );
    
      ctx.resetTransform();
  }
}