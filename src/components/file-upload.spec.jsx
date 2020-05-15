import {
  act,
  fireEvent,
  render,
  waitForElementToBeRemoved,
  screen,
} from '@testing-library/react';
import * as React from 'react';
import { user } from '../lib/test-util';
import { waitFor } from '../lib/wait-for';
import { upload as uploadMock } from '../services/file.service';
import { FileUpload } from './file-upload';

jest.mock('../services/file.service');

describe(`FileUpload`, () => {
  it(`allows upload of file`, async () => {
    uploadMock.mockImplementationOnce(successUploadImpl);

    render(<FileUpload />);

    fireEvent.change(screen.getByLabelText('Upload File'), {
      target: {},
    });

    fireEvent.change(screen.getByLabelText('Upload File'), {
      target: {
        files: [new File(['abcdeft'], 'alpabet.txt')],
      },
    });

    await screen.findByText('100% Complete');
  });

  it(`allows upload of file cleared when success`, async () => {
    uploadMock.mockImplementationOnce(successUploadImpl);

    const onNewFileAdded = jest.fn();

    render(<FileUpload clearAfterUpload onNewFileAdded={onNewFileAdded} />);

    const fileName = 'alphabet.txt';

    fireEvent.change(screen.getByLabelText('Upload File'), {
      target: {
        files: [new File(['abcdeft'], fileName)],
      },
    });

    await screen.findByText(fileName);

    await waitForElementToBeRemoved(() => screen.getByText(fileName));

    expect(onNewFileAdded).toHaveBeenCalledTimes(1);
  });

  it(`remove file while uploading`, async () => {
    uploadMock.mockImplementationOnce(successUploadImpl);

    render(<FileUpload />);

    const fileName = 'alphabet.txt';

    fireEvent.change(screen.getByLabelText('Upload File'), {
      target: {
        files: [new File(['abcdeft'], fileName)],
      },
    });

    const $removeBtn = await screen.findByText('Remove');
    expect(screen.getByText(fileName)).toBeVisible();

    user.click($removeBtn);
    expect(screen.queryByText(fileName)).toBeVisible();
  });

  it(`clear errored file upload when upload again`, async () => {
    uploadMock
      .mockImplementationOnce(errorUploadImpl)
      .mockImplementationOnce(successUploadImpl);

    render(<FileUpload />);

    fireEvent.change(screen.getByLabelText('Upload File'), {
      target: {
        files: [new File(['abcdeft'], 'alpabet.txt')],
      },
    });

    await screen.findByText('Failed to Upload');

    fireEvent.change(screen.getByLabelText('Upload File'), {
      target: {
        files: [new File(['tx,et,ts,bse'], 'alpabet.csv')],
      },
    });

    await screen.findByText('100% Complete');

    expect(screen.queryByText('Failed to Upload')).toBeNull();

    user.click(screen.getByLabelText('Remove'));
    expect(screen.queryByText('100% Complete')).toBeNull();
  });
});

const successUploadImpl = (file, { onDone, onProgress }) => {
  let isActive = true;

  waitFor(10)
    .then(() => {
      if (isActive) {
        act(() => {
          onProgress(40);
        });
      }
    })
    .then(() => waitFor(10))
    .then(() => {
      if (isActive) {
        act(() => {
          onProgress(80);
        });
      }
    })
    .then(() => waitFor(10))
    .then(() => {
      if (isActive) {
        act(() => onDone(null, `mockFileUrl/${file.name}`));
      }
    });

  return jest.fn(() => {
    isActive = false;
  });
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
