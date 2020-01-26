import { render } from '@testing-library/react';
import React from 'react';
import { user } from '../lib/test-util';
import { ErrorBoundary } from './error-boundary';

let spy;

beforeAll(() => {
  spy = jest.spyOn(global.console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  spy.mockRestore();
});

describe(`<ErrorBoundary />`, () => {
  it('catch error when subcomponent has error', () => {
    const onError = jest.fn();

    const { rerender, getByText, getByRole } = render(
      <ErrorBoundary onError={onError}>
        <Bomb />
      </ErrorBoundary>
    );

    rerender(
      <ErrorBoundary onError={onError}>
        <Bomb throwError />
      </ErrorBoundary>
    );

    expect(spy).toHaveBeenCalledTimes(2);
    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError).toHaveBeenCalledWith(expect.any(Error), {
      componentStack: expect.stringContaining('Bomb'),
    });
    expect(getByRole('alert').textContent).toMatchInlineSnapshot(
      `"Something goes wrong."`
    );

    rerender(
      <ErrorBoundary onError={onError}>
        <Bomb />
      </ErrorBoundary>
    );

    user.click(getByText('Retry'));

    expect(getByText('No Bomb')).toBeVisible();
  });
});

function Bomb({ throwError }) {
  if (throwError) {
    throw new Error(`Bomb`);
  }
  return <p>No Bomb</p>;
}
