import CanvasOption from './CanvasOption.js';
import { randomNumBetween } from './utils.js';

export default class Tail extends CanvasOption {
  constructor(x, vy, color) {
    super();
    this.x = x;
    this.y = this.canvasHeight;
    this.vy = vy;
    this.color = color;
    this.friction = 0.985; // 마찰
    this.angle = randomNumBetween(0, 2); // 꼬리 움직임
  }
  update() {
    this.vy *= this.friction;
    this.y += this.vy;

    this.angle += 1;
    this.x += Math.cos(this.angle) * this.vy * 0.2;

    this.opacity = -this.vy * 0.1; // this.vy는 항상 minus 값이니 0.1 곱해서 0에 수렴
  }
  draw() {
    this.ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 1, 0, Math.PI *2); // 원
    this.ctx.fill();
    this.ctx.closePath();
  }
}