import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Input } from '../components/input';
import { Jumbotron } from '../components/jumbotron';
import { ListGroup } from '../components/list-group';
import { ComplainForm } from '../modules/support/components/complain-form';
import { FeedbackPanel } from '../modules/support/components/feedback-panel';
import { Helmet } from 'react-helmet';

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

export function HelpPage() {
  return (
    <>
      <Helmet>
        <title>Help - Shopit</title>
      </Helmet>
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
                to: '/help/account',
                label: 'Account',
              },
              {
                to: '/help/payment',
                label: 'Payment',
              },
              {
                to: '/help/shipping',
                label: 'Shipping',
              },
              {
                to: '/help/complaint',
                label: 'Complaint',
              },
            ]}
          />
        </div>
        <div className="flex-1 px-5 pb-3">
          <Switch>
            <Route path="/help/account" component={HelpAccount} />
            <Route path="/help/payment" component={HelpPayment} />
            <Route path="/help/shipping" component={HelpShipping} />
            <Route path="/help/complaint" component={ComplainForm} />
            <Route path="/help" exact component={HelpLanding} />
          </Switch>
        </div>
      </div>
    </>
  );
}
