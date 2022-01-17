import React, { ChangeEvent } from 'react';
import { SourceCustomFileProperty } from '../../../../structures/source';
import Button from '../../../button/Button';
import FileButton from '../../../button/FileButton';
import ControlledProperty from './ControlledProperty';
import { CustomPropertyProps } from './CustomPropertyList';

interface CustomFilePropertyProps extends CustomPropertyProps<SourceCustomFileProperty> {}

export default class CustomFileProperty extends React.PureComponent<CustomFilePropertyProps> {
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

  private onValueUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e?.target?.files) {
      return;
    }

    const file = e.target.files[0].name;
    const {
      property,
      onEdit,
    } = this.props;

    onEdit({
      ...property,
      value: file,
    });
  }


  render() {
    const {
      property: {
        key,
        value,
      }
    } = this.props;

    console.log(value);

    return (
      <div>
        <hr />
        <ControlledProperty
          onUpdate={this.onKeyUpdate}
          property={key}
          label="Key"
        />
        <FileButton
          // type="file"
          label="Load"
          onValueUpdate={this.onValueUpdate}
        />
        <br />
        <Button
          onClick={this.onRemove}
          label="Remove Property"
        />
        <hr />
      </div>
    )
  }
}

