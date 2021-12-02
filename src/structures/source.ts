import {
  Feature
} from 'geojson';
import circle from '@turf/circle';
import {
  isPointSource,
  isPolygonSource,
  sourceIsCircleSource,
  sourceIsPointSource,
  sourceIsPolygonSource
} from './typeguards';

/**
 * Custom source property, e.g attached file etc.
 * Each property has a unique ID attached
 */
export interface SourceCustomProperty {
  key: string;
  value: string | number;
  /** Unique uuid for identifying custom property irrespective of key */
  uuid: string;
}
export interface Source {
  type: string;
  id: string;
  name: string;
  /** Custom properties uses the UUID property of the `SourceCustomProperty` as the key */
  customProperties: Record<string, SourceCustomProperty>;
}

export interface PolygonSource extends Source {
  type: 'polygon';
  polygon: [number, number][];
}

export interface PointSource extends Source {
  type: 'point';
  point: [number, number];
}

export interface CircleSource extends Source {
  type: 'circle';
  center: [number, number];
  radius: number;

  // polygon: [number, number];
}


/**
 * Converts a single feature to a source
 * @param geojson
 */
 export function featureToSource(id: string, name: string, geojson: Feature): PolygonSource | PointSource | CircleSource | null {
  switch(geojson.geometry.type) {
    case 'Point':
      return {
        id,
        name,
        type: 'point',
        point: geojson.geometry.coordinates as [number, number],
        customProperties: {},
      }
    case 'Polygon':
      if (geojson.properties?.isCircle) {
        return {
          id,
          name,
          type: 'circle',
          // Properties defined by mapbox-draw-circle library
          // NOTE: lat lng is reversed compared to everything else
          center: geojson.properties.center as [number, number],
          radius: geojson.properties.radiusInKm * 1000,
          customProperties: {},
        }
      }

      return {
        id,
        name,
        type: 'polygon',
        // Lets bastardise the type system
        /**
         * Important: Polygon can be triple nested.
         */
        polygon: geojson.geometry.coordinates[0] as unknown as [number, number][],
        customProperties: {},
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
  if (sourceIsCircleSource(source)) {
    return {
      type: 'Feature',
      id: source.id,
      properties: {
        center: source.center,
        radiusInKm: source.radius / 1000,
        isCircle: true,
      },
      geometry: circle(source.center, source.radius / 1000).geometry
    }
  }

  if (sourceIsPolygonSource(source)) {
    return {
      type: 'Feature',
      id: source.id,
      properties: {},
      geometry: { type: 'Polygon', coordinates: [source.polygon] }
    }
  }

  if (sourceIsPointSource(source)) {
    return {
      type: 'Feature',
      id: source.id,
      properties: {},
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
