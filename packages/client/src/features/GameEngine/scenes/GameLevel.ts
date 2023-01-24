import { GameLoop } from '../GameLoop';
import { Scene } from '../Scene';

export class GameLevel extends Scene {
  constructor(gameLoop: GameLoop) {
    super(gameLoop);
  }

  init(): void {
    super.init();
  }

  update(step: number): void {
    super.update(step);
  }

  render(dt: number): void {
    this.gameLoop.screen.fill('#7CFC00');
    this.gameLoop.screen.print(50, 70, 'Игра началась');
    super.render(dt);
  }
}
