import mapboxgl from 'mapbox-gl';
import React from 'react';
import {
  SourceManager
} from '../../structures/manager';
import {
  EditorPane
} from '../EditorPane/EditorPane';
import Map, {
  DrawEvent,
  MapProps
} from './Map';

interface EditorProps extends Pick<MapProps, 'token'> {}

interface EditorState {
  ids: Record<string, boolean>;
}

/**
 * Map class for handling drawing events.
 */
export default class Editor extends React.PureComponent<EditorProps, EditorState> {
  private manager: SourceManager;

  constructor(props: EditorProps) {
    super(props);
    this.manager = new SourceManager();

    this.state = {
      ids: {}
    }
  }

  private onDraw = (event: DrawEvent) => {
    const entries = event.features.map(f => {
      const id = `${f.id}`
      this.manager.addSource(id, f)

      return [id, true]
    });

    this.setState({
      ids: {
        ...this.state.ids,
        ...Object.fromEntries(entries)
      },
    });
  }

  render() {
    const sources = this.manager.getSources();

    return (
      <div className="editor-container">
        <div className="map-container">
          <Map
            {...this.props}
            onDraw={this.onDraw}
          />
        </div>
        <div className="editor-pane-container">
          <EditorPane
            sources={sources}
          />
        </div>
      </div>
    )
  }
}
