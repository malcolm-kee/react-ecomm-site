```jsx
<ListGroup
  items={[
    {
      label: (
        <>
          React<span className="badge">❤</span>
        </>
      ),
      active: true
    },
    {
      label: 'Angular',
      disabled: true
    },
    {
      label: 'Ember'
    },
    {
      label: 'Vue',
      variant: 'info'
    },
    {
      label: 'Svelte',
      variant: 'danger'
    }
  ]}
/>
```

### Button

When variant is `button`, you can add any props to the underlying button by adding additonal props to the `items` array, e.g. `onClick`.

```jsx
const ListGroupButtonExample = () => {
  const [activeItem, setActiveItem] = React.useState(null);
  const toggleActiveItem = item =>
    setActiveItem(prevItem => (prevItem === item ? null : item));

  return (
    <ListGroup
      variant="button"
      items={[
        {
          label: 'React',
          active: activeItem === 'react',
          onClick: () => toggleActiveItem('react')
        },
        {
          label: 'Angular',
          active: activeItem === 'ng',
          onClick: () => toggleActiveItem('ng')
        },
        {
          label: 'Vue',
          active: activeItem === 'vue',
          onClick: () => toggleActiveItem('vue')
        }
      ]}
    />
  );
};

<ListGroupButtonExample />;
```

### Link

```jsx
import {
  createHistory,
  createMemorySource,
  LocationProvider,
  Router
} from '@reach/router';

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

const history = createHistory(createMemorySource('/'));

const LinkExample = () => {
  return (
    <LocationProvider history={history}>
      <div>
        <ListGroup
          variant="link"
          items={[
            {
              label: 'Home',
              to: '/'
            },
            {
              label: 'Help',
              to: '/help'
            },
            {
              label: 'Others',
              to: '/others'
            }
          ]}
        />
      </div>
      <Router>
        <HomePage path="/" />
        <HelpPage path="/help" />
        <OthersPage path="/others" />
      </Router>
    </LocationProvider>
  );
};

<LinkExample />;
```
