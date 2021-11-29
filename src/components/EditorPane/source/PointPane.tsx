import React from 'react';
import { PointSource } from '../../../structures/source';
import PointProperty from './properties/PointProperty';


interface PointPaneProps {
  source: PointSource;
  onSourceChange: (id: string, newSource: PointSource) => void;
}

export default class PointPane extends React.PureComponent<PointPaneProps> {

  render() {
    const {
      source: {
        point,
      }
    } = this.props;

    return (
      <div>
        <PointProperty
          point={point} index={0} onEdit={() => {}}
        />
      </div>
    )
  }
}
