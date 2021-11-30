import React from 'react';
import {
  Source
} from '../../structures/source';
import { EditorSource } from './EditorSource';

interface EditorPaneProps {
  sources: [string, Source][]
}

export class EditorPane extends React.PureComponent<EditorPaneProps> {

  render() {
    const {
      sources,
    } = this.props;

    const s = sources.map(([id, source]) => (
      <EditorSource
        key={id}
        id={id}
        source={source}
      />
    ));

    return (
      <ul>
        {s}
      </ul>
    )
  }
}
