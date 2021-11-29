import React from 'react';

interface ControlledPropertyProps<T extends string | number> {
  property: T;
  onUpdate: (t: T) => void;
}

export default class ControlledProperty<T extends string | number> extends React.PureComponent<ControlledPropertyProps<T>> {

  private onChange = (event: React.FormEvent<HTMLInputElement>) => this.props.onUpdate((event.target as any).value);

  render() {
    return (
      <input
        type="text"
        value={this.props.property}
        onChange={this.onChange}
      />
    )
  }
}
