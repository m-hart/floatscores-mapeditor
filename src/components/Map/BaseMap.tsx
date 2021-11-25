import React from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import './map.css';
import {
  memoize
} from 'lodash';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import {
  CircleMode,
  DragCircleMode,
  DirectMode,
  SimpleSelectMode,
} from 'mapbox-gl-draw-circle';


export interface BaseMapProps {
  token: string;
  onDraw: (event: mapboxgl.EventData) => any;
}

/**
 * Base Map Class, handles loading and drawing a map from API token.
 */
export default class BaseMap extends React.PureComponent<BaseMapProps> {
  private map?: mapboxgl.Map;
  private drawingInstance: MapboxDraw;

  private static CONTROLS: any = {
    point: true,
    polygon: true,
    trash: true,
  }

  constructor(props: BaseMapProps) {
    super(props);

    this.drawingInstance = new MapboxDraw({
      displayControlsDefault: false,
      controls: BaseMap.CONTROLS,
      userProperties: true,
      modes: {
        ...MapboxDraw.modes,
        /** TODO: Circle */
        // DRAW_CIRCLE: CircleMode,
        // DragCircleMode,
        // DirectMode,
        // SimpleSelectMode,
      },

    });
    console.log(this.drawingInstance);
  }

  /**
   * Initialises a new map instance from a given token. Should not be
   * called directly, instead rely on the `memoizedMapInstance` function.
   * @param token Mapbox API token
   * @returns `mapboxgl.Map` instance
   */
  private initialiseMapInstance = (token: string) => {
    mapboxgl.accessToken = token;

    return new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [145.707, -41.8],
      zoom: 7.5
    })
  }

  /**
   * Memoized map instance creator.
   */
  private memoizedMapInstance = memoize(this.initialiseMapInstance);

  componentDidMount() {
    // Initialise map instance after `map` div is loaded.
    this.map = this.memoizedMapInstance(this.props.token);
    this.map.addControl(this.drawingInstance, 'top-left');
  }




  render() {
    return (
      <div className="map-container">
        <div id="map" className="map"/>
      </div>
    )
  }
}
