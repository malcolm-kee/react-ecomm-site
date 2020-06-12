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
const [name, setName] = React.useState('')
<div>
  <div>{name}</div>
  <Input value={name} onChangeValue={setName} />
</div>;
```
