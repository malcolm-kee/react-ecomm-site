import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { Button } from '../../../components/button';
import { Field } from '../../../components/field';
import { Form } from '../../../components/form';
import { Input } from '../../../components/input';
import { Label } from '../../../components/label';
import { Spinner } from '../../../components/spinner';

function FormContent({ pending, error, login }) {
  const [email, setEmail] = React.useState('');

  const onSubmit = (ev) => {
    ev.preventDefault();
    login(email);
  };

  return (
    <Form title="Login" onSubmit={onSubmit}>
      {pending && <Spinner />}
      {error && <div className="alert alert-danger">{error}</div>}
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
            disabled={pending}
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
          Login
        </Button>
      </div>
    </Form>
  );
}

function LoginFormContent({
  auth: { isAuthenticated, pending, error, login, logout },
}) {
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

  return <FormContent login={login} pending={pending} error={error} />;
}

export const LoginForm = inject('auth')(observer(LoginFormContent));
