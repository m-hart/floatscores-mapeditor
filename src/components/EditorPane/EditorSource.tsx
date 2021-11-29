import React from 'react';
import Collapsible from 'react-collapsible';
import {
  Source
} from '../../structures/source';
import {
  isPointSource,
  isPolygonSource,
} from '../../structures/typeguards';
import './pane.css';
import PointPane from './source/PointPane';
import PolygonPane from './source/PolygonPane';

interface EditorSourceProps {
  id: string;
  source: Source;
}

export class EditorSource extends React.PureComponent<EditorSourceProps> {

  private static getSourceContent(source: Source) {
    if (isPointSource(source)) {
      // TODO
      return (
        <PointPane
          source={source}
          onSourceChange={() => {}}
        />
      );
    }

    if (isPolygonSource(source)) {
      return (
        <PolygonPane
          source={source}
          onSourceChange={() => {}}
        />
      );
    }

    return null;
  }

  render() {
    const {
      source,
    } = this.props;

    return (
      <Collapsible
        className="source-element"
        openedClassName="source-element"
        contentContainerTagName="li"
        trigger={source.name}
        transitionTime={100}
        contentOuterClassName="source-element"
      >
        <hr />
        {EditorSource.getSourceContent(source)}
        <hr />
      </Collapsible>
    )
  }
}
