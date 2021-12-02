import React from 'react';
import { PointSource } from '../../../structures/source';
import withSourcesCreator, { SourcesCreatorContextInjectProps } from '../../AppState/withSourcesCreator';
import ControlledProperty from './properties/ControlledProperty';
import PointProperty from './properties/PointProperty';


interface PointPaneProps extends SourcesCreatorContextInjectProps {
  source: PointSource;
}

/**
 * Class for handling all attached properties of a point source.
 */
class PointPane extends React.PureComponent<PointPaneProps> {

  private onCoordinateChange = (point: [number, number]) => {
    const {
      source,
      updateSource,
    } = this.props;

    updateSource(
      source.id,
      {
        ...source,
        // Replace point
        point,
      } as PointSource,
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
        point,
        name,
      },
    } = this.props;

    return (
      <div>
        <ControlledProperty
          onUpdate={this.onNameChange}
          property={name}
          label="Point Name"
        />
        <PointProperty
          point={point}
          onEdit={this.onCoordinateChange}
        />
      </div>
    )
  }
}

export default withSourcesCreator(PointPane);
