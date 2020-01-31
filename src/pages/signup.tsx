import { Link } from '@reach/router';
import React from 'react';
import { RegisterForm } from '../modules/auth/components/register-form';

export function Signup() {
  return (
    <div className="max-w-xs p-3 mx-auto">
      <RegisterForm />
      <p className="py-2">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-700">
          Login here
        </Link>
        .
      </p>
    </div>
  );
}
