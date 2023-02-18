import sprite from '../../assets/sprite.png';
import { MapElement } from '../../pages/GamePage2/GamePage2';

export abstract class Entity {
  row: number;
  column: number;
  x: number;
  y: number;
  context: CanvasRenderingContext2D;
  sprite: HTMLImageElement;
  readonly spriteSize: number = 16;
  readonly cellSize: number = 32;

  constructor(row: number, column: number, context: CanvasRenderingContext2D) {
    this.row = row;
    this.column = column;
    this.x = column * this.cellSize;
    this.y = row * this.cellSize;
    this.context = context;
    this.sprite = new Image();
    this.sprite.src = sprite;
  }

  abstract update(step?: number): void;
  abstract render(dt?: number): void;
}
