import { Link } from '@reach/router';
import React from 'react';
import { RegisterForm } from '../modules/auth/components/register-form';

function Signup() {
  return (
    <div className="container">
      <RegisterForm />
      <p>
        Already have an account? <Link to="/login">Login here</Link>.
      </p>
    </div>
  );
}

export default Signup;
