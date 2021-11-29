import React from 'react';
import { PolygonSource } from '../../../structures/source';
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

  render() {
    const {
      source: {
        polygon,
      }
    } = this.props;

    // Curry the index
    const points = polygon.map((p, i) => <PointProperty point={p} onEdit={this.onCoordinateChange(i)}/>)

    return (
      <div>
        {points}
      </div>
    )
  }
}
