import { Sprite } from './Sprite';

export class TileMap extends Sprite {
  hitboxes: any;

  constructor(props: any) {
    super(props);
    this.hitboxes = props.hitboxes || [];
  }
}
