```jsx
const Demo = () => {
  const [value, setValue] = React.useState('1240');

  return (
    <div>
      <div className="space-x-2 flex">
        <NumberInput value={value} onChangeValue={setValue} />
        <NumberInput value={value} thousandSeparator="`" readOnly />
      </div>
      <div className="my-2 bg-gray-200 px-3 py-1">
        <output>value: {value}</output>
      </div>
    </div>
  );
};

<Demo />;
```
