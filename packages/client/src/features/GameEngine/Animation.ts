import { Sprite } from './Sprite';

export class Animation extends Sprite {
  frames: { sx: number; sy: number }[];
  speed: number;
  repeat: boolean;
  running: boolean;
  lastTime: number;
  currentFrame: number;
  totalFrames: number;

  constructor({
    imageName,
    frames,
    speed,
    repeat = true,
    autorun = true,
    width = 34,
    height = 34,
  }: {
    imageName: string;
    frames: { sx: number; sy: number }[];
    speed: number;
    repeat?: boolean;
    autorun?: boolean;
    width?: number;
    height?: number;
  }) {
    super({
      imageName: imageName,
      sourceX: frames[0].sx,
      sourceY: frames[0].sy,
      width: width,
      height: height,
    });
    this.frames = frames;
    this.speed = speed;
    this.repeat = repeat;
    this.running = autorun;
    this.lastTime = 0;
    this.currentFrame = 0;
    this.totalFrames = this.frames.length;
  }

  setFrame(index: number) {
    this.currentFrame = index;
    this.sourceX = this.frames[index].sx;
    this.sourceY = this.frames[index].sy;
  }

  run() {
    if (!this.running) {
      this.setFrame(0);
      this.running = true;
    }
  }

  stop() {
    this.running = false;
  }

  nextFrame() {
    if (this.currentFrame + 1 === this.totalFrames) {
      if (this.repeat) {
        this.setFrame(0);
        return;
      }
      this.stop();
      return;
    }
    this.setFrame(this.currentFrame + 1);
  }

  update(step: number) {
    if (!this.running) {
      return;
    }
    // this.nextFrame();

    if (this.lastTime === 0) {
      this.lastTime = performance.now();
      return;
    }
    if (performance.now() - this.lastTime > this.speed) {
      this.nextFrame();
      this.lastTime = performance.now();
    }
  }
}
