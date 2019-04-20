import { inject, observer } from 'mobx-react';
import React from 'react';
import { Button } from '../../../components/button';
import { Field } from '../../../components/field';
import { Form } from '../../../components/form';
import { Input } from '../../../components/input';
import { Label } from '../../../components/label';
import { Spinner } from '../../../components/spinner';

function FormContent({ pending, error, login }) {
  const [email, setEmail] = React.useState('');

  const onSubmit = ev => {
    ev.preventDefault();
    login(email);
  };

  return (
    <Form title="Login" onSubmit={onSubmit}>
      {pending && <Spinner />}
      {error && <div className="alert alert-danger">{error}</div>}
      <Field>
        <Label>Email</Label>
        <div className="input-group">
          <span className="input-group-addon">@</span>
          <Input
            type="email"
            value={email}
            onChangeValue={setEmail}
            required
            disabled={pending}
          />
        </div>
      </Field>
      <Button color="primary" type="submit" disabled={pending}>
        Login
      </Button>
    </Form>
  );
}

function LoginFormContent({
  auth: { isAuthenticated, pending, error, login, logout }
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
