import Head from 'next/head';
import Link from 'next/link';
import * as React from 'react';
import { LoginForm } from '../modules/auth/components/login-form';

export default function Login() {
  return (
    <div className="max-w-xs p-3 mx-auto">
      <Head>
        <title>Login - Shopit</title>
      </Head>
      <LoginForm />
      <p className="py-2">
        Don't have an account?{' '}
        <Link href="/signup">
          <a className="text-blue-700">Signup here</a>
        </Link>
        .
      </p>
    </div>
  );
}
