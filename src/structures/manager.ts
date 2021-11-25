import { Feature } from 'geojson';
import mapboxgl from 'mapbox-gl';
import {} from './audio';
import {
  createSource,
  PointSource,
  PolygonSource,
  Source,
} from './sources';

export class SourceManager {
  private sourceMap: Record<string, Source> = {};

  public addSource(id: string, data: Feature) {
    const source = createSource(id, data)

    if (source) {
      this.sourceMap[id] = source;
    }
  }

  public getSources(): [string, Source][] {
    return Object.entries(this.sourceMap);
  }

  public modifySource(id: string) {

  }
}
