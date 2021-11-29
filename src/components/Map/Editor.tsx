import React from 'react';
import {
  Source,
  featureToSource,
} from '../../structures/source';
import {
  EditorPane
} from '../EditorPane/EditorPane';
import Map, {
  DrawEvent,
  MapProps
} from './Map';
import Toolbar from './Toolbar';

interface EditorProps extends Pick<MapProps, 'token'> {}

interface EditorState {
  sources: Record<string, Source>;
}

/**
 * Map class for handling drawing events.
 */
export default class Editor extends React.PureComponent<EditorProps, EditorState> {

  private index: number;

  constructor(props: EditorProps) {
    super(props);
    this.state = {
      sources: {},
    }

    this.index = 0;
  }

  private onSourceChange = (id: string, source: Source) => this.setState({
    sources: {
      ...this.state.sources,
      [id]: source
    }
  });

  private onSourceLoad = (sources: Record<string, Source>) => this.setState({ sources });

  private onDraw = (event: DrawEvent) => {
    const entries = Object.fromEntries(event.features.map(f => {
      const id = `${f.id}`

      // Tasty mutation - probably should find a better way to do this...
      this.index += 1;

      return [id, featureToSource(id, `New Layer ${this.index}` ,f)];
    }).filter(f => f !== null));

    this.setState({
      sources: {
        ...this.state.sources,
        ...entries,
      },
    });
  }

  render() {
    const sources = this.state.sources;

    return (
      <div className="editor-container">
        <div className="map-container">
          <Map
            {...this.props}
            onDraw={this.onDraw}
            sources={sources}
          />
        </div>
        <div className="editor-pane-container">
          <Toolbar
            onSourceLoad={this.onSourceLoad}
            sources={sources}
          />
          <EditorPane
            sources={Object.entries(sources)}
            onSourceChange={this.onSourceChange}
          />
        </div>
      </div>
    )
  }
}
