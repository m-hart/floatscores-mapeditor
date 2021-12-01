import React from 'react';
import {
  Source,
  featureToSource,
} from '../../structures/source';
import withSourcesCreator, { SourcesCreatorContextInjectProps } from '../AppState/withSourcesCreator';
import {
  EditorPane
} from '../EditorPane/EditorPane';
import Map, {
  DrawEvent,
  MapProps
} from './Map';
import Toolbar from './Toolbar';

interface EditorProps extends Pick<MapProps, 'token'>, SourcesCreatorContextInjectProps {

}

/**
 * Map class for handling drawing events.
 */
class Editor extends React.PureComponent<EditorProps> {

  private index: number;

  constructor(props: EditorProps) {
    super(props);

    this.index = 0;
  }

  private getIdsFromDrawEvent(event: DrawEvent): string[] {
    return event.features.map(f => `${f.id}`);
  }


  private onDraw = (event: DrawEvent) => {
    const entries = event.features.map<[string, Source | null]>(f => {
      const id = `${f.id}`

      // Tasty mutation - probably should find a better way to do this...
      this.index += 1;

      return [id, featureToSource(id, `New Source ${this.index}` ,f)];
    }).filter<[string, Source]>((f: [string, Source | null]): f is [string, Source] => f[1] !== null);

    this.props.addSources(entries);
  }

  private onDelete = (event: DrawEvent) => {
    const ids = this.getIdsFromDrawEvent(event);

    this.props.deleteSource(ids);
  }

  private onSelect = (event: DrawEvent) => {
    const ids = this.getIdsFromDrawEvent(event);
    this.props.selectSource(ids[0]);
  }

  render() {
    const {
      sources,
      selectedId,
    } = this.props;

    return (
      <div className="editor-container">
        <div className="map-container">
          <Map
            {...this.props}
            onDraw={this.onDraw}
            onDelete={this.onDelete}
            onSelect={this.onSelect}
            onChange={this.onDraw}
          />
        </div>
        <div className="editor-pane-container">
          <Toolbar />
          <EditorPane
            sources={Object.entries(sources)}
            selectedId={selectedId}
          />
        </div>
      </div>
    )
  }
}

export default withSourcesCreator(Editor);
