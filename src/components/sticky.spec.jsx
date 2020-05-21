import * as React from 'react';
import { fireEvent, render, wait } from '@testing-library/react';
import { Sticky } from './sticky';

describe(`Sticky`, () => {
  it(`can mount`, async () => {
    render(
      <Sticky offsetTop={30} debounce={10}>
        <p>Bah bah black shop</p>
      </Sticky>
    );

    fireEvent.scroll(window);

    await wait();
  });
});
