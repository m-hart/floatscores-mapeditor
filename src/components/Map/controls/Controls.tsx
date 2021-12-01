import React from 'react';
import ControlButton from './ControlButton';
import './controls.css';


export type ControlMode = 'drag_circle' | 'draw_polygon' | 'simple_select' | 'draw_point';

interface ControlsProps {
  onControlChange: (control: ControlMode) => void;
}

export default class Controls extends React.PureComponent<ControlsProps> {

  private onActivate = (id: ControlMode) => {
    this.props.onControlChange(id)
  }

  render() {
    return (
      <div className="controls-container">
        <ControlButton
          id="simple_select"
          onActivate={this.onActivate}
        />
        <ControlButton
          id="draw_polygon"
          onActivate={this.onActivate}
        />
        <ControlButton
          id="draw_point"
          onActivate={this.onActivate}
        />
        <ControlButton
          id="drag_circle"
          onActivate={this.onActivate}
        />
      </div>
    )

  }
}
