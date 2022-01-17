import {
  Source,
  PointSource,
  PolygonSource,
  CircleSource,
} from '../source';

/**
 * Typeguard that returns if the Source is a `PointSource`
 * @param source
 * @returns
 */
export function sourceIsPointSource(source: Source): source is PointSource {
  return (source as PointSource).type === 'point';
}

/**
 * Typeguard that returns if the Source is a `PointSource`
 * @param source
 * @returns
 */
export function sourceIsPolygonSource(source: Source): source is PolygonSource {
  return (source as PolygonSource).type === 'polygon';
}

export function sourceIsCircleSource(source: Source): source is CircleSource {
  return (source as CircleSource).type === 'circle';
}

/**
 * Typeguard for source for any object
 * @param source
 * @returns
 */
function isSource(source: any): source is Source {
  return typeof source.id === 'string'
    && typeof source.name === 'string'
    && typeof source.type === 'string';
}

/**
 * Typeguard for PolygonSource for any object
 * @param source
 * @returns
 */
export function isPolygonSource(source: any): source is PolygonSource {
  return isSource(source)
    && source.type === 'polygon'
    && (source as PolygonSource).polygon
    && typeof (source as PolygonSource).polygon[0][0] === 'number';
}

/**
 * Typeguard for PointSource for any object
 * @param source
 * @returns
 */
export function isPointSource(source: any): source is PointSource {
  return isSource(source)
    && source.type === 'point'
    && (source as PointSource).point
    && typeof (source as PointSource).point[0] === 'number';
}

/**
 * Typeguard for PointSource for any object
 * @param source
 * @returns
 */
 export function isCircleSource(source: any): source is CircleSource {
  return isSource(source)
    && source.type === 'circle'
    && (source as CircleSource).center
    && typeof (source as CircleSource).radius === 'number'
    && typeof (source as CircleSource).center[0] === 'number';
}
