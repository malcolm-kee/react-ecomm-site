```jsx
<SelectField
  label="Favourite"
  helpText="Pick wisely"
  options={[
    { label: 'JavaScript', value: 'js' },
    { label: 'TypeScript', value: 'ts' },
  ]}
  size="sm"
  status="success"
  required
/>
```

### Controlled Component

```jsx
import { Button } from './button';

const SelectFieldDemo = () => {
  const [value, setValue] = React.useState('');

  return (
    <>
      <SelectField
        label="Best Frontend Framework"
        value={value}
        onChangeValue={setValue}
      >
        <option value="react">React</option>
        <option value="ng">Angular</option>
        <option value="vue">Vue</option>
      </SelectField>
      <div>
        <Button onClick={() => setValue('react')} color="primary">
          Show Suggested Answer
        </Button>
      </div>
    </>
  );
};

<SelectFieldDemo />;
```
