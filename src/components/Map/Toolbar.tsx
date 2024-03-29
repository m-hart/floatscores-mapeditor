import React from 'react';
import { Source, validateSourceMap } from '../../structures/source';
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
    const data = JSON.stringify(this.props.sources);
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

      const valid = validateSourceMap(json);

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
