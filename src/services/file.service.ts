const UPLOAD_SERVICE_BASE_URL =
  process.env.REACT_APP_UPLOAD_SERVICE_BASE_URL ||
  'https://ecomm-db.herokuapp.com/upload';

type UploadCallbacks = {
  onDone: (error: Error | null, fileUrl: string) => void;
  onProgress?: (percent: number) => void;
};

export const upload = (file: File, { onDone, onProgress }: UploadCallbacks) => {
  const xhr = new XMLHttpRequest();

  if (onProgress) {
    xhr.upload.addEventListener(
      'progress',
      ev => {
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

  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status >= 200 && xhr.status < 300) {
        const response = JSON.parse(xhr.responseText);
        onDone(null, response.files[0]);
      } else {
        onDone(new Error(xhr.responseText), '');
      }
    }
  };

  const formData = new FormData();

  formData.append('file', file);
  xhr.open('PUT', UPLOAD_SERVICE_BASE_URL);
  xhr.send(formData);

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
    reader.onload = ev => {
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
