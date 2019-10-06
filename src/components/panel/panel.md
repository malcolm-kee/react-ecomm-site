```jsx
import {
  Panel,
  PanelBody,
  PanelFooter,
  PanelHeading
} from '../../components/panel';

<Panel color="default">
  <PanelHeading>Default Panel</PanelHeading>
  <PanelBody>
    <p>Some content, e.g. secret of top 10% richest people in the world.</p>
  </PanelBody>
  <PanelFooter>Copyright &copy; 2050</PanelFooter>
</Panel>;
```

### Color

```jsx
import { Panel, PanelBody, PanelHeading } from '../../components/panel';

<>
  <Panel color="primary">
    <PanelHeading>Title</PanelHeading>
    <PanelBody>Content</PanelBody>
  </Panel>
  <Panel color="success">
    <PanelHeading>Title</PanelHeading>
    <PanelBody>Content</PanelBody>
  </Panel>
  <Panel color="info">
    <PanelHeading>Title</PanelHeading>
    <PanelBody>Content</PanelBody>
  </Panel>
  <Panel color="warning">
    <PanelHeading>Title</PanelHeading>
    <PanelBody>Content</PanelBody>
  </Panel>
  <Panel color="danger">
    <PanelHeading>Title</PanelHeading>
    <PanelBody>Content</PanelBody>
  </Panel>
</>;
```
