import Head from 'next/head';
import * as React from 'react';

export function CareerPageWrapper(props: { children: React.ReactNode }) {
  return (
    <div className="max-w-4xl mx-auto">
      <Head>
        <title>Careers - Shopit</title>
      </Head>
      <div className="block sm:hidden text-center">
        <img
          src="/images/server-woman.png"
          width="300"
          height="300"
          alt=""
          className="mx-auto"
        />
      </div>
      <div className="sm:flex items-center">
        <div className="flex-1 text-center sm:text-right">
          <h1 className="text-4xl sm:text-5xl text-gray-700">
            Careers in Shopit
          </h1>
          <p>Change the World, Differently</p>
        </div>
        <div className="hidden sm:block flex-1">
          <img src="/images/server-woman.png" width="600" height="600" alt="" />
        </div>
      </div>
      <div>{props.children}</div>
    </div>
  );
}
