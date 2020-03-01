import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { user } from '../lib/test-util';
import { Dialog } from './dialog';

describe(`<Dialog />`, () => {
  const TestBed = () => {
    const [show, setShow] = React.useState(false);

    return (
      <div>
        <button onClick={() => setShow(true)}>Open</button>
        <Dialog
          aria-label="Test Bed Dialog"
          isOpen={show}
          onDismiss={() => setShow(false)}
        >
          Content
        </Dialog>
      </div>
    );
  };

  it(`hide when closed, show when open`, () => {
    const { queryByText, getByText } = render(<TestBed />);

    expect(queryByText('Content')).toBeNull();
    user.click(getByText('Open'));

    expect(getByText('Content')).toBeVisible();

    fireEvent.keyDown(getByText('Content'), {
      key: 'Escape',
    });

    expect(queryByText('Content')).toBeNull();
  });
});
