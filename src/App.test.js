import React from 'react';
import App from './App';
import { renderWithRedux } from './lib/test-util';

describe('<App />', () => {
  it('renders without crashing', () => {
    const { getByText } = renderWithRedux(<App />);

    expect(getByText('Shopit')).not.toBeNull();
  });
});
