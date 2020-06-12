import { Alert } from 'components/alert';
import { Button } from 'components/button';
import { Field } from 'components/field';
import { Form } from 'components/form';
import { Input } from 'components/input';
import { Label } from 'components/label';
import { Spinner } from 'components/spinner';
import { TextField } from 'components/text-field';
import { inject, observer } from 'mobx-react';
import * as React from 'react';

function FormContent({ pending, error, login }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <Form
      title="Login"
      data-testid="login-form"
      onSubmit={(ev) => {
        ev.preventDefault();
        login(email, password);
      }}
    >
      {pending && <Spinner />}
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
            disabled={pending}
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
        disabled={pending}
      />
      <div className="py-3">
        <Button
          color="primary"
          type="submit"
          disabled={pending}
          className="w-full"
          data-testid="submit-login"
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

  return <FormContent login={login} pending={pending} error={error} />;
}

export const LoginForm = inject('auth')(observer(LoginFormContent));
