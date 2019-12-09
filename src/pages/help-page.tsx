import { RouteComponentProps, Router } from '@reach/router';
import React from 'react';
import { Input } from '../components/input';
import { Jumbotron } from '../components/jumbotron';
import { ListGroup } from '../components/list-group';
import { FeedbackPanel } from '../modules/support/components/feedback-panel';
import { ComplainForm } from '../modules/support/components/complain-form';

const HelpLanding = (_: RouteComponentProps) => (
  <div>
    <p>Select a topic on the left.</p>
  </div>
);

const HelpAccount = (_: RouteComponentProps) => (
  <article>
    <h1>Account</h1>
    <p>If you forget password, just create another one.</p>
    <p>We not gonna help you to reset password.</p>
    <FeedbackPanel />
  </article>
);

const HelpPayment = (_: RouteComponentProps) => (
  <article>
    <h1>Payment</h1>
    <p>Seriously u look for help for payment when you can't even pay?</p>
    <FeedbackPanel />
  </article>
);

const HelpShipping = (_: RouteComponentProps) => (
  <article>
    <h1>Shipping</h1>
    <p>All shipping will be delivered within 3-5 years. Please be patient.</p>
    <FeedbackPanel />
  </article>
);

const ComplaintPage = (_: RouteComponentProps) => <ComplainForm />;

export function HelpPage() {
  return (
    <>
      <Jumbotron>
        <div className="container">
          <h1>Hi, how can we help?</h1>
          <Input
            type="search"
            placeholder="Just kidding. I'm not gonna help you for anything."
          />
        </div>
      </Jumbotron>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-3">
            <ListGroup
              variant="link"
              items={[
                {
                  to: 'account',
                  label: 'Account',
                },
                {
                  to: 'payment',
                  label: 'Payment',
                },
                {
                  to: 'shipping',
                  label: 'Shipping',
                },
                {
                  to: 'complaint',
                  label: 'Complaint',
                },
              ]}
            />
          </div>
          <div className="col-xs-12 col-sm-9">
            <main>
              <Router>
                <HelpLanding path="/" />
                <HelpAccount path="/account" />
                <HelpPayment path="/payment" />
                <HelpShipping path="/shipping" />
                <ComplaintPage path="/complaint" />
              </Router>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
