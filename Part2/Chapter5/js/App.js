import Background from './Background.js';
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
        
        if(this.walls[i].canGenerateNext) {
            this.walls[i].generatedNext = true;
            this.walls.push(new Wall({type : Math.random() < 0.4 ? 'SMALL' : 'BIG'}));        
        }
      }

      // 플레이어 관련
      this.player.update();
      this.player.draw();

      //console.log(this.walls.length);

      then = now - (delta % App.interval);
    }
    requestAnimationFrame(frame);
  }
}