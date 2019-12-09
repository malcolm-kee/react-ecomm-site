### Simple Usage

```jsx
import { FileUpload } from './file-upload';

<FileUpload multiple />;
```

### Clear After Upload

Use this when you show the uploaded image separately.

```jsx
import { FileUpload } from './file-upload';

const FileUploadUsage = () => {
  const [imageUrl, setImageUrl] = React.useState('');

  return (
    <div>
      <label>Add Profile Picture</label>
      {imageUrl && (
        <img
          src={imageUrl}
          style={{ display: 'block', maxWidth: 200, margin: '0 auto' }}
          alt=""
        />
      )}
      <FileUpload
        label={imageUrl ? 'Select Another Photo' : 'Add New Photo'}
        onNewFileAdded={setImageUrl}
        clearAfterUpload
      />
    </div>
  );
};

<FileUploadUsage />;
```
