import React from 'react';
import { PolygonSource } from '../../../structures/source';
import withSourcesCreator, { SourcesCreatorContextInjectProps } from '../../AppState/withSourcesCreator';
import ControlledProperty from './properties/ControlledProperty';
import PointProperty from './properties/PointProperty';


interface PolygonPaneProps extends SourcesCreatorContextInjectProps {
  source: PolygonSource;
}

/**
 * Class for handling all attached properties of a polygon source.
 */
class PolygonPane extends React.PureComponent<PolygonPaneProps> {

  private onCoordinateChange = (index: number) => (point: [number, number]) => {
    const {
      source,
      updateSource
    } = this.props;

    updateSource(
      source.id,
      {
        ...source,
        // Replace point in polygon
        polygon: source.polygon.map((p, i) => index === i ? point : p)
      } as PolygonSource,
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
        polygon,
        name,
      }
    } = this.props;

    // Curry the index
    const points = polygon.map((p, i) => <div key={i}><PointProperty point={p} onEdit={this.onCoordinateChange(i)}/></div>)

    return (
      <div>
        <ControlledProperty
          onUpdate={this.onNameChange}
          property={name}
          label="Polygon Name"
        />
        {points}
      </div>
    )
  }
}

export default withSourcesCreator(PolygonPane);
