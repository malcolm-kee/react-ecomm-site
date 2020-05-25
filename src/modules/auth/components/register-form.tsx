import { Button } from 'components/button';
import { Field } from 'components/field';
import { Form } from 'components/form';
import { Input } from 'components/input';
import { Label } from 'components/label';
import { Spinner } from 'components/spinner';
import { TextField } from 'components/text-field';
import { toast } from 'components/toast';
import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { UiStatus } from 'type';
import { register } from '../auth.service';

export function RegisterForm() {
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [avatar, setAvatar] = React.useState('');
  const [status, setStatus] = React.useState<UiStatus | 'success'>('idle');
  const submitRegistration = () => {
    setStatus('busy');
    register({
      email,
      name,
      password,
      avatar,
    })
      .then(() => {
        toast.success('You register successfully!', {
          autoClose: 2000,
        });
        setStatus('success');
      })
      .catch((err) => {
        setStatus('error');
        console.error(err);
      });
  };

  if (status === 'success') {
    return <Redirect to="/login" />;
  }

  const isSubmitting = status === 'busy';

  return (
    <Form
      title="Signup"
      onSubmit={(ev) => {
        ev.preventDefault();
        submitRegistration();
      }}
    >
      {isSubmitting && <Spinner />}
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
      <TextField
        label="Password"
        id="password"
        type="password"
        value={password}
        onChangeValue={setPassword}
        disabled={isSubmitting}
        required
        minLength={8}
      />
      <TextField
        label="Avatar URL"
        id="avatar"
        type="url"
        value={avatar}
        onChangeValue={setAvatar}
        disabled={isSubmitting}
      />
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
