import React from 'react';

interface PointPropertyProps {
  index: number;
  point: [number,  number];
  onEdit: (newPoint: [number, number]) => void;
}

export default class PointProperty extends React.PureComponent<PointPropertyProps> {

  render() {
    const {
      index,
      point: [lng, lat],
    } = this.props;

    return (
      <div>{lng}, {lat}</div>
    )
  }
}
