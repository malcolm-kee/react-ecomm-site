import React from 'react';
import { connect } from 'react-redux';
import { Spinner } from '../../../components/spinner';
import { attemptLogin, attemptLogout } from '../auth.actions';
import { AuthStatus } from '../auth.constants';
import { selectAuthError, selectAuthStatus } from '../auth.selectors';

function LoginFormContent({ status, error, login, logout }) {
  if (status === AuthStatus.Authenticated) {
    return (
      <div className="alert alert-success">
        You're already login!
        <div>
          <button onClick={logout} className="btn btn-danger" type="button">
            Logout
          </button>
        </div>
      </div>
    );
  }

  const [email, setEmail] = React.useState('');

  const onSubmit = ev => {
    ev.preventDefault();
    login(email);
  };
  const isSubmitting = status === AuthStatus.Authenticating;

  return (
    <form onSubmit={onSubmit}>
      <legend>Login</legend>
      {isSubmitting && <Spinner />}
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          className="form-control"
          type="email"
          value={email}
          onChange={ev => setEmail(ev.target.value)}
          disabled={isSubmitting}
        />
      </div>
      <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
        Login
      </button>
    </form>
  );
}

const mapStates = state => ({
  status: selectAuthStatus(state),
  error: selectAuthError(state)
});

const mapDispatch = {
  login: attemptLogin,
  logout: attemptLogout
};

export const LoginForm = connect(
  mapStates,
  mapDispatch
)(LoginFormContent);
