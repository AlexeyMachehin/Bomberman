import { Animation } from './Animation';
import { Sprite } from './Sprite';
import { Vector } from './Vector';

export class Body {
  x: number;
  y: number;
  speed: number;
  velocity: Vector;
  animations: any;
  collisionShape: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  view: any;

  constructor({ animations, speed }: { animations: any; speed: number }) {
    this.x = 0;
    this.y = 0;
    this.speed = speed;
    this.velocity = new Vector('down', 0);
    this.animations = animations;
    this.collisionShape = { x: 0, y: 0, width: 34, height: 34 };
    this.stand('down');
  }

  walk(direction: string) {
    this.velocity.setDirection(direction, this.speed);
    this.view = this.animations['walk_' + direction];
    this.view.run();
  }

  stand(direction: string) {
    this.velocity.setDirection(direction, 0);
    this.view = this.animations['walk_' + direction];
    this.view.stop();
  }

  update(step: number) {
    this.x += (this.velocity.x! / 100) * 2;
    this.y += (this.velocity.y! / 100) * 2;
    this.view.setXY(Math.trunc(this.x), Math.trunc(this.y));
    this.view.update(step);
  }
}
