import { Router } from '@reach/router';
import React from 'react';
import { Input } from '../components/input';
import { Jumbotron } from '../components/jumbotron';
import { ListGroup } from '../components/list-group';
import { ComplainForm } from '../modules/support/components/complain-form';
import { FeedbackPanel } from '../modules/support/components/feedback-panel';

const HelpLanding = () => (
  <div>
    <p>Select a topic.</p>
  </div>
);

const HelpAccount = () => (
  <article>
    <h2 className="text-2xl mb-2">Account</h2>
    <p>If you forget password, just create another one.</p>
    <p>We not gonna help you to reset password.</p>
    <FeedbackPanel className="my-3" />
  </article>
);

const HelpPayment = () => (
  <article>
    <h2 className="text-2xl mb-2">Payment</h2>
    <p>Seriously u look for help for payment when you can't even pay?</p>
    <FeedbackPanel className="my-3" />
  </article>
);

const HelpShipping = () => (
  <article>
    <h2 className="text-2xl mb-2">Shipping</h2>
    <p>All shipping will be delivered within 3-5 years. Please be patient.</p>
    <FeedbackPanel className="my-3" />
  </article>
);

const ComplaintPage = () => <ComplainForm />;

export function HelpPage() {
  return (
    <>
      <Jumbotron>
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl lg:text-5xl text-gray-700 my-3">
            Hi, how can we help?
          </h1>
          <Input
            type="search"
            placeholder="Just kidding. I'm not gonna help you for anything."
          />
        </div>
      </Jumbotron>
      <div className="max-w-4xl mx-auto p-2 sm:flex">
        <div className="sm:w-32 mb-3">
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
        <div className="flex-1 px-5 pb-3">
          <Router>
            <HelpLanding path="/" />
            <HelpAccount path="/account" />
            <HelpPayment path="/payment" />
            <HelpShipping path="/shipping" />
            <ComplaintPage path="/complaint" />
          </Router>
        </div>
      </div>
    </>
  );
}
