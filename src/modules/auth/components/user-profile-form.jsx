import { inject, observer } from 'mobx-react';
import React from 'react';
import { Button } from '../../../components/button';
import { Form } from '../../../components/form';
import { Spinner } from '../../../components/spinner';
import { TextField } from '../../../components/text-field';
import { Redirect } from '@reach/router';

function UserProfileFormView({
  id,
  initialEmail,
  initialName,
  updateProfile,
  updating,
  error
}) {
  const [email, setEmail] = React.useState(initialEmail);
  const [name, setName] = React.useState(initialName);
  const [msg, setMsg] = React.useState('');

  function handleSubmit(ev) {
    ev.preventDefault();
    setMsg('');
    updateProfile({
      id,
      email,
      name
    }).then(() => setMsg('Profile Updated.'));
  }

  return (
    <Form title="Your Details" onSubmit={handleSubmit}>
      {updating && <Spinner />}
      {msg && <div className="alert alert-success">{msg}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <TextField
        label="Name"
        value={name}
        onChangeValue={setName}
        disabled={updating}
      />
      <TextField
        label="Email"
        type="email"
        value={email}
        onChangeValue={setEmail}
        disabled={updating}
      />
      <Button type="submit" color="primary" disabled={updating}>
        Update
      </Button>
    </Form>
  );
}

export const UserProfileForm = inject('auth')(
  observer(function UserProfileForm({
    auth: { user, updateProfile, pending, error }
  }) {
    return user ? (
      <UserProfileFormView
        id={user.id}
        initialEmail={user.email}
        initialName={user.name}
        updateProfile={updateProfile}
        updating={pending}
        error={error}
      />
    ) : (
      <Redirect to="/" />
    );
  })
);
