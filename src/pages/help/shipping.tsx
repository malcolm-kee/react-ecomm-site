import { FeedbackPanel } from 'modules/support/components/feedback-panel';
import { HelpPageWrapper } from 'modules/support/components/help-page-wrapper';
import * as React from 'react';

export default function HelpShipping() {
  return (
    <HelpPageWrapper>
      <article>
        <h2 className="text-2xl mb-2">Shipping</h2>
        <p>
          All shipping will be delivered within 3-5 years. Please be patient.
        </p>
        <FeedbackPanel className="my-3" />
      </article>
    </HelpPageWrapper>
  );
}
