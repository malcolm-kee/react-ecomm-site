import { Input } from 'components/input';
import { Jumbotron } from 'components/jumbotron';
import { ListGroup } from 'components/list-group';
import Head from 'next/head';
import * as React from 'react';

export function HelpPageWrapper(props: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>Help - Shopit</title>
      </Head>
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
                href: '/help/account',
                label: 'Account',
              },
              {
                href: '/help/payment',
                label: 'Payment',
              },
              {
                href: '/help/shipping',
                label: 'Shipping',
              },
              {
                href: '/help/complaint',
                label: 'Complaint',
              },
            ]}
          />
        </div>
        <div className="flex-1 px-5 pb-3">{props.children}</div>
      </div>
    </>
  );
}
