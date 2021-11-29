import React from 'react';
import Collapsible from 'react-collapsible';
import {
  Source
} from '../../structures/source';
import {
  sourceIsPointSource,
  sourceIsPolygonSource,
} from '../../structures/typeguards';
import './pane.css';
import PointPane from './source/PointPane';
import PolygonPane from './source/PolygonPane';

interface EditorSourceProps {
  id: string;
  source: Source;
  onSourceChange: (id: string, source: Source) => void;
}

export class EditorSource extends React.PureComponent<EditorSourceProps> {
  private getSourceContent() {
    const {
      source
    } = this.props;

    if (sourceIsPointSource(source)) {
      // TODO
      return (
        <PointPane
          source={source}
          onSourceChange={this.props.onSourceChange}
        />
      );
    }

    if (sourceIsPolygonSource(source)) {
      return (
        <PolygonPane
          source={source}
          onSourceChange={this.props.onSourceChange}
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
        contentOuterClassName="source-element-content"
      >
        <hr />
        {this.getSourceContent()}
        <hr />
      </Collapsible>
    )
  }
}
