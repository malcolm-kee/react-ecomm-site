import PropTypes from 'prop-types';
import React from 'react';
import { Button } from './button';
import styles from './file-record.module.scss';
import { Progress } from './progress';

/**
 * `FileRecord` is used by `FileUpload` to show uploaded image.
 *
 * You could use it to render uploaded file if you use `FileUpload` as controlled component.
 */
export const FileRecord = props => {
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
        <span className={`${styles.icon} text-success`}>
          <span className="glyphicon glyphicon-ok" />
        </span>
      ) : (
        <span className={styles.btnPlaceholder} />
      )}
      <Button color="default" onClick={props.onRemove}>
        <span className="glyphicon glyphicon-remove" />
        <span className="sr-only">Remove</span>
      </Button>
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
      <small className={`text-danger ${styles.fileStatus}`}>
        Failed to Upload
      </small>
    </div>
    <span className={`${styles.icon} text-danger`}>
      <span className="glyphicon glyphicon-exclamation-sign" />
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
      <span className="glyphicon glyphicon-file" />
    </span>
  );
};
