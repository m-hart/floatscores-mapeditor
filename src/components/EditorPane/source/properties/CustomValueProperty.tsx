import React from 'react';
import {
  SourceCustomValueProperty,
} from '../../../../structures/source';
import Button from '../../../button/Button';
import ControlledProperty from './ControlledProperty';
import { CustomPropertyProps } from './CustomPropertyList';

interface CustomValuePropertyProps extends CustomPropertyProps<SourceCustomValueProperty> {}

export default class CustomValueProperty extends React.PureComponent<CustomValuePropertyProps> {
  private onRemove = (e: React.MouseEvent) => {
    const {
      property: {
        uuid,
      },
      onDelete,
    } = this.props;

    e.preventDefault();

    onDelete(uuid);
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
        <ControlledProperty
          onUpdate={this.onKeyUpdate}
          property={key}
          label="Key"
        />
        <ControlledProperty
          onUpdate={this.onValueUpdate}
          property={value}
          label="Value"
        />
        <Button
          onClick={this.onRemove}
          label="Remove Property"
        />
        <hr />
      </div>
    )
  }
}
