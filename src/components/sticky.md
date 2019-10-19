```jsx
import { Alert } from './alert';

const StickyDemo = () => {
  const [showSticky, setShowSticky] = React.useState(false);

  return (
    <div>
      <button onClick={() => setShowSticky(!showSticky)}>
        {showSticky ? 'Hide Sticky Panel' : 'Show Sticky Panel'}
      </button>
      {showSticky && (
        <Sticky offsetTop={30}>
          <Alert color="danger" dismissible>
            Important! This is sticky
          </Alert>
        </Sticky>
      )}
    </div>
  );
};

<StickyDemo />;
```
