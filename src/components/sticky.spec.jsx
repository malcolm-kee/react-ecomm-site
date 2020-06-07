import { fireEvent, render, waitFor } from '@testing-library/react';
import * as React from 'react';
import { Sticky } from './sticky';

describe(`Sticky`, () => {
  it(`can mount`, async () => {
    render(
      <Sticky offsetTop={30} debounce={10}>
        <p>Bah bah black shop</p>
      </Sticky>
    );

    fireEvent.scroll(window);

    await waitFor(() => {});
  });

  it(`will works`, async () => {
    render(
      <Sticky offsetTop={30} debounce={0}>
        <p>Bah bah black shop</p>
      </Sticky>
    );

    fireEvent.scroll(window);

    await waitFor(() => {});
  });
});
