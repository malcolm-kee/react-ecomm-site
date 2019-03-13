import { Link } from '@reach/router';
import React from 'react';
import { LoginForm } from '../modules/auth/components/login-form';

export function Login() {
  return (
    <div className="container">
      <LoginForm />
      <p>
        Don't have an account? <Link to="/signup">Signup here</Link>.
      </p>
    </div>
  );
}
