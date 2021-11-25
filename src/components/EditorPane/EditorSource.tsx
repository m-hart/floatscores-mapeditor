import React from 'react';
import { Source } from '../../structures/sources';
import './pane.css';

interface EditorSourceProps {
  id: string;
  source: Source;
}

export class EditorSource extends React.PureComponent<EditorSourceProps> {

  render() {
    const {
      source,
    } = this.props;

    return (
      <li className="source-element">
        <hr />
        {source.getName()}
        <hr />
        {source.serialise()}
      </li>
    )
  }
}
