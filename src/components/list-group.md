```jsx
<ListGroup
  items={[
    {
      label: (
        <>
          React<span className="badge">❤</span>
        </>
      ),
      active: true,
    },
    {
      label: 'Angular',
      disabled: true,
    },
    {
      label: 'Ember',
    },
    {
      label: 'Vue',
      variant: 'info',
    },
    {
      label: 'Svelte',
      variant: 'danger',
    },
  ]}
/>
```

### Button

When variant is `button`, you can add any props to the underlying button by adding additonal props to the `items` array, e.g. `onClick`.

```jsx
const ListGroupButtonExample = () => {
  const [activeItem, setActiveItem] = React.useState(null);
  const toggleActiveItem = (item) =>
    setActiveItem((prevItem) => (prevItem === item ? null : item));

  return (
    <ListGroup
      variant="button"
      items={[
        {
          label: 'React',
          active: activeItem === 'react',
          onClick: () => toggleActiveItem('react'),
        },
        {
          label: 'Angular',
          active: activeItem === 'ng',
          onClick: () => toggleActiveItem('ng'),
        },
        {
          label: 'Vue',
          active: activeItem === 'vue',
          onClick: () => toggleActiveItem('vue'),
        },
        ,
        {
          label: 'Svelte',
          active: activeItem === 'svelte',
          onClick: () => toggleActiveItem('svelte'),
          disabled: true,
        },
      ]}
    />
  );
};

<ListGroupButtonExample />;
```

### Link

```jsx
import { MemoryRouter, Switch, Route } from 'react-router-dom';

const HomePage = () => (
  <div>
    <h1>Home</h1>
  </div>
);
const HelpPage = () => (
  <div>
    <h1>Help</h1>
  </div>
);
const OthersPage = () => (
  <div>
    <h1>Other Stuff</h1>
  </div>
);

const LinkExample = () => {
  return (
    <MemoryRouter initialEntries={['/home']}>
      <div>
        <ListGroup
          variant="link"
          items={[
            {
              label: 'Home',
              to: '/home',
            },
            {
              label: 'Help',
              to: '/help',
            },
            {
              label: 'Others',
              to: '/others',
            },
          ]}
        />
      </div>
      <Switch>
        <Route path="/help" component={HelpPage} />
        <Route path="/others" component={OthersPage} />
        <Route path="/home" component={HomePage} />
      </Switch>
    </MemoryRouter>
  );
};

<LinkExample />;
```
