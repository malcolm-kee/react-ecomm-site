import Head from 'next/head';
import Link from 'next/link';
import * as React from 'react';
import { RegisterForm } from '../modules/auth/components/register-form';

export default function Signup() {
  return (
    <div className="max-w-xs p-3 mx-auto">
      <Head>
        <title>Signup - Shopit</title>
      </Head>
      <RegisterForm />
      <p className="py-2">
        Already have an account?{' '}
        <Link href="/login">
          <a className="text-blue-700">Login here</a>
        </Link>
        .
      </p>
    </div>
  );
}
