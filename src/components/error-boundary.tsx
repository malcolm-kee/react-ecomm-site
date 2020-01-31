import * as React from 'react';
import { Button } from './button';
import { Panel, PanelBody, PanelHeading } from './panel';

export type ErrorBoundaryProps = {
  children: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

/**
 * `ErrorBoundary` catches error in component tree.
 *
 * @see https://reactjs.org/docs/error-boundaries.html
 */
export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const { onError } = this.props;
    if (onError) {
      onError(error, errorInfo);
    }
  }

  attemptRecover = () => {
    this.setState({
      hasError: false,
    });
  };

  render() {
    return this.state.hasError ? (
      <Panel color="danger">
        <PanelHeading>Error</PanelHeading>
        <PanelBody>
          <p role="alert">Something goes wrong.</p>
          <div className="btn-toolbar">
            <Button onClick={this.attemptRecover} color="primary">
              Retry
            </Button>
          </div>
        </PanelBody>
      </Panel>
    ) : (
      <>{this.props.children}</>
    );
  }
}
