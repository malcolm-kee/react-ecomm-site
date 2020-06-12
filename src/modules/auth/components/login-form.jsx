import { Alert } from 'components/alert';
import { Button } from 'components/button';
import { Field } from 'components/field';
import { Form } from 'components/form';
import { Input } from 'components/input';
import { Label } from 'components/label';
import { Spinner } from 'components/spinner';
import { TextField } from 'components/text-field';
import * as React from 'react';
import { connect } from 'react-redux';
import { attemptLogin, attemptLogout } from '../auth.actions';
import { AuthStatus } from '../auth.constants';
import { selectAuthError, selectAuthStatus } from '../auth.selectors';

function LoginFormContent({ status, error, login, logout }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  if (status === AuthStatus.Authenticated) {
    return (
      <Alert color="success">
        You're already login!
        <div>
          <Button onClick={logout} color="danger">
            Logout
          </Button>
        </div>
      </Alert>
    );
  }

  const isSubmitting = status === AuthStatus.Authenticating;

  return (
    <Form
      title="Login"
      data-testid="login-form"
      onSubmit={(ev) => {
        ev.preventDefault();
        login(email, password);
      }}
    >
      {isSubmitting && <Spinner />}
      {error && <Alert color="danger">{error}</Alert>}
      <Field>
        <Label>Email</Label>
        <div className="flex">
          <span className="py-1 px-3 rounded-l-lg bg-gray-500 text-gray-100">
            @
          </span>
          <Input
            type="email"
            value={email}
            onChangeValue={setEmail}
            required
            disabled={isSubmitting}
            rounded={false}
            className="flex-1 rounded-r-lg"
          />
        </div>
      </Field>
      <TextField
        label="Password"
        type="password"
        value={password}
        onChangeValue={setPassword}
        required
        disabled={isSubmitting}
      />
      <div className="py-3">
        <Button
          color="primary"
          type="submit"
          disabled={isSubmitting}
          className="w-full"
          data-testid="submit-login"
        >
          Login
        </Button>
      </div>
    </Form>
  );
}

export const LoginForm = connect(
  (state) => ({
    status: selectAuthStatus(state),
    error: selectAuthError(state),
  }),
  {
    login: attemptLogin,
    logout: attemptLogout,
  }
)(LoginFormContent);
