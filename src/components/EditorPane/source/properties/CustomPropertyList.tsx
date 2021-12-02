import React from 'react';
import { Source, SourceCustomProperty } from '../../../../structures/source';
import withSourcesCreator, { SourcesCreatorContextInjectProps } from '../../../AppState/withSourcesCreator';
import ControlledProperty from './ControlledProperty';
import CustomProperty from './CustomProperty';

interface CustomPropertyListProps extends SourcesCreatorContextInjectProps {
  source: Source
}

class CustomPropertyList extends React.PureComponent<CustomPropertyListProps> {
  private static generateUuid(): string {
    return (Math.random() + 1).toString(36).substring(7);
  }

  private static generateNewProperty(): SourceCustomProperty {
    return {
      key: '',
      value: '',
      uuid: this.generateUuid(),
    }
  }

  private onCreate = (e: React.MouseEvent) => {
    e.preventDefault();

    this.onEdit(CustomPropertyList.generateNewProperty());
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

  render() {
    const {
      source: {
        customProperties,
      },
    } = this.props;

    const custom = Object.entries(customProperties).map(([uuid, prop]) => (
      <CustomProperty
        key={uuid}
        property={prop}
        onEdit={this.onEdit}
        onDelete={this.onDelete}
      />
    ));

    return (
      <>
        {custom}
        <div>
          <button
            onClick={this.onCreate}
          >
            Add Custom Property
          </button>
        </div>
      </>
    )
  }
}

export default withSourcesCreator(CustomPropertyList)
