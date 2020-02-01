import * as React from 'react';
import { useId } from '../hooks/use-id';
import styles from './file-record.module.scss';
import { CloseIcon } from './icon/close-icon';
import { Progress } from './progress';
import { CheckIcon } from './icon/check-icon';
import { DocumentIcon } from './icon/document-icon';
import { ImportantIcon } from './icon/important-icon';

type FileRecordProps =
  | {
      status: 'uploading' | 'uploaded';
      fileName: string;
      previewUrl?: string;
      progress: number;
      onRemove: () => void;
    }
  | {
      status: 'error';
      fileName: string;
      previewUrl?: string;
    };

/**
 * `FileRecord` is used by `FileUpload` to show uploaded image.
 *
 * You could use it to render uploaded file if you use `FileUpload` as controlled component.
 */
export const FileRecord = (props: FileRecordProps) => {
  const id = useId();

  if (props.status === 'error') {
    return <FileErrorRecord {...props} />;
  }

  return (
    <div className={styles.fileRecord}>
      <FilePreview fileName={props.fileName} previewUrl={props.previewUrl} />
      <div className="flex-1 min-w-0">
        <span className={styles.fileName}>{props.fileName}</span>
        <Progress
          percent={props.status === 'uploaded' ? 100 : props.progress}
          variant={props.status === 'uploaded' ? 'success' : undefined}
          thin
          className={styles.fileStatus}
        />
      </div>
      {props.status === 'uploaded' ? (
        <span className={`${styles.icon} text-green-500`}>
          <CheckIcon width={36} className="fill-current" />
        </span>
      ) : (
        <span className={styles.btnPlaceholder} />
      )}
      <button
        type="button"
        aria-labelledby={`remove-btn-${id}`}
        onClick={props.onRemove}
        className="px-2 py-1 text-gray-600"
      >
        <CloseIcon className="fill-current" />
      </button>
      <span className="sr-only" id={`remove-btn-${id}`}>
        Remove
      </span>
    </div>
  );
};

const FileErrorRecord = (
  props: Extract<FileRecordProps, { status: 'error' }>
) => (
  <div className={styles.fileRecord}>
    <FilePreview fileName={props.fileName} previewUrl={props.previewUrl} />
    <div className="flex-1 min-w-0">
      <span className={styles.fileName}>{props.fileName}</span>
      <small className={`text-red-600 ${styles.fileStatus}`}>
        Failed to Upload
      </small>
    </div>
    <span className={`${styles.icon} text-red-500`}>
      <ImportantIcon className="fill-current" width={36} />
    </span>
    <span className={styles.btnPlaceholder} />
  </div>
);

const FilePreview = (props: { fileName: string; previewUrl?: string }) => {
  const isImage =
    props.previewUrl && /(.jpe?g|.gif|.png)$/i.test(props.fileName);

  return isImage ? (
    <img
      src={props.previewUrl}
      className={styles.preview}
      alt={`Preview for ${props.fileName}`}
    />
  ) : (
    <span className={styles.preview}>
      <DocumentIcon className="fill-current text-gray-500" />
    </span>
  );
};
