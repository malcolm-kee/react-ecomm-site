```jsx
<TextField label="Age" helpText="Must be within 18 and 35" type="number" />
```

### Controlled Component

```jsx
const TextFieldDemo = () => {
  const [value, setValue] = React.useState('');

  return (
    <>
      <div>Length: {value.length}</div>
      <TextField label="Name" value={value} onChangeValue={setValue} />
    </>
  );
};

<TextFieldDemo />;
```
