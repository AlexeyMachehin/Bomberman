import { GameLoop } from '../GameLoop';
import { Scene } from '../Scene';
import { Sprite } from '../Sprite';
import { SpriteSheet } from '../SpriteSheet';
import { TileMap } from '../TileMap';
import levelOneData from '../maps/level-1.json';
import { Camera } from '../Camera';
import { Player } from '../Player';
import { Collider } from '../Collider';

export class GameLevel extends Scene {
  tiles: SpriteSheet;
  player: Player;
  map: TileMap | undefined;
  mainCamera: Camera | undefined;
  collider: Collider;

  constructor(gameLoop: GameLoop) {
    super(gameLoop);
    this.tiles = new SpriteSheet({
      imageName: 'spritesheet',
      imageWidth: 224,
      imageHeight: 368,
    });

    this.player = new Player(this.gameLoop.control, {
      walk_up: this.tiles.getAnimation([18, 19, 20], 140),
      walk_down: this.tiles.getAnimation([4, 5, 6], 140),
      walk_left: this.tiles.getAnimation([1, 2, 3], 140),
      walk_right: this.tiles.getAnimation([15, 16, 17], 140),
    });
    this.player.x = 40;
    this.player.y = 40;

    this.collider = new Collider();
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
    this.mainCamera.watch(this.player);
    this.gameLoop.screen.setCamera(this.mainCamera);

    this.collider.addStaticShapes(levelOneData);
    this.collider.addKinematicBody(this.player);
  }

  update(step: number): void {
    super.update(step);
    this.player.update(step);
    this.collider.update(step);
    this.mainCamera?.update(step);
  }

  render(dt: number): void {
    this.gameLoop.screen.drawSprite(this.map!);
    this.gameLoop.screen.drawSprite(this.player.view);
    super.render(dt);
  }
}
