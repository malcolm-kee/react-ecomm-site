```jsx
import { Button } from './button';
import { ErrorBoundary } from './error-boundary';

const BuggyComponent = props => <div>{props.test.something}</div>;

const ErrorBoundaryDemo = props => {
  const [show, setShow] = React.useState(false);

  return (
    <div>
      <Button color="danger" onClick={() => setShow(true)}>
        Click Me to See Error
      </Button>
      {show && <BuggyComponent />}
    </div>
  );
};

<ErrorBoundary>
  <ErrorBoundaryDemo />
</ErrorBoundary>;
```
