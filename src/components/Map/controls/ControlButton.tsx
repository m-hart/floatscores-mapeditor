import React from 'react';
import {
  ControlMode
} from './Controls';

interface ControlButtonProps {
  id: ControlMode;
  // svg: string;
  onActivate: (id: ControlMode) => void;
}

export default class ControlButton extends React.PureComponent<ControlButtonProps> {
  private onClick = (e: React.MouseEvent) => {
    const {
      id,
      onActivate,
    } = this.props;

    e.preventDefault();

    onActivate(id);
  }

  render() {
    const {
      id,
    } = this.props;
    return (
      <button
        onClick={this.onClick}
        id={id}
      >
        {id}
      </button>
    );
  }
}
