import React from 'react';
import {
  Source
} from '../../structures/source';
import { EditorSource } from './EditorSource';

interface EditorPaneProps {
  sources: [string, Source][];
  selectedId?: string;
}

export class EditorPane extends React.PureComponent<EditorPaneProps> {

  render() {
    const {
      sources,
      selectedId
    } = this.props;

    const s = sources.map(([id, source]) => (
      <EditorSource
        key={id}
        id={id}
        source={source}
        selected={selectedId === id}
      />
    ));

    return (
      <ul>
        {s}
      </ul>
    )
  }
}
