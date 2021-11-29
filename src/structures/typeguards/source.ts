import {
  Source,
  PointSource,
  PolygonSource,
} from '../source';

/**
 * Typeguard that returns if the Source is a `PointSource`
 * @param source
 * @returns
 */
export function isPointSource(source: Source): source is PointSource {
  return (source as PointSource).type === 'point';
}

/**
 * Typeguard that returns if the Source is a `PointSource`
 * @param source
 * @returns
 */
 export function isPolygonSource(source: Source): source is PolygonSource {
  return (source as PolygonSource).type === 'polygon';
}
