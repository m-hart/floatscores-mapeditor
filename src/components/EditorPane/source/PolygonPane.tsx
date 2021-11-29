import React from 'react';
import { PolygonSource } from '../../../structures/source';
import PointProperty from './properties/PointProperty';


interface PolygonPaneProps {
  source: PolygonSource;
  onSourceChange: (id: string, newSource: PolygonSource) => void;
}

export default class PolygonPane extends React.PureComponent<PolygonPaneProps> {

  render() {
    const {
      source: {
        polygon,
      }
    } = this.props;

    const points = polygon.map((p, i) => <PointProperty point={p} index={i} onEdit={() => {}}/>)
    console.log(polygon.length, polygon);

    return (
      <div>
        {points}
      </div>
    )
  }
}
