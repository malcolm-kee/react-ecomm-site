### Simple Usage

```jsx
import { DateInput } from './date-input';

<DateInput />;
```

### Controlled Element

```jsx
import { DateInput } from './date-input';
import { SelectField } from './select-field';

const ControlledExample = () => {
  const [value, setValue] = React.useState('');

  return (
    <div>
      <DateInput value={value} onChangeValue={setValue} />
      <SelectField
        label="Important Festival"
        value={value}
        onChangeValue={setValue}
        options={[
          { label: 'Christmas', value: '25-12-2019' },
          { label: 'New Year', value: '01-01-2020' }
        ]}
      />
    </div>
  );
};

<ControlledExample />;
```

### Use with Field

```jsx
import { DateInput } from './date-input';
import { Field } from './field';
import { Label } from './label';

<Field>
  <Label>Birth Date</Label>
  <DateInput />
</Field>;
```

### Custom Format

```jsx
import { DateInput } from './date-input';

const CustomFormatDemo = () => {
  const [value, setValue] = React.useState('');
  return (
    <div>
      <DateInput
        value={value}
        onChangeValue={setValue}
        dateFormat="dd-M-yyyy"
      />
      <p>Value is {value}</p>
    </div>
  );
};

<CustomFormatDemo />;
```
