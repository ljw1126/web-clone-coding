import Background from './Background.js';
import Coin from './Coin.js';
import Player from './Player.js';
import Wall from './Wall.js';

export default class App {
  static canvas = document.querySelector("canvas");
  static ctx = App.canvas.getContext("2d");
  static dpr = devicePixelRatio > 1 ? 2 : 1;
  static interval = 1000 / 60;
  static width = 1024;
  static height = 768;
  
  constructor() {
    // 원근감 : 가까이 있는건 빨리, 멀리있는건 느리게 
    this.background = [
      new Background({img : document.querySelector("#bg3-img"), speed : -1}),
      new Background({img : document.querySelector("#bg2-img"), speed : -2}),
      new Background({img : document.querySelector("#bg1-img"), speed : -4})
    ];

    this.walls = [
      new Wall({type : 'SMALL'})
    ]

    this.player = new Player();
    this.coins = []; // 벽의 x, y좌표로 구해야 함

    window.addEventListener("resize", this.resize.bind(this)); // this == App, this가 없으면 window 객체 가르킴
  }

  resize() {
    App.canvas.width = App.width * App.dpr;
    App.canvas.height = App.height * App.dpr;
    App.ctx.scale(App.dpr, App.dpr);
    
    const width = innerWidth > innerHeight ? innerHeight * 0.9 : innerWidth * 0.9;
    App.canvas.style.width = `${width}px`;
    App.canvas.style.heigth = `${width * ( 3 / 4)}px`;
  }

  render() {
    let now, delta;
    let then = Date.now();
    const frame = () => {
      requestAnimationFrame(frame);
      now = Date.now();
      delta = now - then;
      if(delta < App.interval) return;

      App.ctx.clearRect(0, 0, App.width, App.height);
      
      // 배경 관련
      this.background.forEach(bg => {
        bg.update();
        bg.draw();
      });
      
      // 벽 관련
      for(let i = this.walls.length - 1; i >= 0; i--) { // 사이드 이펙트 때문에 foreach대신 사용
        this.walls[i].update();
        this.walls[i].draw();
        
        // 벽 제거
        if(this.walls[i].isOutside) {
            this.walls.splice(i, 1);
        }
        
        // 벽 생성
        if(this.walls[i].canGenerateNext) {
            this.walls[i].generatedNext = true;
            const newWall = new Wall({type : Math.random() < 0.4 ? 'SMALL' : 'BIG'});
            this.walls.push(newWall);        

            if(Math.random() < 0.5) { // 코인 생성 확률
              const x = newWall.x + newWall.width / 2
              const y = newWall.y2 - newWall.gapY / 2;
              this.coins.push(new Coin(x, y, newWall.vx));
            }
        }

        // 벽과 플레이어 충돌 여부
        if(this.walls[i].isColliding(this.player.boundingBox)) {
          this.player.boundingBox.color = `rgba(255, 0, 0, 0.3)`;
        } else {
          this.player.boundingBox.color = `rgba(0, 0, 255, 0.3)`;
        }
      }

      // 플레이어 관련
      this.player.update();
      this.player.draw();

      // 코인 관련 
      for(let i = this.coins.length - 1; i >= 0; i--) {
        this.coins[i].update();
        this.coins[i].draw();

        if(this.coins[i].x + this.coins[i].width < 0) { // 코인 제거
            this.coins.splice(i, 1);
        }
      }

      //console.log(this.walls.length);

      then = now - (delta % App.interval);
    }
    requestAnimationFrame(frame);
  }
}