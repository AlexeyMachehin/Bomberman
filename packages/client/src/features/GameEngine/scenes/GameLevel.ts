import { GameLoop } from '../GameLoop';
import { Scene } from '../Scene';
import { Sprite } from '../Sprite';
import { SpriteSheet } from '../SpriteSheet';

export class GameLevel extends Scene {
  tiles: SpriteSheet;
  stone: Sprite;

  constructor(gameLoop: GameLoop) {
    super(gameLoop);
    this.tiles = new SpriteSheet({
      imageName: 'spritesheet',
      imageWidth: 224,
      imageHeight: 368,
    });
    this.stone = this.tiles.getSprite(46);
    this.stone.setXY(0, 0);
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
    this.gameLoop.screen.drawSprite(this.stone);
    super.render(dt);
  }
}
