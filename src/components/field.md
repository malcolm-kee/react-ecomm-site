`Field` is usually used in conjunction with `Input`, `Label` and `HelpText`.

`Field` provides styling to those components as well as inject default properties to improve accessibility.

### Composition with Input, Label, and HelpText

```jsx
import { Input } from './input';
import { Label } from './label';
import { HelpText } from './help-text';

<Field status="success">
  <Label>Name</Label>
  <Input />
  <HelpText>The name is good.</HelpText>
</Field>;
```

### Customized Input

```jsx
import { Input } from './input';
import { Label } from './label';
import { HelpText } from './help-text';

<Field status="error">
  <Label>Email</Label>
  <div className="input-group">
    <span className="input-group-addon">@</span>
    <Input type="email" id="email" />
  </div>
  <HelpText>The email is wrong.</HelpText>
</Field>;
```
