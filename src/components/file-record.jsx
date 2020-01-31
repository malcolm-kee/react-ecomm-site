import PropTypes from 'prop-types';
import React from 'react';
import { useId } from '../hooks/use-id';
import styles from './file-record.module.scss';
import { CheckIcon } from './icon/check-icon';
import { CloseIcon } from './icon/close-icon';
import { DocumentIcon } from './icon/document-icon';
import { ImportantIcon } from './icon/important-icon';
import { Progress } from './progress';

/**
 * `FileRecord` is used by `FileUpload` to show uploaded image.
 *
 * You could use it to render uploaded file if you use `FileUpload` as controlled component.
 */
export const FileRecord = props => {
  const id = useId();

  if (props.status === 'error') {
    return <FileErrorRecord {...props} />;
  }

  return (
    <div className={styles.fileRecord}>
      <FilePreview fileName={props.fileName} previewUrl={props.previewUrl} />
      <div className={styles.fileRecordDetails}>
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

FileRecord.propTypes = {
  status: PropTypes.oneOf(['uploading', 'uploaded', 'error']).isRequired,
  fileName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string,
  progress: PropTypes.number,
  onRemove: PropTypes.func,
};

const FileErrorRecord = props => (
  <div className={styles.fileRecord}>
    <FilePreview fileName={props.fileName} previewUrl={props.previewUrl} />
    <div className={styles.fileRecordDetails}>
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

const FilePreview = props => {
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
