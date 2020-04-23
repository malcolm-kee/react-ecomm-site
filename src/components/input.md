```jsx
import { Field } from './field';
import { Label } from './label';
<>
  <Field>
    <Label>Small Input</Label>
    <Input size="sm" />
  </Field>
  <Field>
    <Label>Default Input</Label>
    <Input />
  </Field>
  <Field>
    <Label>Large Input</Label>
    <Input size="lg" />
  </Field>
</>;
```

### Controlled Example

```jsx
initialState = { name: '' };
<div>
  <div>{state.name}</div>
  <Input value={state.name} onChangeValue={(name) => setState({ name })} />
</div>;
```
