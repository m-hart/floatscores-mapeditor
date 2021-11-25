import { Source } from './source';

export class PointSource extends Source {
  protected coords: [number, number];
  protected radius: number;

  constructor(id: string, coords: [number, number], radius: number = 1000) {
    super(id);

    this.coords = coords;
    this.radius = radius;
  }

  public serialise() {
    return JSON.stringify({
      coords: this.coords,
      radius: this.radius,
    })
  }

}
