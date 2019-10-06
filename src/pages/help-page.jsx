import { Router } from '@reach/router';
import React from 'react';
import { toast } from 'react-toastify';
import { Button } from '../components/button';
import { Input } from '../components/input';
import { Jumbotron } from '../components/jumbotron';
import { ListGroup } from '../components/list-group';
import { Panel, PanelBody } from '../components/panel';

const FeedbackPanel = () => {
  const onFeedback = () => {
    toast('Thanks for your feedback! But we will not record it anywhere.', {
      type: 'success',
      autoClose: 3000
    });
  };

  return (
    <Panel>
      <PanelBody>
        <p>Was this article helpful?</p>
        <div className="btn-toolbar">
          <Button onClick={onFeedback} color="primary">
            Yes{' '}
            <span role="img" aria-hidden>
              👍
            </span>
          </Button>
          <Button disabled>
            No
            <span role="img" aria-hidden>
              👎
            </span>
          </Button>
        </div>
      </PanelBody>
    </Panel>
  );
};

const HelpLanding = () => (
  <div>
    <p>Select a topic on the left.</p>
  </div>
);

const HelpAccount = () => (
  <article>
    <h1>Account</h1>
    <p>If you forget password, just create another one.</p>
    <p>We not gonna help you to reset password.</p>
    <FeedbackPanel />
  </article>
);

const HelpPayment = () => (
  <article>
    <h1>Payment</h1>
    <p>Seriously u look for help for payment when you can't even pay?</p>
    <FeedbackPanel />
  </article>
);

const HelpShipping = () => (
  <article>
    <h1>Shipping</h1>
    <p>All shipping will be delivered within 3-5 years. Please be patient.</p>
    <FeedbackPanel />
  </article>
);

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
                  label: 'Account'
                },
                {
                  to: 'payment',
                  label: 'Payment'
                },
                {
                  to: 'shipping',
                  label: 'Shipping'
                }
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
              </Router>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
