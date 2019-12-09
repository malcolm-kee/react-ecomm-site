import cx from 'classnames';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useId } from '../hooks/use-id';
import { useLatest } from '../hooks/use-latest';
import { useLazyRef } from '../hooks/use-lazy-ref';
import { callAll } from '../lib/fn-lib';
import { getId } from '../lib/id';
import {
  cleanupFilePreviewUrl,
  getFilePreviewUrl,
  upload,
} from '../services/file.service';
import { FileRecord } from './file-record';
import styles from './file-upload.module.scss';

const uploadInitialState = {
  fileIds: [],
  files: {},
};

const uploadReducer = (state, action) => {
  switch (action.type) {
    case 'startUpload': {
      const errorIds = state.fileIds.filter(
        id => state.files[id] && state.files[id].status === 'error'
      );

      return {
        ...state,
        fileIds: state.fileIds.filter(
          fileId => errorIds.indexOf(fileId) === -1
        ),
        files: Object.keys(state.files).reduce(
          (result, fileId) =>
            errorIds.indexOf(fileId) === -1
              ? {
                  ...result,
                  [fileId]: state.files[fileId],
                }
              : result,
          {}
        ),
      };
    }

    case 'uploadFile': {
      const { payload } = action;
      return {
        ...state,
        fileIds: [payload.id].concat(state.fileIds),
        files: {
          ...state.files,
          [payload.id]: {
            ...payload,
            status: 'uploading',
            progress: 0,
          },
        },
      };
    }

    case 'removeFile': {
      const { payload } = action;
      return {
        ...state,
        fileIds: state.fileIds.filter(fileId => fileId !== payload.fileId),
        files: Object.keys(state.files).reduce(
          (result, fileId) =>
            fileId !== payload.fileId
              ? {
                  ...result,
                  [fileId]: state.files[fileId],
                }
              : result,
          {}
        ),
      };
    }

    case 'updateUploadProgress': {
      const { payload } = action;
      return {
        ...state,
        files: Object.keys(state.files).reduce(
          (result, fileId) => ({
            ...result,
            [fileId]:
              fileId === payload.fileId &&
              state.files[fileId].status === 'uploading'
                ? {
                    ...state.files[fileId],
                    progress: payload.progress,
                  }
                : state.files[fileId],
          }),
          {}
        ),
      };
    }

    case 'doneUpload': {
      const { payload } = action;
      if (payload.clear) {
        return {
          ...state,
          fileIds: state.fileIds.filter(fileId => fileId !== payload.fileId),
          files: Object.keys(state.files).reduce(
            (result, fileId) =>
              fileId !== payload.fileId
                ? {
                    ...result,
                    [fileId]: state.files[fileId],
                  }
                : result,
            {}
          ),
        };
      } else {
        return {
          ...state,
          files: Object.keys(state.files).reduce(
            (result, fileId) => ({
              ...result,
              [fileId]:
                fileId === payload.fileId
                  ? {
                      ...state.files[fileId],
                      status: 'uploaded',
                    }
                  : state.files[fileId],
            }),
            {}
          ),
        };
      }
    }

    case 'errorUpload': {
      const { payload } = action;
      return {
        ...state,
        files: Object.keys(state.files).reduce(
          (result, fileId) => ({
            ...result,
            [fileId]:
              fileId === payload.fileId
                ? {
                    ...state.files[fileId],
                    status: 'error',
                  }
                : state.files[fileId],
          }),
          {}
        ),
      };
    }

    default:
      return state;
  }
};

const actions = {
  startUpload: () => ({
    type: 'startUpload',
  }),
  uploadFile: file => ({
    type: 'uploadFile',
    payload: file,
  }),
  removeFile: ({ fileId }) => ({
    type: 'removeFile',
    payload: {
      fileId,
    },
  }),
  updateUploadProgress: ({ fileId, progress }) => ({
    type: 'updateUploadProgress',
    payload: {
      fileId,
      progress,
    },
  }),
  doneUpload: ({ fileId, clear }) => ({
    type: 'doneUpload',
    payload: {
      fileId,
      clear,
    },
  }),
  errorUpload: ({ fileId }) => ({
    type: 'errorUpload',
    payload: {
      fileId,
    },
  }),
};

const preventDefault = ev => {
  ev.stopPropagation();
  ev.preventDefault();
};

/**
 * `FileUpload` upload files and show progress for each individual upload.
 * It handles upload cancellation correctly.
 *
 * Unspecified props will be spreaded to the underlying `input` element.
 *
 * Note: This component does not work at the moment because the backend server is not ready.
 */
export const FileUpload = ({
  label = 'Upload File',
  clearAfterUpload,
  onNewFileAdded,
  onChange,
  children,
  ...props
}) => {
  const [uploadState, dispatch] = React.useReducer(
    uploadReducer,
    uploadInitialState
  );

  const id = useId(props.id);
  const latestOnNewFileAdded = useLatest(onNewFileAdded);
  const abortMap = useLazyRef(() => new Map());
  React.useEffect(() => {
    const map = abortMap.current;
    return function cleanup() {
      map.forEach(abortFn => abortFn());
    };
  }, [abortMap]);

  const handleFiles = filelist => {
    const files = Array.from(filelist);
    dispatch(actions.startUpload());

    files.forEach(file => {
      const fileId = getId();
      Promise.resolve(
        /^image\/*/.test(file.type)
          ? getFilePreviewUrl(file)
          : Promise.resolve('')
      ).then(previewUrl => {
        dispatch(
          actions.uploadFile({
            id: fileId,
            fileName: file.name,
            previewUrl,
          })
        );
        const abortUpload = upload(file, {
          onDone: (error, fileUrl) => {
            abortMap.current.delete(fileId);
            if (error) {
              dispatch(actions.errorUpload({ fileId }));
              return;
            }
            dispatch(actions.doneUpload({ fileId, clear: clearAfterUpload }));
            if (latestOnNewFileAdded.current) {
              latestOnNewFileAdded.current(fileUrl, file.name);
            }
          },
          onProgress: progress =>
            dispatch(actions.updateUploadProgress({ fileId, progress })),
        });
        abortMap.current.set(fileId, abortUpload);
      });
    });
  };

  const totalFiles = uploadState.fileIds.length;
  const [isDragOver, setIsDragOver] = React.useState(false);

  return (
    <div className={styles.root}>
      <div className={styles.dropZoneContainer}>
        <div
          className={cx(styles.dropZone, isDragOver && styles.dropZoneActive)}
          onDragEnter={ev => {
            preventDefault(ev);
            setIsDragOver(true);
          }}
          onDragLeave={ev => {
            preventDefault(ev);
            setIsDragOver(false);
          }}
          onDrop={ev => {
            preventDefault(ev);
            if (ev.dataTransfer.files) {
              handleFiles(ev.dataTransfer.files);
            }
            setIsDragOver(false);
          }}
          onDragOver={preventDefault}
        >
          <div className={styles.dropZoneLabel}>
            <p className="h4">Drop file here</p>
            <div>
              <small>or</small>
            </div>
          </div>
          <input
            type="file"
            {...props}
            id={id}
            className={`sr-only ${styles.input}`}
            onChange={callAll(onChange, ev => {
              if (ev.target.files) {
                handleFiles(ev.target.files);
              }
            })}
          />
          <label className="btn btn-primary" htmlFor={id}>
            {label}
          </label>
        </div>
      </div>
      {totalFiles > 0 && (
        <div>
          {uploadState.fileIds.map(fileId => {
            const file = uploadState.files[fileId];

            return file.status === 'error' ? (
              <FileRecord {...file} key={file.id} />
            ) : (
              <FileRecord
                {...file}
                onRemove={() => {
                  dispatch(actions.removeFile({ fileId: file.id }));
                  if (file.previewUrl) {
                    cleanupFilePreviewUrl(file.previewUrl);
                  }
                  const abort = abortMap.current.get(file.id);
                  if (abort) {
                    abort();
                  }
                }}
                key={file.id}
              />
            );
          })}
          {children}
        </div>
      )}
    </div>
  );
};

FileUpload.propTypes = {
  /**
   * label for the upload button
   *
   */
  label: PropTypes.string,
  /**
   * callback to get the file details that has been uploaded successfully
   */
  onNewFileAdded: PropTypes.func,
  /**
   * specify if the file record should be removed after upload successful.
   * You use this if you want to show the uploaded files separately.
   */
  clearAfterUpload: PropTypes.bool,
  children: PropTypes.node,
};
