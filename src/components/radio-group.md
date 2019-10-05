### String value

```jsx
const RadioGroupExample = () => {
  const [value, setValue] = React.useState('');

  return (
    <>
      <div>
        <p>Value: {value}</p>
        <p>Type of value: {typeof value}</p>
      </div>
      <RadioGroup
        label="Best Organizer"
        value={value}
        name="organizer"
        onChangeValue={setValue}
        options={[
          {
            value: 'malcolm',
            label: 'Malcolm'
          },
          {
            value: 'wendy',
            label: 'Wendy'
          },
          {
            value: 'matt',
            label: 'Matthew'
          }
        ]}
      />
    </>
  );
};

<RadioGroupExample />;
```

### Number Value

```jsx
const RadioGroupExample = () => {
  const [value, setValue] = React.useState(null);

  return (
    <>
      {value !== null && (
        <div>
          <p>Value: {value}</p>
          <p>Type of value: {typeof value}</p>
        </div>
      )}
      <RadioGroup
        label="Lucky Number"
        value={value}
        name="luckNumber"
        onChangeValue={setValue}
        options={[
          {
            value: 0,
            label: 'Zero'
          },
          {
            value: 4,
            label: 'Four'
          },
          {
            value: 13,
            label: 'Thirteen'
          }
        ]}
      />
    </>
  );
};

<RadioGroupExample />;
```

### Object Value

```jsx
const options = [
  {
    label: 'Malcolm',
    value: {
      name: 'Malcolm',
      gender: 'male'
    }
  },
  {
    label: 'Wendy',
    value: {
      name: 'Wendy',
      gender: 'female'
    }
  },
  {
    label: 'Matt',
    value: {
      name: 'Matt',
      gender: 'male'
    }
  }
];

const RadioGroupExample = () => {
  const [value, setValue] = React.useState(null);

  return (
    <>
      {value !== null && (
        <div>
          Type of value: {typeof value}
          <pre>{JSON.stringify(value)}</pre>
        </div>
      )}
      <RadioGroup
        label="Lucky Person"
        value={value}
        name="luckyPerson"
        onChangeValue={setValue}
        options={options}
      />
    </>
  );
};

<RadioGroupExample />;
```
