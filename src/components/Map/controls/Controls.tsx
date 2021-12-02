import React from 'react';
import ControlButton from './ControlButton';
import './controls.css';


export type ControlMode = 'drag_circle' | 'draw_polygon' | 'simple_select' | 'draw_point';

interface ControlsProps {
  onControlChange: (control: ControlMode) => void;
  onLayerChange: () => void;
}

export default class Controls extends React.PureComponent<ControlsProps> {
  render() {
    const {
      onControlChange,
      onLayerChange,
    } = this.props;

    return (
      <>
        <div className="controls-container">
          <ControlButton
            id="simple_select"
            onActivate={onControlChange}
          />
          <ControlButton
            id="draw_polygon"
            onActivate={onControlChange}
          />
          <ControlButton
            id="draw_point"
            onActivate={onControlChange}
          />
          <ControlButton
            id="drag_circle"
            onActivate={onControlChange}
          />
          <button
            onClick={onLayerChange}
          >
            toggle_satellite
          </button>
        </div>
      </>
    )

  }
}
