import Head from 'next/head';
import * as React from 'react';

function NotFoundPage() {
  return (
    <div className="max-w-lg mx-auto px-3 py-6">
      <Head>
        <title>Page Not Found - Shopit</title>
      </Head>
      <h1 className="text-4xl text-gray-700">Page Not Found</h1>
      <div className="py-3">
        <p>This is probably my fault.</p>
        <p>I'm sorry, but no free voucher for you.</p>
      </div>
    </div>
  );
}

export default NotFoundPage;
