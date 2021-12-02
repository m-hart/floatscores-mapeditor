import React from 'react';
import {
  SourceCustomProperty } from '../../../../structures/source';
import ControlledProperty from './ControlledProperty';

interface CustomPropertyProps {
  onEdit: (property: SourceCustomProperty) => void;
  property: SourceCustomProperty;
  onDelete: (uuid: string) => void;
}
export default class CustomProperty extends React.PureComponent<CustomPropertyProps> {
  private onRemove = (e: React.MouseEvent) => {
    e.preventDefault();

    this.props.onDelete(this.props.property.uuid);
  }

  private onKeyUpdate = (key: string) => {
    const {
      property,
      onEdit,
    } = this.props;

    onEdit({
      ...property,
      key,
    });
  }

  private onValueUpdate = (value: string | number) => {
    const {
      property,
      onEdit,
    } = this.props;

    onEdit({
      ...property,
      value,
    });
  }


  render() {
    const {
      property: {
        key,
        value,
      }
    } = this.props;

    return (
      <div>
        <hr />
        KEY
        <ControlledProperty
          onUpdate={this.onKeyUpdate}
          property={key}
        />
        <br />
        VAL
        <ControlledProperty
          onUpdate={this.onValueUpdate}
          property={value}
        />
        <br />
        <button
          onClick={this.onRemove}
        >
          Remove Property
        </button>
      </div>
    )
  }
}
