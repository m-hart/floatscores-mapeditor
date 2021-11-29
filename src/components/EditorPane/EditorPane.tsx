import React from 'react';
import {
  Source
} from '../../structures/source';
import { EditorSource } from './EditorSource';

interface EditorPaneProps {
  sources: [string, Source][]
  onSourceChange: (id: string, newSource: Source) => void;
}

export class EditorPane extends React.PureComponent<EditorPaneProps> {

  render() {
    const {
      sources,
      onSourceChange,
    } = this.props;

    const s = sources.map(([id, source]) => (
      <EditorSource
        id={id}
        source={source}
        onSourceChange={onSourceChange}
      />
    ));

    return (
      <ul>
        {s}
      </ul>
    )
  }
}
