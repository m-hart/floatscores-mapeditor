import React from 'react';
import { SourcesContext } from './SourcesContextProvider';

/** Omit injected props from TProps */
export type WithoutInjectedProps<InjectProps, TProps> = Omit<TProps, keyof InjectProps>;

export interface SourcesContextOwnProps {}

export interface SourcesContextInjectProps extends Pick<SourcesContext, 'sources'> {}

type SourcesContextProps<TProps> = SourcesContextOwnProps & WithoutInjectedProps<SourcesContextInjectProps, TProps>;


/**
 * Higher order component for providing sources context.
 * @param Wrapped
 * @returns
 */
export default function withSources<TProps extends SourcesContextInjectProps>(Wrapped: React.ComponentType<TProps>) {
  return class Sources extends React.PureComponent<SourcesContextProps<TProps>, any> {
    private renderWrapped = ({ sources }: SourcesContext) => {

      return (
        <Wrapped
          {...this.props as TProps}
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
