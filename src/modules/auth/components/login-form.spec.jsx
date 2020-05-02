import { fireEvent, screen } from '@testing-library/react';
import * as React from 'react';
import { renderWithStateMgmt } from '../../../lib/test-util';
import { initAuthStatus } from '../auth.actions';
import { login as loginMock } from '../auth.service';
import { LoginForm } from './login-form';

jest.mock('../auth.service');

test(`<LoginForm />`, async () => {
  loginMock.mockImplementationOnce(() =>
    Promise.resolve({
      name: 'Malcolm',
    })
  );

  renderWithStateMgmt(<LoginForm />, {
    initialActions: [initAuthStatus()],
  });

  fireEvent.change(screen.getByLabelText('Email'), {
    target: {
      value: 'malcolm@gmail.com',
    },
  });

  fireEvent.click(screen.getByTestId('submitBtn'));

  await screen.findByText(`You're already login!`);
});
