import React from 'react';
import { connect } from 'react-redux';
import { Alert } from '../../../components/alert';
import { Button } from '../../../components/button';
import { Field } from '../../../components/field';
import { Form } from '../../../components/form';
import { Input } from '../../../components/input';
import { Label } from '../../../components/label';
import { Spinner } from '../../../components/spinner';
import { TextField } from '../../../components/text-field';
import { attemptLogout, register } from '../auth.actions';
import { selectAuthError, selectAuthStatus } from '../auth.selectors';

function RegisterFormContent({ status, error, register, logout }) {
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');

  if (status === 'Authenticated') {
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

  const onSubmit = ev => {
    ev.preventDefault();
    register({ name, email });
  };
  const isSubmitting = status === 'Authenticating';

  return (
    <Form title="Signup" onSubmit={onSubmit}>
      {isSubmitting && <Spinner />}
      {error && <Alert color="danger">{error}</Alert>}
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
