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
import { AuthStatus } from '../auth.constants';
import { selectAuthError, selectAuthStatus } from '../auth.selectors';

function RegisterFormContent({ status, error, register, logout }) {
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');

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
      title="Signup"
      onSubmit={ev => {
        ev.preventDefault();
        register({ name, email });
      }}
    >
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
        <div className="flex">
          <span className="py-1 px-3 rounded-l-lg bg-gray-500 text-gray-100">
            @
          </span>
          <Input
            type="email"
            value={email}
            onChangeValue={setEmail}
            disabled={isSubmitting}
            required
            rounded={false}
            className="flex-1 rounded-r-lg"
          />
        </div>
      </Field>
      <div className="py-3">
        <Button
          color="primary"
          type="submit"
          disabled={isSubmitting}
          className="w-full"
        >
          Signup
        </Button>
      </div>
    </Form>
  );
}

const mapStates = state => ({
  status: selectAuthStatus(state),
  error: selectAuthError(state),
});

const mapDispatch = {
  register,
  logout: attemptLogout,
};

export const RegisterForm = connect(
  mapStates,
  mapDispatch
)(RegisterFormContent);
