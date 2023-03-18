import { Entity } from './Entity';
import { MapElement } from '../../pages/GamePage2/GamePage2';
import { Enemy } from './Enemy';

export class EnemyDeath extends Entity {
  timer: number;
  spriteX: number;
  readonly type = MapElement.enemyDeath;

  constructor(
    enemy: Enemy
  ) {
    super(enemy.row, enemy.column, enemy.context);
    this.x = enemy.x;
    this.y = enemy.y;
    this.timer = 1;
    this.spriteX = 96;
  }

  update(step: number) {
    this.timer -= step;

    if (this.timer <= 0) {
      this.alive = false;
    }

    const interval = Math.ceil(this.timer / 0.2);

    switch (interval % 5) {
      case 5:
        this.spriteX = 96;
        break;
      case 4:
        this.spriteX = 112;
        break;
      case 3:
        this.spriteX = 128;
        break;
      case 2:
        this.spriteX = 144;
        break;
      case 1:
        this.spriteX = 160;
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
