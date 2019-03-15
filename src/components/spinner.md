```jsx
<Spinner />
```

You can set `delayShow` for delaying the spinner to appear.

```jsx
import { Button } from './button';

initialState = { show: true };

<div>
  {state.show && <Spinner delayShow={1000} />}
  <p>This is an example of `delayShow` of 1000 (1 sec).</p>
  <Button
    color="primary"
    onClick={() => setState(prevState => ({ show: !prevState.show }))}
  >
    {state.show ? 'Hide' : 'Show'} Spinner
  </Button>
</div>;
```
