import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { toast as toastMock } from 'react-toastify';
import { user } from '../../../lib/test-util';
import { ComplainForm } from './complain-form';
jest.mock('react-toastify');

let scrollSpy = jest.fn();

beforeAll(() => {
  scrollSpy = jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
});

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  scrollSpy.mockRestore();
});

describe(`<ComplainForm />`, () => {
  test('it allows user to provide complain info', async () => {
    const { getByLabelText, getByText, findByLabelText } = render(
      <ComplainForm />
    );
    expect(scrollSpy).toHaveBeenCalledTimes(1);

    user.selectOptions(getByLabelText('I want to make complain about'), 'scam');
    user.click(getByText('Next'));

    const dateInput = await findByLabelText('Date of incident');

    user.click(dateInput);
    user.click(getByText('12'));

    fireEvent.change(getByLabelText('Upload File'), {
      target: {
        files: [
          new File(['Hello', 'hahah'], 'random.txt', {
            type: 'text/plain',
          }),
        ],
      },
    });

    user.click(getByText('Next'));

    await user.type(getByLabelText('Your Full Name'), 'Malcolm Kee');
    await user.type(getByLabelText('Your Phone Number'), '1122445588');

    user.click(getByText('Submit'));

    expect(toastMock).toHaveBeenCalledTimes(1);
  });
});
