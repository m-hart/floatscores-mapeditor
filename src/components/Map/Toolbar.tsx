import React from 'react';
import { Source } from '../../structures/source';
import { saveAs } from 'file-saver';

interface ToolbarProps {
  sources: Record<string, Source>;
}

export default class Toolbar extends React.PureComponent<ToolbarProps> {
  private save = () => {
    console.log(this.props);
    const data = JSON.stringify(this.props.sources);
    const blob = new Blob([data], { type: "text/plain;charset=utf-8"});

    saveAs(blob, 'data.json');
  }

  render() {
    return(
      <div>
        <button onClick={this.save}>
          <label>SAVE</label>
        </button>
      </div>
    );
  }
}
