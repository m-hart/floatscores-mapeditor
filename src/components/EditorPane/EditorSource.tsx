import React from 'react';
import Collapsible from 'react-collapsible';
import {
  Source
} from '../../structures/source';
import {
  sourceIsCircleSource,
  sourceIsPointSource,
  sourceIsPolygonSource,
} from '../../structures/typeguards';
import './pane.css';
import CirclePane from './source/CirclePane';
import PointPane from './source/PointPane';
import PolygonPane from './source/PolygonPane';

interface EditorSourceProps {
  id: string;
  source: Source;
  selected?: boolean;
}

export class EditorSource extends React.PureComponent<EditorSourceProps> {
  private getSourceContent() {
    const {
      source
    } = this.props;

    if (sourceIsCircleSource(source)) {
      return (
        <CirclePane
          source={source}
        />
      );
    }

    if (sourceIsPointSource(source)) {
      // TODO
      return (
        <PointPane
          source={source}
        />
      );
    }

    if (sourceIsPolygonSource(source)) {
      return (
        <PolygonPane
          source={source}
        />
      );
    }

    return null;
  }

  render() {
    const {
      source,
      selected,
    } = this.props;

    const classname = selected ? 'source-element-selected' : 'source-element';
    return (
      <Collapsible
        className={classname}
        openedClassName={classname}
        contentContainerTagName="li"
        trigger={source.name}
        transitionTime={100}
      >
        <hr />
        {this.getSourceContent()}
        <hr />
      </Collapsible>
    )
  }
}
