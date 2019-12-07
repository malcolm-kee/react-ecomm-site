import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as React from 'react';
import { getId } from '../lib/id';
import { getFilePreviewUrl, upload } from '../services/file.service';
import styles from './file-upload.module.scss';

type FileData = {
  id: string;
  name: string;
  previewUrl: string;
  status: 'uploading' | 'error' | 'uploaded';
  progress: number;
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
    startUpload: state => {
      const errorIds = state.fileIds.filter(
        id => state.files[id] && state.files[id].status === 'error'
      );
      errorIds.forEach(errorId => {
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
      state.files[payload.fileId].progress = payload.progress;
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

type FileUploadProps = Omit<JSX.IntrinsicElements['input'], 'type'> & {
  label?: string;
  onChangeValue?: (value: string) => void;
  clearAfterUpload?: boolean;
};

export const FileUpload = ({
  label = 'Upload File',
  clearAfterUpload,
  ...props
}: FileUploadProps) => {
  const [uploadState, dispatch] = React.useReducer(
    uploadReducer,
    uploadInitialState
  );

  const [defaultId] = React.useState(() => getId());
  const id = props.id || defaultId;

  const handleFiles = (filelist: FileList) => {
    const files = Array.from(filelist);
    dispatch(actions.startUpload());

    files.forEach(file => {
      const fileId = getId();
      getFilePreviewUrl(file).then(previewUrl => {
        dispatch(
          actions.uploadFile({
            id: fileId,
            name: file.name,
            previewUrl,
          })
        );
        upload(file, {
          onDone: (error, fileUrl) => {
            if (error) {
              dispatch(actions.errorUpload({ fileId }));
              return;
            }
            dispatch(actions.doneUpload({ fileId, clear: clearAfterUpload }));
            console.log(fileUrl);
          },
          onProgress: progress =>
            dispatch(actions.updateUploadProgress({ fileId, progress })),
        });
      });
    });
  };

  const totalFiles = uploadState.fileIds.length;

  return (
    <div>
      <div>
        <input
          type="file"
          {...props}
          id={id}
          className="sr-only"
          onChange={ev => {
            if (ev.target.files) {
              handleFiles(ev.target.files);
            }
          }}
        />
        <label className="btn btn-primary" htmlFor={id}>
          {label}
        </label>
      </div>
      {totalFiles > 0 && (
        <ul className={styles.fileList}>
          {uploadState.fileIds
            .map(fileId => uploadState.files[fileId])
            .map(file => (
              <li className={styles.fileItem} key={file.id}>
                <FileRecord
                  file={file}
                  onRemove={() =>
                    dispatch(actions.removeFile({ fileId: file.id }))
                  }
                />
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

const FileRecord = (props: { file: FileData; onRemove: () => void }) => {
  const file = props.file;
  return (
    <div className={styles.fileRecord}>
      {file.previewUrl && (
        <img src={file.previewUrl} className={styles.preview} alt="" />
      )}
      <div className={styles.fileRecordDetails}>
        {file.name}
        {file.status === 'error' ? 'Failed to Upload' : `${file.progress}%`}
      </div>
      <button onClick={props.onRemove} type="button">
        Remove
      </button>
    </div>
  );
};
