import { Body } from './Body';
import { ControlState } from './ControlState';
import { Sprite } from './Sprite';

export class Player extends Body {
  control: ControlState;

  constructor(control: ControlState, animations: any) {
    super({ animations: animations, speed: 100 });
    this.control = control;
  }

  update(step: number) {
    if (this.control.up) {
      this.walk('up');
    } else if (this.control.down) {
      this.walk('down');
    } else if (this.control.left) {
      this.walk('left');
    } else if (this.control.right) {
      this.walk('right');
    } else {
      this.stand(this.velocity.direction!);
    }

    super.update(step);
  }
}
