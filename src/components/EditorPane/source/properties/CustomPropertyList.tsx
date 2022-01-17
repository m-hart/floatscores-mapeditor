import React from 'react';
import { Source, SourceCustomBaseProperty, SourceCustomProperty } from '../../../../structures/source';
import withSourcesCreator, { SourcesCreatorContextInjectProps } from '../../../AppState/withSourcesCreator';
import Button from '../../../button/Button';
import CustomArrayProperty from './CustomArrayProperty';
import CustomFileProperty from './CustomFileProperty';
import CustomValueProperty from './CustomValueProperty';
import './property.css';

interface CustomPropertyListProps extends SourcesCreatorContextInjectProps {
  source: Source;
}

/**
 * Used by child compositional components.
 */
export interface CustomPropertyProps<T extends SourceCustomBaseProperty> {
  onEdit: (property: T) => void;
  property: T;
  onDelete: (uuid: string) => void;
}

class CustomPropertyList extends React.PureComponent<CustomPropertyListProps> {
  private static generateUuid(): string {
    return (Math.random() + 1).toString(36).substring(7);
  }

  private static generateNewProperty(type: SourceCustomProperty['type']): SourceCustomProperty {
    switch (type) {
      case 'array':
        return {
          type: 'array',
          key: 'custom-key',
          value: ['value-0'],
          uuid: this.generateUuid(),
        }
      case 'file':
        return {
          type: 'file',
          key: 'custom-key',
          value: '',
          uuid: this.generateUuid(),
        }
      case 'value':
        return {
          type: 'value',
          key: 'custom-key',
          value: 'val',
          uuid: this.generateUuid(),
        }
    }
  }

  private onCreate = (type: SourceCustomProperty['type']) => (e: React.MouseEvent) => {
    e.preventDefault();

    this.onEdit(CustomPropertyList.generateNewProperty(type));
  }

  private onEdit = (prop: SourceCustomProperty) => {
    const {
      source,
      updateSource,
    } = this.props;


    updateSource(source.id, {
      ...source,
      customProperties: {
        ...source.customProperties,
        [prop.uuid]: prop
      },
    });
  }

  private onDelete = (uuid: string) => {
    const {
      source,
      updateSource,
    } = this.props;

    const sourceCopy = {
      ...source
    };

    delete sourceCopy.customProperties[uuid];

    updateSource(source.id, sourceCopy);
  }

  private customProperty = ([uuid, prop]: [string, SourceCustomProperty]) => {
    switch (prop.type) {
      case 'value':
        return (
          <CustomValueProperty
            key={uuid}
            property={prop}
            onEdit={this.onEdit}
            onDelete={this.onDelete}
          />
        )
      case 'array':
        return (
          <CustomArrayProperty
            key={uuid}
            property={prop}
            onEdit={this.onEdit}
            onDelete={this.onDelete}
          />
        )
      case 'file':
        return (
          <CustomFileProperty
            key={uuid}
            property={prop}
            onEdit={this.onEdit}
            onDelete={this.onDelete}
          />
        )
    }
  }

  render() {
    const {
      source: {
        customProperties,
      },
    } = this.props;

    const custom = Object.entries(customProperties).map(this.customProperty);

    return (
      <>
        {custom}
        <div className="property-button-container">
          <Button
            label="Add Custom Property"
            onClick={this.onCreate('value')}
          />
          <Button
            label="Add Custom Array"
            onClick={this.onCreate('array')}
          />
          <Button
            label="Add Custom File"
            onClick={this.onCreate('file')}
          />
        </div>
      </>
    )
  }
}

export default withSourcesCreator(CustomPropertyList)
