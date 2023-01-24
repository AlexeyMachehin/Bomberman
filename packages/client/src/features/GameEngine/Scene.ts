import { GameLoop } from './GameLoop';

export class Scene {
  gameLoop: GameLoop;
  status: string;

  constructor(gameLoop: GameLoop) {
    this.gameLoop = gameLoop;
    this.status = (this.constructor as typeof Scene).WORKING;
  }

  static get WORKING() {
    return 'WORKING';
  }

  static get LOADED() {
    return 'LOADED';
  }

  static get START_GAME() {
    return 'START_GAME';
  }

  static get GAME_OVER() {
    return 'GAME_OVER';
  }

  static get GAME_WIN() {
    return 'GAME_WIN';
  }

  static get FINISHED() {
    return 'FINISHED';
  }

  init(): void {
    this.status = (this.constructor as typeof Scene).WORKING;
  }

  finish(status: string): void {
    this.status = status;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  update(step: number): void {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  render(dt: number): void {}
}
