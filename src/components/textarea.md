```jsx
import { Button } from './button';

function TextareaExample() {
  const textareaRef = React.useRef();
  const [content, setContent] = React.useState('');

  function focusTextarea() {
    textareaRef.current.focus();
  }

  return (
    <div>
      <p>{content}</p>
      <Textarea value={content} onChangeValue={setContent} ref={textareaRef} />
      <Button color="info" onClick={focusTextarea}>
        Click to Focus Textarea
      </Button>
    </div>
  );
}

<TextareaExample />;
```
