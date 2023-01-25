import { Sprite } from './Sprite';

export class SpriteSheet {
  imageName: string;
  imageWidth: number;
  imageHeight: number;
  spriteWidth: number;
  spriteHeight: number;

  constructor({
    imageName,
    imageWidth,
    imageHeight,
    spriteWidth = 16,
    spriteHeight = 16,
  }: {
    imageName: string;
    imageWidth: number;
    imageHeight: number;
    spriteWidth?: number;
    spriteHeight?: number;
  }) {
    this.imageName = imageName;
    this.imageWidth = imageWidth;
    this.imageHeight = imageHeight;
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;
  }

  getSourceX(index: number) {
    return (--index * this.spriteWidth) % this.imageWidth;
  }

  getSourceY(index: number) {
    return (
      Math.trunc((--index * this.spriteWidth) / this.imageWidth) *
      this.spriteHeight
    );
  }

  getSprite(index: number) {
    return new Sprite({
      imageName: this.imageName,
      sourceX: this.getSourceX(index),
      sourceY: this.getSourceY(index),
    });
  }
}
