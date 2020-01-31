import { inject, observer } from 'mobx-react';
import React from 'react';
import { Button } from '../../../components/button';
import { Field } from '../../../components/field';
import { Form } from '../../../components/form';
import { Input } from '../../../components/input';
import { Label } from '../../../components/label';
import { Spinner } from '../../../components/spinner';
import { TextField } from '../../../components/text-field';

function RegisterFormContent({
  isAuthenticated,
  pending,
  error,
  register,
  logout,
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
        <div className="flex">
          <span className="py-1 px-3 rounded-l-lg bg-gray-500 text-gray-100">
            @
          </span>
          <Input
            type="email"
            value={email}
            onChangeValue={setEmail}
            disabled={pending}
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
          disabled={pending}
          className="w-full"
        >
          Signup
        </Button>
      </div>
    </Form>
  );
}

export const RegisterForm = inject('auth')(
  observer(function RegisterForm({
    auth: { isAuthenticated, pending, error, register, logout },
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
