import { FeedbackPanel } from 'modules/support/components/feedback-panel';
import { HelpPageWrapper } from 'modules/support/components/help-page-wrapper';
import * as React from 'react';

export default function HelpAccount() {
  return (
    <HelpPageWrapper>
      <article>
        <h2 className="text-2xl mb-2">Account</h2>
        <p>If you forget password, just create another one.</p>
        <p>We not gonna help you to reset password.</p>
        <FeedbackPanel className="my-3" />
      </article>
    </HelpPageWrapper>
  );
}
