import { Entity } from './Entity';
import { MapElement } from '../../pages/GamePage2/GamePage2';

export class Bomb extends Entity {
  size: number;
  alive: boolean;
  timer: number;
  spriteX: number;
  blowUpCb: (bomb: Bomb) => void;
  readonly type = MapElement.bomb;

  constructor(
    row: number,
    column: number,
    size: number,
    blowUpCb: (bomb: Bomb) => void,
    context: CanvasRenderingContext2D
  ) {
    super(row, column, context);
    this.size = size;
    this.alive = true;
    this.timer = 3;
    this.spriteX = 0;
    this.blowUpCb = blowUpCb;
  }

  update(step: number) {
    this.timer -= step;

    if (this.timer <= 0) {
      return this.blowUpCb(this);
    }

    const interval = Math.ceil(this.timer / 0.5);

    switch (interval % 6) {
      case 0:
      case 5:
        this.spriteX = 0;
        break;
      case 1:
      case 4:
        this.spriteX = 16;
        break;
      case 2:
      case 3:
        this.spriteX = 32;
        break;
    }
  }

  render() {
    this.context.drawImage(
      this.sprite,
      this.spriteX,
      48,
      this.spriteSize,
      this.spriteSize,
      this.x,
      this.y,
      this.cellSize,
      this.cellSize
    );
  }
}
