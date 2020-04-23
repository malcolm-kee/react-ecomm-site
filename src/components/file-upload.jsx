import { createSlice } from '@reduxjs/toolkit';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
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
import { Button } from './button';
import { FileRecord } from './file-record';
import styles from './file-upload.module.scss';

const uploadInitialState = {
  fileIds: [],
  files: {},
};

const fileUploadSlice = createSlice({
  name: 'fileUpload',
  initialState: uploadInitialState,
  reducers: {
    startUpload: (state) => {
      const errorIds = state.fileIds.filter(
        (id) => state.files[id] && state.files[id].status === 'error'
      );
      errorIds.forEach((errorId) => {
        state.fileIds.splice(state.fileIds.indexOf(errorId), 1);
        delete state.files[errorId];
      });
    },
    uploadFile: (state, { payload }) => {
      state.fileIds.splice(0, 0, payload.id);
      state.files[payload.id] = {
        ...payload,
        status: 'uploading',
        progress: 0,
      };
    },
    removeFile: (state, { payload }) => {
      state.fileIds.splice(state.fileIds.indexOf(payload.fileId), 1);
      delete state.files[payload.fileId];
    },
    updateUploadProgress: (state, { payload }) => {
      const file = state.files[payload.fileId];
      if (file.status === 'uploading') {
        file.progress = payload.progress;
      }
    },
    doneUpload: (state, { payload }) => {
      if (payload.clear) {
        state.fileIds.splice(state.fileIds.indexOf(payload.fileId), 1);
        delete state.files[payload.fileId];
      } else {
        const file = state.files[payload.fileId];
        if (file) {
          state.files[payload.fileId].status = 'uploaded';
        }
      }
    },
    errorUpload: (state, { payload }) => {
      state.files[payload.fileId].status = 'error';
    },
  },
});

const uploadReducer = fileUploadSlice.reducer;
const actions = fileUploadSlice.actions;

const preventDefault = (ev) => {
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
      map.forEach((abortFn) => abortFn());
    };
  }, [abortMap]);

  const handleFiles = (filelist) => {
    const files = Array.from(filelist);
    dispatch(actions.startUpload());

    files.forEach((file) => {
      const fileId = getId();
      Promise.resolve(
        /^image\/*/.test(file.type)
          ? getFilePreviewUrl(file)
          : Promise.resolve('')
      ).then((previewUrl) => {
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
          onProgress: (progress) =>
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
          onDragEnter={(ev) => {
            preventDefault(ev);
            setIsDragOver(true);
          }}
          onDragLeave={(ev) => {
            preventDefault(ev);
            setIsDragOver(false);
          }}
          onDrop={(ev) => {
            preventDefault(ev);
            if (ev.dataTransfer.files) {
              handleFiles(ev.dataTransfer.files);
            }
            setIsDragOver(false);
          }}
          onDragOver={preventDefault}
        >
          <div className={styles.dropZoneLabel}>
            <p className="text-lg my-2 text-blue-700">Drop file here</p>
            <div>
              <small>or</small>
            </div>
          </div>
          <input
            type="file"
            {...props}
            id={id}
            className={`sr-only ${styles.input}`}
            onChange={callAll(onChange, (ev) => {
              if (ev.target.files) {
                handleFiles(ev.target.files);
              }
            })}
          />
          <Button
            color="primary"
            className="my-2"
            renderContainer={({ className, children }) => (
              <label className={className} htmlFor={id}>
                {children}
              </label>
            )}
          >
            {label}
          </Button>
        </div>
      </div>
      {totalFiles > 0 && (
        <div>
          {uploadState.fileIds.map((fileId) => {
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
