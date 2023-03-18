import { Entity } from './Entity';
import { MapElement } from '../../pages/GamePage2/GamePage2';
import { Player } from './Player';

export class Enemy extends Entity {
  speed: number;
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
  }

  move(cells: (MapElement | null)[][]) {
    for (let row = 0; row < cells.length; row++) {
      for (let column = 0; column < cells[0].length; column++) {
        const isWallUp =
          this.y === (row + 1) * this.cellSize &&
          this.x === column * this.cellSize;
        const isWallRight =
          this.x + this.cellSize === column * this.cellSize &&
          this.y === row * this.cellSize;
        const isWallDown =
          this.y + this.cellSize === row * this.cellSize &&
          this.x === column * this.cellSize;
        const isWallLeft =
          this.x === (column + 1) * this.cellSize &&
          this.y === row * this.cellSize;

        const isDirectionUp = this.direction === -1 && this.axis === 'y';
        const isDirectionRight = this.direction === 1 && this.axis === 'x';
        const isDirectionDown = this.direction === 1 && this.axis === 'y';
        const isDirectionLeft = this.direction === -1 && this.axis === 'x';

        switch (cells[row][column]) {
          case MapElement.wall:
          case MapElement.softWall:
          case MapElement.bomb:
            if (isWallLeft && isWallRight && isWallUp && isWallDown) {
              return;
            }

            if (isDirectionLeft && isWallLeft) {
              this.axis = Math.random() < 0.5 ? 'x' : 'y';
              this.direction = Math.random() < 0.5 ? -1 : 1;
              return;
            } else if (isDirectionRight && isWallRight) {
              this.axis = Math.random() < 0.5 ? 'x' : 'y';
              this.direction = Math.random() < 0.5 ? -1 : 1;
              return;
            } else if (isDirectionUp && isWallUp) {
              this.axis = Math.random() < 0.5 ? 'x' : 'y';
              this.direction = Math.random() < 0.5 ? -1 : 1;
              return;
            } else if (isDirectionDown && isWallDown) {
              this.axis = Math.random() < 0.5 ? 'x' : 'y';
              this.direction = Math.random() < 0.5 ? -1 : 1;
              return;
            }
        }
      }
    }

    this[this.axis] += this.speed * this.direction;
  }

  // Проверяет, было ли касание игрока
  checkPlayerTouch(player: Player): boolean {
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

    return false;
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
