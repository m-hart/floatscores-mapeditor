import React from 'react';
import {
  CircleSource,
  PointSource,
} from '../../../structures/source';
import withSourcesCreator, { SourcesCreatorContextInjectProps } from '../../AppState/withSourcesCreator';
import ControlledProperty from './properties/ControlledProperty';
import PointProperty from './properties/PointProperty';


interface CirclePaneProps extends SourcesCreatorContextInjectProps {
  source: CircleSource;
}

/**
 * Class for handling all attached properties of a point source.
 */
class CirclePane extends React.PureComponent<CirclePaneProps> {

  private onCenterChange = (center: [number, number]) => {
    const {
      source,
      updateSource,
    } = this.props;

    updateSource(
      source.id,
      {
        ...source,
        // Replace center
        center,
      } as CircleSource,
    );
  }

  private onRadiusChange = (radius: number) => {
    const {
      source,
      updateSource,
    } = this.props;

    updateSource(
      source.id,
      {
        ...source,
        // Replace center
        radius,
      } as CircleSource,
    );
  }

  private onNameChange = (name: string) => this.props.updateSource(
    this.props.source.id,
    {
      ...this.props.source,
      name,
    }
  )

  render() {
    const {
      source: {
        center,
        radius,
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
          Center:
          <PointProperty
            point={center}
            onEdit={this.onCenterChange}
          />
        </label>
        <label>
          Radius:
          <ControlledProperty
            onUpdate={this.onRadiusChange}
            property={radius}
          />
        </label>
      </div>
    )
  }
}

export default withSourcesCreator(CirclePane);
