export class ControlState {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
  bomb: boolean;
  keyMap: Map<string, string>;

  constructor() {
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;
    this.bomb = false;
    this.keyMap = new Map([
      ['w', 'up'],
      ['s', 'down'],
      ['a', 'left'],
      ['d', 'right'],
      [' ', 'bomb'],
    ]);
    document.addEventListener('keydown', event => this.update(event, true));
    document.addEventListener('keyup', event => this.update(event, false));
  }

  update(event: KeyboardEvent, pressed: boolean) {
    const key = event.key;
    if (this.keyMap.has(key)) {
      const direction = this.keyMap.get(event.key);
      event.preventDefault();
      event.stopPropagation();
      if (direction !== undefined) (this as any)[direction] = pressed;
      // console.log(this);
    }
  }
}
