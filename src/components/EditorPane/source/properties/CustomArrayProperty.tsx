import React from 'react';
import { SourceCustomArrayProperty } from '../../../../structures/source';
import ControlledProperty from './ControlledProperty';
import { CustomPropertyProps } from './CustomPropertyList';

interface CustomArrayPropertyProps extends CustomPropertyProps<SourceCustomArrayProperty> {}

export default class CustomArrayProperty extends React.PureComponent<CustomArrayPropertyProps> {
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

  private addEntry = (e: React.MouseEvent) => {
    const {
      property,
      onEdit,
    } = this.props;

    e.preventDefault();

    onEdit({
      ...property,
      value: [...property.value, `value-${property.value.length}`]
    });
  }

  private removeEntry = (e: React.MouseEvent) => {
    const {
      property,
      onEdit,
    } = this.props;

    e.preventDefault();

    onEdit({
      ...property,
      value: property.value.slice(0, property.value.length - 1),
    });
  }


  private onValueUpdate = (index: number) => (value: string | number) => {
    const {
      property,
      onEdit,
    } = this.props;

    const modProp = {
      ...property
    };

    modProp.value[index] = value;

    onEdit(modProp);
  }

  private valueProperties() {
    const {
      property: {
        value,
        uuid,
      }
    } = this.props;

    return value.map((val, index) => (
      <ControlledProperty
        key={`${uuid}-${index}`}
        property={val}
        onUpdate={this.onValueUpdate(index)}
        label={`${index}`}
      />
    ));
  }

  render() {
    const {
      property: {
        key,
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
        {this.valueProperties()}
        <br />
        <button
          onClick={this.addEntry}
        >
          Add Entry
        </button>
        <button
          onClick={this.removeEntry}
        >
          Remove Entry
        </button>
        <br />
        <button
          onClick={this.onRemove}
        >
          Remove Property
        </button>
        <hr />
      </div>
    )
  }
}

