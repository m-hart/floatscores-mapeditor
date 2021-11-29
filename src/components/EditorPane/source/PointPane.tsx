import React from 'react';
import { PointSource } from '../../../structures/source';
import PointProperty from './properties/PointProperty';


interface PointPaneProps {
  source: PointSource;
  onSourceChange: (id: string, newSource: PointSource) => void;
}

/**
 * Class for handling all attached properties of a point source.
 */
export default class PointPane extends React.PureComponent<PointPaneProps> {

  private onCoordinateChange = (point: [number, number]) => {
    const {
      source,
      onSourceChange
    } = this.props;

    onSourceChange(
      source.id,
      {
        ...source,
        // Replace point
        point,
      }
    );
  }

  render() {
    const {
      source: {
        point,
      },
    } = this.props;

    return (
      <div>
        <PointProperty
          point={point} onEdit={this.onCoordinateChange}
        />
      </div>
    )
  }
}
