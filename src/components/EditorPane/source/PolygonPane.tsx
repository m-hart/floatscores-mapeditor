import React from 'react';
import { PolygonSource } from '../../../structures/source';
import ControlledProperty from './properties/ControlledProperty';
import PointProperty from './properties/PointProperty';


interface PolygonPaneProps {
  source: PolygonSource;
  onSourceChange: (id: string, newSource: PolygonSource) => void;
}

/**
 * Class for handling all attached properties of a polygon source.
 */
export default class PolygonPane extends React.PureComponent<PolygonPaneProps> {

  private onCoordinateChange = (index: number) => (point: [number, number]) => {
    const {
      source,
      onSourceChange
    } = this.props;

    onSourceChange(
      source.id,
      {
        ...source,
        // Replace point in polygon
        polygon: source.polygon.map((p, i) => index === i ? point : p)
      }
    );
  }

  private onNameChange = (name: string) => this.props.onSourceChange(
    this.props.source.id,
    {
      ...this.props.source,
      name,
    }
  )

  render() {
    const {
      source: {
        polygon,
        name,
      }
    } = this.props;

    // Curry the index
    const points = polygon.map((p, i) => <div key={i}><PointProperty point={p} onEdit={this.onCoordinateChange(i)}/></div>)

    return (
      <div>
        <label>
          Layer Name:
          <ControlledProperty
            onUpdate={this.onNameChange}
            property={name}
          />
        </label>
        <br />
        <label>
          Coordinates:
          {points}
        </label>
      </div>
    )
  }
}
