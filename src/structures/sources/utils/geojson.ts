import type {
  FeatureCollection,
  Feature,
  Polygon,
  Point,
} from 'geojson'
import { PointSource } from '../point';
import {
  Source
} from '../';
import { PolygonSource } from '../polygon';

/**
 * Converts a single feature to a source
 * @param geojson
 */
export function createSource(id: string, geojson: Feature): Source | null {
  switch(geojson.geometry.type) {
    case 'Point':
      return new PointSource(id, geojson.geometry.coordinates as [number, number], geojson.properties?.radius)
    case 'Polygon':
      return new PolygonSource(id, geojson.geometry.coordinates as unknown as [number, number][])
  }
  console.warn(`Unsupported geojson feature type: ${geojson.geometry.type}`)
  return null;
}
