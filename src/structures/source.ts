import {
  Feature
} from 'geojson';
import {
  isPointSource,
  isPolygonSource,
  sourceIsPointSource,
  sourceIsPolygonSource
} from './typeguards';

export interface Source {
  type: string;
  id: string;
  name: string;
}

export interface PolygonSource extends Source {
  type: 'polygon';
  polygon: [number, number][];
}

export interface PointSource extends Source {
  type: 'point';
  point: [number, number];
  radius: number;
}

/**
 * Converts a single feature to a source
 * @param geojson
 */
 export function featureToSource(id: string, name: string, geojson: Feature): PolygonSource | PointSource | null {
  switch(geojson.geometry.type) {
    case 'Point':
      return {
        id,
        name,
        type: 'point',
        point: geojson.geometry.coordinates as [number, number],
        radius: geojson.properties?.radius || 0,
      }
    case 'Polygon':
      return {
        id,
        name,
        type: 'polygon',
        // Lets bastardise the type system
        /**
         * Important: Polygon can be triple nested.
         */
        polygon: geojson.geometry.coordinates[0] as unknown as [number, number][],
      }
  }
  console.warn(`Unsupported geojson feature type: ${geojson.geometry.type}`)
  return null;
}

/**
 * Converts a simplified source back into a geojson layer
 * @param source
 * @returns
 */
export function sourceToFeature(source: Source): Feature | null {
  if (sourceIsPolygonSource(source)) {
    return {
      type: 'Feature',
      properties: {},
      id: source.id,
      geometry: { type: 'Polygon', coordinates: [source.polygon] }
    }
  }

  if (sourceIsPointSource(source)) {
    return {
      type: 'Feature',
      properties: {
        radius: source.radius,
      },
      id: source.id,
      geometry: { type: 'Point', coordinates: source.point }
    }
  }

  return null;
}

/**
 * Validates JSON loaded from file.
 * @param json
 * @returns
 */
export function validateSourceMap(json: any): json is Record<string, Source> {
  try {
    const invalid = Object.entries(json).find(([id, source]) => (
      id !== (source as Source).id || (
        !isPolygonSource(source)
        && !isPointSource(source)
      )
    ));

    // Return false if we found an invalid object
    return !invalid;
  } catch (error) {
    console.error(error);
  }

  return false;
}
