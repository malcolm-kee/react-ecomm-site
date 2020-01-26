import { act, fireEvent, render } from '@testing-library/react';
import React from 'react';
import { user } from '../lib/test-util';
import { waitFor } from '../lib/wait-for';
import { upload as uploadMock } from '../services/file.service';
import { FileUpload } from './file-upload';

jest.mock('../services/file.service');

describe(`FileUpload`, () => {
  it(`allows upload of file`, async () => {
    uploadMock.mockImplementationOnce(successUploadImpl);

    const { getByLabelText, findByText } = render(<FileUpload />);

    fireEvent.change(getByLabelText('Upload File'), {
      target: {
        files: [new File(['abcdeft'], 'alpabet.txt')],
      },
    });

    await findByText('100% Complete');
  });

  it(`clear errored file upload when upload again`, async () => {
    uploadMock
      .mockImplementationOnce(errorUploadImpl)
      .mockImplementationOnce(successUploadImpl);

    const { getByLabelText, findByText, queryByText } = render(<FileUpload />);

    fireEvent.change(getByLabelText('Upload File'), {
      target: {
        files: [new File(['abcdeft'], 'alpabet.txt')],
      },
    });

    await findByText('Failed to Upload');

    fireEvent.change(getByLabelText('Upload File'), {
      target: {
        files: [new File(['tx,et,ts,bse'], 'alpabet.csv')],
      },
    });

    await findByText('100% Complete');

    expect(queryByText('Failed to Upload')).toBeNull();

    user.click(getByLabelText('Remove'));
    expect(queryByText('100% Complete')).toBeNull();
  });
});

const successUploadImpl = (file, { onDone, onProgress }) => {
  waitFor(10)
    .then(() => {
      act(() => {
        onProgress(40);
      });
    })
    .then(() => waitFor(10))
    .then(() => {
      act(() => {
        onProgress(80);
      });
    })
    .then(() => waitFor(10))
    .then(() => {
      act(() => onDone(null, `mockFileUrl/${file.name}`));
    });

  return jest.fn();
};

const errorUploadImpl = (_, { onDone, onProgress }) => {
  waitFor(10)
    .then(() => {
      act(() => {
        onProgress(40);
      });
    })
    .then(() => waitFor(10))
    .then(() => {
      act(() => onDone(new Error('Network Error'), ''));
    });

  return jest.fn();
};
