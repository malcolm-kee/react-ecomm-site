### Pass options as props

```jsx
const options = [
  { label: 'React', value: 'react' },
  { label: 'Angular', value: 'ng' },
  { label: 'Vue', value: 'vue' }
];

const SelectOptionPropsDemo = () => {
  const [value, setValue] = React.useState('');

  return <Select value={value} onChangeValue={setValue} options={options} />;
};

<SelectOptionPropsDemo />;
```

### Pass option as children

```jsx
const SelectOptionsChildrenDemo = () => {
  const [value, setValue] = React.useState('');

  return (
    <Select value={value} size="lg" onChangeValue={setValue}>
      <option value="react">React</option>
      <option value="ng">Angular</option>
      <option value="vue">Vue</option>
    </Select>
  );
};

<SelectOptionsChildrenDemo />;
```

### All props of native select will be supported.

```jsx
<Select name="month" id="month-select" multiple>
  <option value="0">Jan</option>
  <option value="1">Feb</option>
  <option value="2">Mar</option>
  <option value="3">Apr</option>
  <option value="4">May</option>
  <option value="5">Jun</option>
</Select>
```
