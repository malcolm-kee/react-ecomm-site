import { Link } from '@reach/router';
import React from 'react';
import { LoginForm } from '../modules/auth/components/login-form';

export function Login() {
  return (
    <div className="max-w-xs p-3 mx-auto">
      <LoginForm />
      <p className="py-2">
        Don't have an account?{' '}
        <Link className="text-blue-700" to="/signup">
          Signup here
        </Link>
        .
      </p>
    </div>
  );
}
