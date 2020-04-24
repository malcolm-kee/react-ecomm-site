import { render } from '@testing-library/react';
import * as React from 'react';
import { ShareButton } from './share-button';
import { user } from '../lib/test-util';

describe(`<ShareButton />`, () => {
  test(`It copy content and show Copied text for a while`, async () => {
    const { getByText, queryByText, findByText } = render(
      <ShareButton urlToShare="https://google.com" />
    );
    expect(getByText('Share')).toBeVisible();
    user.click(getByText('Share'));

    expect(queryByText('Share')).toBeNull();
    expect(getByText('Link copied!')).toBeVisible();

    const buttonAfterResume = await findByText('Share');

    expect(buttonAfterResume).toBeVisible();
  });
});
