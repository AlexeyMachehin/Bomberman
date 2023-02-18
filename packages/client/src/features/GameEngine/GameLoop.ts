import { Screen } from './Screen';

export type GameLoopPropsType = {
  width: number;
  height: number;
  canvas: HTMLCanvasElement;
};

export class GameLoop {
  last: number;
  fps: number;
  step: number;
  deltaTime: number;
  now: number;
  screen: Screen;

  constructor({ width, height, canvas }: GameLoopPropsType) {
    this.screen = new Screen(width, height, canvas);
    this.last = performance.now();
    this.fps = 60;
    this.step = 1 / this.fps;
    this.deltaTime = 0;
    this.now = 0;
  }

  tick = () => {
    this.now = performance.now();

    this.deltaTime =
      this.deltaTime + Math.min(1, (this.now - this.last) / 1000);
    while (this.deltaTime > this.step) {
      this.deltaTime = this.deltaTime - this.step;
    }
    this.last = this.now;

    requestAnimationFrame(this.tick);
  };

  run() {
    requestAnimationFrame(this.tick);
  }
}
