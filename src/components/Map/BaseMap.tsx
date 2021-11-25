import React from 'react';
import mapboxgl from 'mapbox-gl';
import './map.css';
import {
  memoize
} from 'lodash';

interface BaseMapProps {
  token: string;
}

const fetchMap = (token: string) => {

}

export default class BaseMap extends React.PureComponent<BaseMapProps> {
  private map?: mapboxgl.Map;

  private initialiseMapInstance = (token: string) => {
    mapboxgl.accessToken = token;

    return new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [145.707, -41.8],
      zoom: 7.5
    })
  }

  private memoizedMapInstance = memoize(this.initialiseMapInstance);

  componentDidMount() {
    this.map = this.memoizedMapInstance(this.props.token);
  }


  render() {
    return (
      <div className="map-container">
        <div id="map" className="map"/>
      </div>
    )
  }
}
