import { Seo } from 'components/seo';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { RegisterForm } from '../modules/auth/components/register-form';

export function Signup() {
  return (
    <div className="max-w-sm p-3 mx-auto">
      <Seo title="Signup - Shopit" />
      <div className="px-3 sm:px-6 py-4 rounded-md shadow">
        <RegisterForm />
        <p className="py-2 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-700">
            Login here
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
