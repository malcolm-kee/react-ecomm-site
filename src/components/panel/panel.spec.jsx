import { render } from '@testing-library/react';
import React from 'react';
import { Panel, PanelBody, PanelFooter, PanelHeading } from './index';

test(`<Panel />`, () => {
  const { getByText } = render(
    <Panel color="default">
      <PanelHeading>Default Panel</PanelHeading>
      <PanelBody>
        <p>Some content, e.g. secret of top 10% richest people in the world.</p>
      </PanelBody>
      <PanelFooter>Footer Content</PanelFooter>
    </Panel>
  );

  expect(getByText('Footer Content')).toBeVisible();
});
