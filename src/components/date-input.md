```jsx
import { DateInput } from './date-input';

<DateInput dateFormat="dd-M-yyyy" />;
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
