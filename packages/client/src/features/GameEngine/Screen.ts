import { ImageLoader } from './ImageLoader';

export class Screen {
  width: number;
  height: number;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  images: Record<string, HTMLImageElement>;
  isImagesloaded: boolean;

  constructor(width: number, height: number, canvas: HTMLCanvasElement) {
    this.width = width;
    this.height = height;
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.images = {};
    this.isImagesloaded = false;
  }

  fill(color: string) {
    this.context.fillStyle = color;
    this.context.fillRect(0, 0, this.width, this.height);
  }

  print(x: number, y: number, text: string) {
    this.context.fillStyle = '#fff';
    this.context.font = '22px Georgia';
    this.context.fillText(text, x, y);
  }

  loadImages(imageFiles: Record<string, string>) {
    const loader = new ImageLoader(imageFiles);
    loader.load().then(names => {
      this.images = Object.assign(this.images, loader.images);
      this.isImagesloaded = true;
      console.log(names); // оставил пока чтобы видеть в консоли что изображения прогрузились
    });
  }
}
