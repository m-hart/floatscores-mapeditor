import React from 'react';
import { PointSource } from '../../../structures/source';
import ControlledProperty from './properties/ControlledProperty';
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
        point,
        name,
      },
    } = this.props;

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
          <PointProperty
            point={point}
            onEdit={this.onCoordinateChange}
          />
        </label>
      </div>
    )
  }
}
