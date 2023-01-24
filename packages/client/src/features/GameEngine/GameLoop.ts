import { Scene } from './Scene';
import { GameLevel } from './scenes/GameLevel';
import { Loading } from './scenes/Loading';
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
  scenes: Record<string, Scene>;
  currentScene: Scene;

  constructor({ width, height, canvas }: GameLoopPropsType) {
    this.screen = new Screen(width, height, canvas);
    this.last = performance.now();
    this.fps = 60;
    this.step = 1 / this.fps;
    this.deltaTime = 0;
    this.now = 0;
    this.scenes = {
      loading: new Loading(this),
      gameLevel: new GameLevel(this),
    };
    this.currentScene = this.scenes.loading;
    this.currentScene.init();
  }

  changeScene(status: string) {
    switch (status) {
      case Scene.LOADED:
        return this.scenes.gameLevel;
        break;

      default:
        return this.scenes.loading;
        break;
    }
  }

  tick = () => {
    this.now = performance.now();

    this.deltaTime =
      this.deltaTime + Math.min(1, (this.now - this.last) / 1000);
    while (this.deltaTime > this.step) {
      this.deltaTime = this.deltaTime - this.step;
    }
    this.last = this.now;

    if (this.currentScene.status !== Scene.WORKING) {
      this.currentScene = this.changeScene(this.currentScene.status);
      this.currentScene.init();
    }
    this.currentScene.render(this.dt);
    requestAnimationFrame(this.tick);
  };

  run() {
    requestAnimationFrame(this.tick);
  }
}
