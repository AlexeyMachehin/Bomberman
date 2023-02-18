import { Entity } from './Entity';
import { MapElement } from '../../pages/GamePage2/GamePage2';
import { Player } from './Player';

export class Enemy extends Entity {
  speed: number;
  alive: boolean;
  axis: 'x' | 'y';
  direction: -1 | 1;
  timer: number;
  spriteX: number;
  readonly type = MapElement.enemy;

  constructor(row: number, column: number, context: CanvasRenderingContext2D) {
    super(row, column, context);
    this.speed = 1;
    this.axis = Math.random() < 0.5 ? 'x' : 'y';
    this.direction = Math.random() < 0.5 ? -1 : 1;
    this.timer = 0;
    this.spriteX = 48;
    this.alive = true;
  }

  move(cells: any) {
    let count = 0;

    for (let row = 0; row < cells.length; row++) {
      for (let column = 0; column < cells[0].length; column++) {
        switch (cells[row][column]) {
          case MapElement.wall:
          case MapElement.softWall:
          case MapElement.bomb:
            if (
              this.x === (column + 1) * this.cellSize &&
              this.y === row * this.cellSize
            ) {
              count++;
            }

            if (
              this.x + this.cellSize === column * this.cellSize &&
              this.y === row * this.cellSize
            ) {
              count++;
            }

            if (
              this.y === (row + 1) * this.cellSize &&
              this.x === column * this.cellSize
            ) {
              count++;
            }

            if (
              this.y + this.cellSize === row * this.cellSize &&
              this.x === column * this.cellSize
            ) {
              count++;
            }
        }
      }
    }

    if (count === 4) {
      return;
    }

    for (let row = 0; row < cells.length; row++) {
      for (let column = 0; column < cells[0].length; column++) {
        switch (cells[row][column]) {
          case MapElement.wall:
          case MapElement.softWall:
          case MapElement.bomb:
            if (
              this.direction === -1 &&
              this.axis === 'x' &&
              this.x === (column + 1) * this.cellSize &&
              this.y === row * this.cellSize
            ) {
              this.axis = Math.random() < 0.5 ? 'x' : 'y';
              this.direction = Math.random() < 0.5 ? -1 : 1;
              return;
            } else if (
              this.direction === 1 &&
              this.axis === 'x' &&
              this.x + this.cellSize === column * this.cellSize &&
              this.y === row * this.cellSize
            ) {
              this.axis = Math.random() < 0.5 ? 'x' : 'y';
              this.direction = Math.random() < 0.5 ? -1 : 1;
              return;
            } else if (
              this.direction === -1 &&
              this.axis === 'y' &&
              this.y === (row + 1) * this.cellSize &&
              this.x === column * this.cellSize
            ) {
              this.axis = Math.random() < 0.5 ? 'x' : 'y';
              this.direction = Math.random() < 0.5 ? -1 : 1;
              return;
            } else if (
              this.direction === 1 &&
              this.axis === 'y' &&
              this.y + this.cellSize === row * this.cellSize &&
              this.x === column * this.cellSize
            ) {
              this.axis = Math.random() < 0.5 ? 'x' : 'y';
              this.direction = Math.random() < 0.5 ? -1 : 1;
              return;
            }
        }
      }
    }

    this[this.axis] += this.speed * this.direction;
  }

  checkPlayerTouch(player: Player) {
    if (
      ((player.x + this.cellSize > this.x && player.x < this.x) ||
        (player.x < this.x + this.cellSize && player.x > this.x)) &&
      ((player.y >= this.y && player.y < this.y + this.cellSize) ||
        (player.y <= this.y && player.y + this.cellSize > this.y))
    ) {
      return true;
    } else if (
      ((player.x + this.cellSize > this.x && player.x <= this.x) ||
        (player.x < this.x + this.cellSize && player.x >= this.x)) &&
      ((player.y > this.y && player.y < this.y + this.cellSize) ||
        (player.y < this.y && player.y + this.cellSize > this.y))
    ) {
      return true;
    }
  }

  update(step: number) {
    this.timer += step;
    const interval = Math.ceil(this.timer / 0.25);

    switch (interval % 12) {
      case 0:
      case 11:
        this.spriteX = 0;
        break;
      case 1:
      case 10:
        this.spriteX = 16;
        break;
      case 2:
      case 9:
        this.spriteX = 32;
        break;
      case 3:
      case 8:
        this.spriteX = 48;
        break;
      case 4:
      case 7:
        this.spriteX = 64;
        break;
      case 5:
      case 6:
        this.spriteX = 80;
        break;
    }
  }

  render() {
    this.context.drawImage(
      this.sprite,
      this.spriteX,
      240,
      this.spriteSize,
      this.spriteSize,
      this.x,
      this.y,
      this.cellSize,
      this.cellSize
    );
  }
}
