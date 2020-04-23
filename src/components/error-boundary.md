```jsx
import { Button } from './button';
import { ErrorBoundary } from './error-boundary';

let renderedTime = 0;

const BuggyComponent = (props) => {
  if (renderedTime) {
    return <div>OK Now</div>;
  }
  renderedTime++;

  return <div>{props.test.something}</div>;
};

const ErrorBoundaryDemo = (props) => {
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
