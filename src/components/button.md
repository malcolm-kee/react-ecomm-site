### Color

```jsx
<>
  <Button color="default" className="whatever">
    Default
  </Button>
  <Button color="primary">Primary</Button>
  <Button color="success">Success</Button>
  <Button color="info">Info</Button>
  <Button color="warning">Warning</Button>
  <Button color="danger">Danger</Button>
  <Button color="link">Link</Button>
</>
```

### Size

```jsx
<Button color="primary" size="lg">
  Large
</Button>
<Button color="primary">Default</Button>
<Button color="primary" size="sm">
  Small
</Button>
<Button color="primary" size="xs">
  Mini
</Button>
```

### Demo of `useScrollOnMount`

```jsx
import { useScrollOnMount } from '../hooks/use-scroll-on-mount';
import { Button } from './button';

const ImportantContent = () => {
  const scrollTargetRef = useScrollOnMount();
  return (
    <div ref={scrollTargetRef}>
      <h4 className="h1">This is a random list</h4>
      <ul>
        <li>One</li>
        <li>Two</li>
        <li>Three</li>
        <li>Four</li>
        <li>One</li>
        <li>One</li>
        <li>One</li>
        <li>One</li>
      </ul>
    </div>
  );
};

const ScrollDemo = () => {
  const [show, setShow] = React.useState(false);

  return (
    <div>
      <div className="btn-toolbar">
        <Button color="warning" onClick={() => setShow((s) => !s)}>
          Show Scroll Effect
        </Button>
      </div>
      {show && <ImportantContent />}
    </div>
  );
};

<ScrollDemo />;
```
