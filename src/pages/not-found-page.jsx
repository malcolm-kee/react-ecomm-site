import React from 'react';
import { Seo } from '../components/seo';

export function NotFoundPage() {
  return (
    <div className="max-w-lg mx-auto px-3 py-6">
      <Seo title="Page Not Found - Shopit" />
      <h1 className="text-4xl text-gray-700">Page Not Found</h1>
      <div className="py-3">
        <p>This is probably my fault.</p>
        <p>I'm sorry, but no free voucher for you.</p>
      </div>
    </div>
  );
}
