import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import cx from 'classnames';
import { useId } from 'hooks/use-id';
import { useLatest } from 'hooks/use-latest';
import { useLazyRef } from 'hooks/use-lazy-ref';
import { callAll } from 'lib/fn-lib';
import { getId } from 'lib/id';
import * as React from 'react';
import {
  cleanupFilePreviewUrl,
  getFilePreviewUrl,
  upload,
} from 'services/file.service';
import { Button } from './button';
import { FileRecord } from './file-record';
import styles from './file-upload.module.scss';

export type FileData =
  | {
      id: string;
      fileName: string;
      previewUrl: string;
      status: 'uploading' | 'uploaded';
      progress: number;
    }
  | {
      id: string;
      fileName: string;
      previewUrl: string;
      status: 'error';
    };

type FileUploadState = {
  fileIds: string[];
  files: Record<string, FileData>;
};

const uploadInitialState: FileUploadState = {
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
    uploadFile: (
      state,
      { payload }: PayloadAction<Omit<FileData, 'status' | 'progress'>>
    ) => {
      state.fileIds.splice(0, 0, payload.id);
      state.files[payload.id] = {
        ...payload,
        status: 'uploading',
        progress: 0,
      };
    },
    removeFile: (state, { payload }: PayloadAction<{ fileId: string }>) => {
      state.fileIds.splice(state.fileIds.indexOf(payload.fileId), 1);
      delete state.files[payload.fileId];
    },
    updateUploadProgress: (
      state,
      { payload }: PayloadAction<{ fileId: string; progress: number }>
    ) => {
      const file = state.files[payload.fileId];
      if (file.status === 'uploading') {
        file.progress = payload.progress;
      }
    },
    doneUpload: (
      state,
      { payload }: PayloadAction<{ fileId: string; clear?: boolean }>
    ) => {
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
    errorUpload: (state, { payload }: PayloadAction<{ fileId: string }>) => {
      state.files[payload.fileId].status = 'error';
    },
  },
});

const uploadReducer = fileUploadSlice.reducer;
const actions = fileUploadSlice.actions;

const preventDefault = (ev: React.SyntheticEvent) => {
  ev.stopPropagation();
  ev.preventDefault();
};

type FileUploadProps = Omit<JSX.IntrinsicElements['input'], 'type'> & {
  /**
   * label for the upload button
   *
   */
  label?: string;
  /**
   * callback to get the file details that has been uploaded successfully
   */
  onNewFileAdded?: (getUrl: string, fileName: string) => void;
  /**
   * specify if the file record should be removed after upload successful.
   * You use this if you want to show the uploaded files separately.
   */
  clearAfterUpload?: boolean;
  children?: React.ReactNode;
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
}: FileUploadProps) => {
  const [uploadState, dispatch] = React.useReducer(
    uploadReducer,
    uploadInitialState
  );

  const id = useId(props.id);
  const latestOnNewFileAdded = useLatest(onNewFileAdded);
  const abortMap = useLazyRef(() => new Map<string, () => void>());
  React.useEffect(() => {
    const map = abortMap.current;
    return function cleanup() {
      map.forEach((abortFn) => abortFn());
    };
  }, [abortMap]);

  const handleFiles = (filelist: FileList) => {
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
            className="my-2 cursor-pointer"
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
