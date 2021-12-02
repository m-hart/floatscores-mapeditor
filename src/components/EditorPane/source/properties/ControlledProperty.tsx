import React from 'react';
import './property.css';

interface ControlledPropertyProps<T extends string | number> {
  property: T;
  onUpdate: (t: T) => void;
  label?: string;
}

export default class ControlledProperty<T extends string | number> extends React.PureComponent<ControlledPropertyProps<T>> {

  private onChange = (event: React.FormEvent<HTMLInputElement>) => this.props.onUpdate((event.target as any).value);

  render() {
    const {
      label,
    } = this.props;

    const labelComponent = label ? (
      <label className="controlled-property-label">
        {label}
      </label>
    ) : null

    return (
      <div className="controlled-property-container">
          {labelComponent}
          <input
            type="text"
            className="controlled-property-input"
            value={this.props.property}
            onChange={this.onChange}
          />
      </div>
    )
  }
}
