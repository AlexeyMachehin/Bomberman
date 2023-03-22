import { Entity } from './Entity';
import { MapElement } from '../../pages/GamePage2/GamePage2';

interface Direction {
  UP: boolean;
  DOWN: boolean;
  LEFT: boolean;
  RIGHT: boolean;
}

export class Player extends Entity {
  speed: number;
  direction: Direction;
  bombsCount: number;
  bombSize: number;
  timer: number;
  stepNumber: number;
  spriteX: number;
  spriteY: number;

  constructor(row: number, column: number, context: CanvasRenderingContext2D) {
    super(row, column, context);
    this.speed = 2;
    this.bombsCount = 1;
    this.bombSize = 2;
    this.timer = 0;
    this.stepNumber = 0;
    this.spriteX = 48;
    this.spriteY = 0;
    this.direction = {
      UP: false,
      DOWN: false,
      LEFT: false,
      RIGHT: false,
    };
  }

  // Проверяет возможность движения в определенном направлении (могут мешать стены и бомбы)
  canMove(row: number, column: number) {
    if (
      (this.direction.LEFT || this.direction.RIGHT) &&
      (this.direction.UP || this.direction.DOWN)
    ) {
      return false;
    }

    const isIntersectionLeftX =
      this.x - this.speed < (column + 1) * this.cellSize &&
      this.x >= (column + 1) * this.cellSize;

    const isIntersectionRightX =
      this.x + this.cellSize + this.speed > column * this.cellSize &&
      this.x + this.cellSize <= column * this.cellSize;

    const isIntersectionUpY =
      this.y - this.speed < (row + 1) * this.cellSize &&
      this.y >= (row + 1) * this.cellSize;

    const isIntersectionDownY =
      this.y + this.cellSize + this.speed > row * this.cellSize &&
      this.y + this.cellSize <= row * this.cellSize;

    const isTouchOrIntersectionX =
      (this.x >= column * this.cellSize &&
        this.x < (column + 1) * this.cellSize) ||
      (this.x + this.cellSize > column * this.cellSize &&
        this.x + this.cellSize <= (column + 1) * this.cellSize);

    const isTouchOrIntersectionY =
      (this.y >= row * this.cellSize && this.y < (row + 1) * this.cellSize) ||
      (this.y + this.cellSize > row * this.cellSize &&
        this.y + this.cellSize <= (row + 1) * this.cellSize);

    if (
      ((this.direction.LEFT && isIntersectionLeftX) ||
        (this.direction.RIGHT && isIntersectionRightX)) &&
      isTouchOrIntersectionY
    ) {
      // Округление координат для более комфортного управления персонажем при смене направления
      if (this.y % this.cellSize <= 8 && this.y % this.cellSize > 0) {
        this.y -= this.y % this.cellSize;
      }

      if (this.y % this.cellSize >= 24) {
        this.y += this.cellSize - (this.y % this.cellSize);
      }

      return false;
    }

    if (
      (this.direction.UP && isIntersectionUpY && isTouchOrIntersectionX) ||
      (this.direction.DOWN && isIntersectionDownY && isTouchOrIntersectionX)
    ) {
      // Округление координат для более комфортного управления персонажем при смене направления
      if (this.x % this.cellSize <= 8 && this.x % this.cellSize > 0) {
        this.x -= this.x % this.cellSize;
      }

      if (this.x % this.cellSize >= 24) {
        this.x += this.cellSize - (this.x % this.cellSize);
      }

      return false;
    }

    return true;
  }

  drop() {
    this.alive = false;
    this.x = 0;
    this.y = 0;
  }

  move(cells: (MapElement | null)[][]) {
    if (!this.alive) {
      return;
    }

    for (let row = 0; row < cells.length; row++) {
      for (let column = 0; column < cells[0].length; column++) {
        switch (cells[row][column]) {
          case MapElement.wall:
          case MapElement.softWall:
          case MapElement.bomb:
            if (!this.canMove(row, column)) {
              return;
            }
        }
      }
    }

    if (this.direction.LEFT) {
      this.x -= this.speed;
    }
    if (this.direction.RIGHT) {
      this.x += this.speed;
    }
    if (this.direction.UP) {
      this.y -= this.speed;
    }
    if (this.direction.DOWN) {
      this.y += this.speed;
    }
  }

  update(step: number) {
    if (!this.alive) {
      return;
    }

    if (!this.direction.UP && !this.direction.RIGHT && !this.direction.DOWN && !this.direction.LEFT) {
      this.spriteX = 64;
      this.spriteY = 0;
      return;
    }

    this.timer += step;
    this.stepNumber++;
    const interval = Math.ceil(this.timer / 0.25);

    if (this.direction.RIGHT || this.direction.UP) {
      this.spriteY = 16;
    } else {
      this.spriteY = 0;
    }

    switch (interval % 6) {
      case 0:
      case 5:
        if (this.direction.LEFT || this.direction.RIGHT) {
          this.spriteX = 0;
        } else {
          this.spriteX = 48;
        }
        break;
      case 1:
      case 4:
        if (this.direction.LEFT || this.direction.RIGHT) {
          this.spriteX = 16;
        } else {
          this.spriteX = 64;
        }
        break;
      case 2:
      case 3:
        if (this.direction.LEFT || this.direction.RIGHT) {
          this.spriteX = 32;
        } else {
          this.spriteX = 80;
        }
        break;
    }
  }

  render() {
    if (!this.alive) {
      return;
    }

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
