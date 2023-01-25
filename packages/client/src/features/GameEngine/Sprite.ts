export class Sprite {
  imageName: string;
  sourceX: number;
  sourceY: number;
  sourceWidth: number;
  sourceHeight: number;
  width: number;
  height: number;
  x: number;
  y: number;

  constructor({
    imageName,
    sourceX,
    sourceY,
    sourceWidth = 16,
    sourceHeight = 16,
    width = 40,
    height = 40,
  }: {
    imageName: string;
    sourceX: number;
    sourceY: number;
    sourceWidth?: number;
    sourceHeight?: number;
    width?: number;
    height?: number;
  }) {
    this.imageName = imageName;
    this.sourceX = sourceX;
    this.sourceY = sourceY;
    this.sourceWidth = sourceWidth;
    this.sourceHeight = sourceHeight;
    this.width = width;
    this.height = height;
    this.x = 0;
    this.y = 0;
  }

  setXY(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
