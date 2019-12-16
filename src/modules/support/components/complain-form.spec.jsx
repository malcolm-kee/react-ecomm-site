import { act, fireEvent, render, waitForElement } from '@testing-library/react';
import user from '@testing-library/user-event';
import React from 'react';
import { toast as toastMock } from 'react-toastify';
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
    const { getByLabelText, getByText, debug } = render(<ComplainForm />);
    expect(scrollSpy).toHaveBeenCalledTimes(1);

    act(() =>
      user.selectOptions(
        getByLabelText('I want to make complain about'),
        'scam'
      )
    );

    act(() => user.click(getByText('Next')));

    const dateInput = await waitForElement(() =>
      getByLabelText('Date of incident')
    );

    act(() => {
      user.click(dateInput);
    });
    act(() => {
      user.click(getByText('12'));
    });

    fireEvent.change(getByLabelText('Upload File'), {
      target: {
        files: [
          new File(['Hello', 'hahah'], 'random.txt', {
            type: 'text/plain',
          }),
        ],
      },
    });

    act(() => user.click(getByText('Next')));

    await act(() => user.type(getByLabelText('Your Full Name'), 'Malcolm Kee'));
    await act(() =>
      user.type(getByLabelText('Your Phone Number'), '1122445588')
    );

    act(() => user.click(getByText('Submit')));

    expect(toastMock).toHaveBeenCalledTimes(1);
  });
});
