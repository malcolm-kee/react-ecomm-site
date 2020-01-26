import * as React from 'react';
import styles from './file-record.module.scss';
import { Progress } from './progress';
import { Button } from './button';
import { useId } from '../hooks/use-id';

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
      <Button
        color="default"
        aria-labelledby={`remove-btn-${id}`}
        onClick={props.onRemove}
      >
        <span className="glyphicon glyphicon-remove" />
      </Button>
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
      <span className="glyphicon glyphicon-file" />
    </span>
  );
};
