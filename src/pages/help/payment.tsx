import { FeedbackPanel } from 'modules/support/components/feedback-panel';
import { HelpPageWrapper } from 'modules/support/components/help-page-wrapper';
import * as React from 'react';

export default function HelpPayment() {
  return (
    <HelpPageWrapper>
      <article>
        <h2 className="text-2xl mb-2">Payment</h2>
        <p>Seriously u look for help for payment when you can't even pay?</p>
        <FeedbackPanel className="my-3" />
      </article>
    </HelpPageWrapper>
  );
}
