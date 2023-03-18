import { Entity } from './Entity';
import { MapElement } from '../../pages/GamePage2/GamePage2';
import { Player } from './Player';


export class PlayerDeath extends Entity {
  timer: number;
  spriteX: number;
  readonly type = MapElement.playerDeath;

  constructor(
    player: Player
  ) {
    super(player.row, player.column, player.context);
    this.x = player.x;
    this.y = player.y;
    this.timer = 1.4;
    this.spriteX = 0;
  }

  update(step: number) {
    this.timer -= step;

    if (this.timer <= 0) {
      this.alive = false;
    }

    const interval = Math.ceil(this.timer / 0.2);

    switch (interval % 7) {
      case 7:
        this.spriteX = 0;
        break;
      case 6:
        this.spriteX = 16;
        break;
      case 5:
        this.spriteX = 32;
        break;
      case 4:
        this.spriteX = 48;
        break;
      case 3:
        this.spriteX = 64;
        break;
      case 2:
        this.spriteX = 80;
        break;
      case 1:
        this.spriteX = 96;
        break;
    }
  }

  render() {
    this.context.drawImage(
      this.sprite,
      this.spriteX,
      32,
      this.spriteSize,
      this.spriteSize,
      this.x,
      this.y,
      this.cellSize,
      this.cellSize
    );
  }
}
