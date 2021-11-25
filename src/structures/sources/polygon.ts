import { Source } from './source';

export type PolygonCoords = [number, number][];

export class PolygonSource extends Source {
  protected coords: [number, number][];


  constructor(id: string, coords: PolygonCoords) {
    super(id);

    this.coords = coords;
  }

  public getCoords() {
    return this.coords;
  }

  public updateCoords(coords) {
    this.coords = coords;
  }

  public serialise(){
    return JSON.stringify({
      coords: this.coords
    })
  }
}
