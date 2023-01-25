export class ImageLoader {
  imageFiles: Record<string, string>;
  images: Record<string, HTMLImageElement>;

  constructor(imageFiles: Record<string, string>) {
    this.imageFiles = imageFiles;
    this.images = {};
  }

  load() {
    const promises = [];
    for (const name in this.imageFiles) {
      promises.push(this.loadImage(name, this.imageFiles[name]));
    }
    return Promise.all(promises);
  }

  loadImage(name: string, src: string) {
    return new Promise(resolve => {
      const image = new Image();
      this.images[name] = image;
      image.onload = () => resolve(name);
      image.src = src;
    });
  }
}
