import React from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import './map.css';
import {
  Feature,
} from 'geojson';
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
import { Source, sourceToFeature } from '../../structures/source';
import withSources from '../AppState/withSources';
import Controls from './controls/Controls';

export interface DrawEvent {
  type: 'draw.create';
  features: Feature[];
}


export interface MapProps {
  token: string;
  onDraw: (event: DrawEvent) => any;
  onDelete: (event: DrawEvent) => any;
  onSelect: (event: DrawEvent) => any;
  onChange: (event: DrawEvent) => any;
  sources: Record<string, Source>;
}

/**
 * Base Map Class, handles loading and drawing a map from API token.
 */
class Map extends React.PureComponent<MapProps> {
  private map?: mapboxgl.Map;
  private drawingInstance: MapboxDraw;

  private static CONTROLS: any = {
    point: true,
    polygon: true,
    trash: true,
    circle: true,
  }

  constructor(props: MapProps) {
    super(props);

    this.drawingInstance = new MapboxDraw({
      displayControlsDefault: false,
      // controls: Map.CONTROLS,
      userProperties: true,
      modes: {
        ...MapboxDraw.modes,
        /** TODO: Circle */
        drag_circle  : DragCircleMode,
      },

    });
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

  private setMode = (mode: any) => this.drawingInstance.changeMode(mode);

  componentDidMount() {
    // Initialise map instance after `map` div is loaded.
    this.map = this.memoizedMapInstance(this.props.token);
    this.map.addControl(this.drawingInstance, 'top-left');

    // Add drawing binds
    this.map.on('draw.create', this.props.onDraw);
    this.map.on('draw.delete', this.props.onDelete);
    this.map.on('draw.selectionchange', this.props.onSelect);
    this.map.on('draw.update', this.props.onChange);
  }

  componentDidUpdate({ sources: prevSources }: MapProps) {
    if (prevSources !== this.props.sources) {
      const data: any = {
        type: 'FeatureCollection',
        features: Object.values(this.props.sources).map(sourceToFeature).filter<Feature>((f: Feature | null): f is Feature => f !== null),
      };

      console.log(data);
      this.drawingInstance.set(data);
    }
  }

  render() {
    return (
      <>
        <Controls onControlChange={this.setMode} />
        <div id="map" className="map"/>
      </>
    )
  }
}

export default withSources(Map);
