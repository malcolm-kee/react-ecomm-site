import PropTypes from 'prop-types';
import React from 'react';
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

  state = {
    hasError: false,
  };

  componentDidCatch(error, errorInfo) {
    this.setState(
      {
        hasError: true,
      },
      () => {
        console.group(`Error caught in ErrorBoundary`);
        console.error(error);
        console.error(errorInfo);
        console.groupEnd();

        const { onError } = this.props;
        if (onError) {
          onError();
        }
      }
    );
  }

  render() {
    return this.state.hasError ? (
      <Panel color="danger">
        <PanelHeading>Error</PanelHeading>
        <PanelBody>Something goes wrong.</PanelBody>
      </Panel>
    ) : (
      <>{this.props.children}</>
    );
  }
}
