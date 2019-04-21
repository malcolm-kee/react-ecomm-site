import React from 'react';
import { UserProfileForm } from '../modules/auth/components/user-profile-form';

export function ProfilePage() {
  return (
    <div className="container">
      <h1>Your Account</h1>
      <UserProfileForm />
    </div>
  );
}
