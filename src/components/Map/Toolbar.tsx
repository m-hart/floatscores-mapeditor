import React from 'react';
import { Source, SourceCustomProperty, validateSourceMap } from '../../structures/source';
import { saveAs } from 'file-saver';
import './editor.css';
import withSourcesCreator, { SourcesCreatorContextInjectProps } from '../AppState/withSourcesCreator';
import Button from '../button/Button';
import FileButton from '../button/FileButton';

interface ToolbarProps extends SourcesCreatorContextInjectProps {}

interface ToolbarState {
  validLoadData: boolean | undefined;
  value: string;
}

interface SaveData {
  sources: (Omit<Source, 'customProperties'> & { customProperties: SourceCustomProperty[] })[]
}

/**
 * Converts records to arrays for saving
 * @param sources
 * @returns
 */
function unmapSources(sources: Record<string, Source>): SaveData {
  return {
      sources: Object.values(sources).map((source) => ({
      ...source,
      customProperties: Object.values(source.customProperties),
    })),
  };
}

/**
 * Converts arrays to records for use in application state.
 * @param data
 * @returns
 */
function mapSources(data: SaveData): Record<string, Source> {
  return Object.fromEntries(Object.values(data.sources).map((source) => (
    [
      source.id,
      {
        ...source,
        customProperties: Object.fromEntries(source.customProperties.map(prop => [prop.uuid, prop])),
      },
    ]
  )));
}


/**
 * Toolbar class for loading and saving files.
 */
class Toolbar extends React.PureComponent<ToolbarProps, ToolbarState> {

  constructor(props: ToolbarProps) {
    super(props);

    this.state = {
      validLoadData: undefined,
      value: '',
    }
  }

  private save = () => {
    const data = JSON.stringify(unmapSources(this.props.sources));
    const blob = new Blob([data], { type: "text/plain;charset=utf-8"});

    saveAs(blob, 'data.json');
  }

  private load = (e) => {
    const {
      loadSources,
    } = this.props;

    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");

    fileReader.onload = fileEvent => {
      const data = fileEvent.target?.result;
      const json = (JSON.parse(data as string));

      const valid = validateSourceMap(mapSources(json));

      if (valid) {
        loadSources(json);
      }

      this.setState({
        validLoadData: valid,
        // Clears input form by causing a rerender - hack but it works
        value: '',
      });
    }
  }

  render() {
    const {
      value,
    } = this.state;

    return(
      <div className="toolbar">
        <FileButton
          label="load"
          onValueUpdate={this.load}
          value={value}
        />
        <Button
          onClick={this.save}
          label="Save"
        />
      </div>
    );
  }
}

export default withSourcesCreator(Toolbar);
