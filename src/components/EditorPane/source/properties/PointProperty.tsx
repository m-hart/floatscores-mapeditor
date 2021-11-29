import React from 'react';
import ControlledProperty from './ControlledProperty';

interface PointPropertyProps {
  point: [number,  number];
  onEdit: (newPoint: [number, number]) => void;
}


/**
 * Class for handling point input
 */
export default class PointProperty extends React.PureComponent<PointPropertyProps> {
  private onLngChange = (lng: number) => this.props.onEdit([lng, this.props.point[1]]);
  private onLatChange = (lat: number) => this.props.onEdit([this.props.point[0], lat]);

  render() {
    const {
      point: [lng, lat],
    } = this.props;

    return (
      <div>
        <ControlledProperty
          property={lng}
          onUpdate={this.onLngChange}
        />
        <ControlledProperty
          property={lat}
          onUpdate={this.onLatChange}
        />
      </div>
    )
  }
}
