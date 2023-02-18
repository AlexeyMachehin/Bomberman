import { Entity } from './Entity';
import { MapElement } from '../../pages/GamePage2/GamePage2';

export interface Direction {
  row: -1 | 0 | 1;
  col: -1 | 0 | 1;
}

export class Explosion extends Entity {
  alive: boolean;
  timer: number;
  direction: Direction;
  distanceFromCenter: number;
  spriteX: number;
  spriteY: number;
  readonly type = MapElement.explosion;
  readonly spriteCenterX = 32;
  readonly spriteCenterY = 96;
  readonly spriteInitialX: number;
  readonly spriteInitialY: number;

  constructor(
    row: number,
    column: number,
    direction: Direction,
    distanceFromCenter: number,
    context: CanvasRenderingContext2D
  ) {
    super(row, column, context);
    this.alive = true;
    this.timer = 0.4;
    this.direction = direction;
    this.distanceFromCenter = distanceFromCenter;
    this.spriteInitialX =
      this.spriteCenterX +
      this.direction.col * this.distanceFromCenter * this.spriteSize;
    this.spriteInitialY =
      this.spriteCenterY +
      this.direction.row * this.distanceFromCenter * this.spriteSize;
    this.spriteX = this.spriteInitialX;
    this.spriteY = this.spriteInitialY;
  }

  update(step: number) {
    this.timer -= step;

    if (this.timer <= 0) {
      this.alive = false;
    }

    const interval = Math.ceil(this.timer / 0.1);

    switch (interval % 4) {
      case 4:
        this.spriteX = this.spriteInitialX;
        this.spriteY = this.spriteInitialY;
        break;
      case 3:
        this.spriteX = this.spriteInitialX + 80;
        break;
      case 2:
        this.spriteX = this.spriteInitialX;
        this.spriteY = this.spriteInitialY + 80;
        break;
      case 1:
        this.spriteX = this.spriteInitialX + 80;
        break;
    }
  }

  render() {
    this.context.drawImage(
      this.sprite,
      this.spriteX,
      this.spriteY,
      this.spriteSize,
      this.spriteSize,
      this.x,
      this.y,
      this.cellSize,
      this.cellSize
    );
  }
}
