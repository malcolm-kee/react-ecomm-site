import React from 'react';
import { render } from '@testing-library/react';
import { useBoolean } from './use-boolean';
import { user } from '../lib/test-util';

describe(`useBoolean`, () => {
  it(`toggle value`, () => {
    const TestBed = () => {
      const [value, toggle] = useBoolean(false);
      return (
        <div>
          <div>{value ? 'on' : 'off'}</div>
          <button onClick={toggle} type="button">
            Toggle
          </button>
        </div>
      );
    };

    const { getByText } = render(<TestBed />);
    expect(getByText('off')).toBeVisible();

    user.click(getByText('Toggle'));
    expect(getByText('on')).toBeVisible();

    user.click(getByText('Toggle'));
    expect(getByText('off')).toBeVisible();
  });

  it(`can initialize with function callback`, () => {
    const TestBed = () => {
      const [value, toggle] = useBoolean(() => false);
      return (
        <div>
          <div>{value ? 'on' : 'off'}</div>
          <button onClick={toggle} type="button">
            Toggle
          </button>
        </div>
      );
    };

    const { getByText } = render(<TestBed />);
    expect(getByText('off')).toBeVisible();

    user.click(getByText('Toggle'));
    expect(getByText('on')).toBeVisible();

    user.click(getByText('Toggle'));
    expect(getByText('off')).toBeVisible();
  });
});
