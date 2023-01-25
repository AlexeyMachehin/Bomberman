export class Vector {
  direction: string | undefined;
  speed: number | undefined;
  x: number | undefined;
  y: number | undefined;

  constructor(direction: string, speed: number) {
    this.setDirection(direction, speed);
  }

  setDirection(direction: string, speed: number) {
    this.direction = direction;
    this.speed = speed;
    this.x = 0;
    this.y = 0;
    switch (direction) {
      case 'up':
        this.y = -speed;
        break;
      case 'down':
        this.y = speed;
        break;
      case 'right':
        this.x = speed;
        break;
      case 'left':
        this.x = -speed;
        break;

      default:
        break;
    }
  }
}
