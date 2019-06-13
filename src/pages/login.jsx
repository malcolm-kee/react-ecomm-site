import { Link } from 'gatsby';
import React from 'react';
import { LoginForm } from '../modules/auth/components/login-form';

function Login() {
  return (
    <div className="container">
      <LoginForm />
      <p>
        Don't have an account? <Link to="/signup">Signup here</Link>.
      </p>
    </div>
  );
}

export default Login;
