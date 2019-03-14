import React from 'react';
import { connect } from 'react-redux';
import { Button } from '../../../components/button';
import { Input } from '../../../components/input';
import { Form } from '../../../components/form';
import { Spinner } from '../../../components/spinner';
import { TextField } from '../../../components/text-field';
import { register, attemptLogout } from '../auth.actions';
import { AuthStatus } from '../auth.constants';
import { selectAuthError, selectAuthStatus } from '../auth.selectors';
import Field from '../../../components/field';
import Label from '../../../components/label';

function RegisterFormContent({ status, error, register, logout }) {
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');

  if (status === AuthStatus.Authenticated) {
    return (
      <div className="alert alert-success">
        You're already login!
        <div>
          <Button onClick={logout} color="danger">
            Logout
          </Button>
        </div>
      </div>
    );
  }

  const onSubmit = ev => {
    ev.preventDefault();
    register({ name, email });
  };
  const isSubmitting = status === AuthStatus.Authenticating;

  return (
    <Form title="Signup" onSubmit={onSubmit}>
      {isSubmitting && <Spinner />}
      {error && <div className="alert alert-danger">{error}</div>}
      <TextField
        label="Name"
        id="name"
        value={name}
        onChangeValue={setName}
        disabled={isSubmitting}
        required
      />
      <Field>
        <Label>Email</Label>
        <div className="input-group">
          <span className="input-group-addon">@</span>
          <Input
            type="email"
            value={email}
            onChangeValue={setEmail}
            disabled={isSubmitting}
            required
          />
        </div>
      </Field>
      <Button color="primary" type="submit" disabled={isSubmitting}>
        Signup
      </Button>
    </Form>
  );
}

const mapStates = state => ({
  status: selectAuthStatus(state),
  error: selectAuthError(state)
});

const mapDispatch = {
  register,
  logout: attemptLogout
};

export const RegisterForm = connect(
  mapStates,
  mapDispatch
)(RegisterFormContent);
