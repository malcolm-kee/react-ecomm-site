```jsx
import { FileRecord } from './file-record';

<>
  <FileRecord fileName="test.jpg" status="uploaded" progress={100} />
  <FileRecord fileName="test-uploading.jpg" status="uploading" progress={70} />
  <FileRecord fileName="test-error.jpg" status="error" />
</>;
```
