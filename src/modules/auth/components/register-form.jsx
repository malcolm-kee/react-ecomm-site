import React from 'react';
import { inject, observer } from 'mobx-react';
import { Button } from '../../../components/button';
import { Input } from '../../../components/input';
import { Form } from '../../../components/form';
import { Spinner } from '../../../components/spinner';
import { TextField } from '../../../components/text-field';
import Field from '../../../components/field';
import Label from '../../../components/label';

function RegisterFormContent({
  isAuthenticated,
  pending,
  error,
  register,
  logout
}) {
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');

  if (isAuthenticated) {
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

  return (
    <Form title="Signup" onSubmit={onSubmit}>
      {pending && <Spinner />}
      {error && <div className="alert alert-danger">{error}</div>}
      <TextField
        label="Name"
        id="name"
        value={name}
        onChangeValue={setName}
        disabled={pending}
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
            disabled={pending}
            required
          />
        </div>
      </Field>
      <Button color="primary" type="submit" disabled={pending}>
        Signup
      </Button>
    </Form>
  );
}

export const RegisterForm = inject('auth')(
  observer(function RegisterForm({
    auth: { isAuthenticated, pending, error, register, logout }
  }) {
    return (
      <RegisterFormContent
        isAuthenticated={isAuthenticated}
        pending={pending}
        error={error}
        register={register}
        logout={logout}
      />
    );
  })
);
