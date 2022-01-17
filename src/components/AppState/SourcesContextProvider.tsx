import React from 'react';
import { Source } from '../../structures/source';

export interface SourcesContext {
  sources: Record<string, Source>;
  addSources: (sources: [string, Source][]) => void;
  updateSource: (id: string, source: Source) => void;
  deleteSource: (id: string | string[]) => void;
  loadSources: (sources: Record<string, Source>) => void;
  selectSource: (id?: string) => void;
  selectedId?: string;
}

export const SourcesContext = React.createContext<SourcesContext>({
  sources: {},
  updateSource: () => {},
  deleteSource: () => {},
  addSources: () => {},
  loadSources: () => {},
  selectSource: () => {},
});

interface SourcesContextProviderProps {}

interface SourcesContextProviderState extends Pick<SourcesContext, 'sources' | 'selectedId'> {

}

/**
 * Sources context provider for centralising the app state. Any component requiring sources or the ability to update sources should use
 * the associated higher order components.
 */
export default class SourceContextProvider extends React.PureComponent<SourcesContextProviderProps, SourcesContextProviderState> {
  constructor(props: SourcesContextProviderProps) {
    super(props);

    this.state = {
      sources: {},
    }
  }


  private updateSource = (id: string, source: Source) => {
    this.setState({
      sources: {
        ...this.state.sources,
        [id]: source,
      }
    })
  }

  private addSources = (sources: [string, Source][]) => {
    this.setState({
      sources: {
        ...this.state.sources,
        ...Object.fromEntries(sources)
      }
    })
  }

  private loadSources = (sources: Record<string, Source>) => {
    this.setState({
      sources,
    });
  }

  private deleteSource = (id: string | string[]) => {
    const ids = id instanceof Array ? id : [id];

    this.setState({
      sources: Object.fromEntries(Object.entries(this.state.sources).filter(([id, _src]) => !ids.includes(id))),
    })
  }

  private selectSource = (id?: string) => this.setState({ selectedId: id })

  private get sourcesContext(): SourcesContext {
    return {
      ...this.state,
      updateSource: this.updateSource,
      deleteSource: this.deleteSource,
      addSources: this.addSources,
      loadSources: this.loadSources,
      selectSource: this.selectSource,
    }
  }

  render() {
    return (
      <SourcesContext.Provider value={this.sourcesContext}>
        {this.props.children}
      </SourcesContext.Provider>
    )
  }



}
