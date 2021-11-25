import React from 'react';
import { Source } from '../../structures/sources';
import { EditorSource } from './EditorSource';

interface EditorPaneProps {
  sources: [string, Source][]
}

export class EditorPane extends React.PureComponent<EditorPaneProps> {


  render() {
    const {
      sources,
    } = this.props;

    const s = sources.map(([id, source]) => <EditorSource id={id} source={source} />);

    return (
      <ul>
        {s}
      </ul>
    )
  }
}
