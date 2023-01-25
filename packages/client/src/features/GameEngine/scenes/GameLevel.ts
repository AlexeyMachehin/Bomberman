import { GameLoop } from '../GameLoop';
import { Scene } from '../Scene';
import { Sprite } from '../Sprite';
import { SpriteSheet } from '../SpriteSheet';
import { TileMap } from '../TileMap';
import levelOneData from '../maps/level-1.json';
import { Camera } from '../Camera';

export class GameLevel extends Scene {
  tiles: SpriteSheet;
  stone: Sprite;
  map: TileMap | undefined;
  mainCamera: Camera | undefined;

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
    this.map = this.gameLoop.screen.createMap(
      'level1',
      levelOneData,
      this.tiles
    );
    this.mainCamera = new Camera({
      width: this.gameLoop.screen.width,
      height: this.gameLoop.screen.height,
      limitX: this.map.width - this.gameLoop.screen.width,
      limitY: this.map.height - this.gameLoop.screen.height,
    });
    // this.mainCamera.watch()
    this.gameLoop.screen.setCamera(this.mainCamera);
  }

  update(step: number): void {
    this.mainCamera?.update(step);
    super.update(step);
  }

  render(dt: number): void {
    this.gameLoop.screen.fill('#000');
    this.gameLoop.screen.drawSprite(this.map!);
    super.render(dt);
  }
}
