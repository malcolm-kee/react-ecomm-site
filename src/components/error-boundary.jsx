import PropTypes from 'prop-types';
import * as React from 'react';
import { Button } from './button';
import { Panel, PanelBody, PanelHeading } from './panel';

/**
 * `ErrorBoundary` catches error in component tree.
 *
 * @see https://reactjs.org/docs/error-boundaries.html
 */
export class ErrorBoundary extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onError: PropTypes.func,
  };

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  state = {
    hasError: false,
  };

  componentDidCatch(error, errorInfo) {
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
