import { createRequest } from 'xhfetch';

const UPLOAD_SERVICE_BASE_URL = process.env
  .REACT_APP_UPLOAD_SERVICE_BASE_URL as string;

type UploadCallbacks = {
  onDone: (error: Error | null, fileUrl: string) => void;
  onProgress?: (percent: number) => void;
};

export const upload = (file: File, { onDone, onProgress }: UploadCallbacks) => {
  const formData = new FormData();
  formData.append('file', file);

  const { xhr, fetch } = createRequest(UPLOAD_SERVICE_BASE_URL, {
    method: 'PUT',
    body: formData,
  });

  if (onProgress) {
    xhr.upload.addEventListener(
      'progress',
      (ev) => {
        if (ev.lengthComputable) {
          const percentage = Math.round(100 * (ev.loaded / ev.total));
          onProgress(percentage);
        }
      },
      false
    );

    xhr.upload.addEventListener('load', () => {
      onProgress(100);
    });
  }

  fetch()
    .then((res) => {
      if (res.ok) {
        return res.json().then((res) => onDone(null, res.files[0]));
      }
      return res.text().then((text) => onDone(new Error(text), ''));
    })
    .catch((err) => {
      onDone(err, '');
    });

  return function abort() {
    xhr.abort();
  };
};

export const getFilePreviewUrl = (file: File): Promise<string> => {
  if (window.URL && typeof window.URL.createObjectURL === 'function') {
    return Promise.resolve(window.URL.createObjectURL(file));
  }
  return new Promise((fulfill, reject) => {
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target) {
        return fulfill(ev.target.result as string);
      }
      reject(new Error(`No result from file reader`));
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const cleanupFilePreviewUrl = (previewUrl: string) => {
  if (window.URL && typeof window.URL.revokeObjectURL === 'function') {
    try {
      window.URL.revokeObjectURL(previewUrl);
    } catch (err) {
      console.group(`Error when trying to revoke objectURL`);
      console.error(err);
      console.groupEnd();
    }
  }
};
