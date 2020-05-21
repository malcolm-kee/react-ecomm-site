```jsx
<Spinner />
```

You can set `delayShow` for delaying the spinner to appear.

```jsx
import { Button } from './button';

const [show, setShow] = React.useState(true);

<div>
  {show && <Spinner delayShow={1000} />}
  <p>This is an example of `delayShow` of 1000 (1 sec).</p>
  <Button color="primary" onClick={() => setShow((prevShow) => !prevShow)}>
    {show ? 'Hide' : 'Show'} Spinner
  </Button>
</div>;
```
