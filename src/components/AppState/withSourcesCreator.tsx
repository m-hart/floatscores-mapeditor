import React from 'react';

import { SourcesContext } from './SourcesContextProvider';

/** Omit injected props from TProps */
export type WithoutInjectedProps<InjectProps, TProps> = Omit<TProps, keyof InjectProps>;

export interface SourcesCreatorContextOwnProps {}

export interface SourcesCreatorContextInjectProps extends SourcesContext {}

type SourcesCreatorContextProps<TProps> = SourcesCreatorContextOwnProps & WithoutInjectedProps<SourcesCreatorContextInjectProps, TProps>;


/**
 * Higher order component for providing sources context for creating sources.
 * @param Wrapped
 * @returns
 */
export default function withSourcesCreator<TProps extends SourcesCreatorContextInjectProps>(Wrapped: React.ComponentType<TProps>) {
  return class SourcesCreator extends React.PureComponent<SourcesCreatorContextProps<TProps>, any> {
    private renderWrapped = ({
      sources,
      updateSource,
      deleteSource,
      addSources,
      loadSources,
    }: SourcesContext) => {

      return (
        <Wrapped
          {...this.props as TProps}
          updateSource={updateSource}
          deleteSource={deleteSource}
          addSources={addSources}
          loadSources={loadSources}
          sources={sources}
        />
      );
    }

    render() {
      return (
        <SourcesContext.Consumer>
          {this.renderWrapped}
        </SourcesContext.Consumer>
      );
    }
  };
}
