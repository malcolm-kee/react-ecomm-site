```jsx
import {
  Panel,
  PanelBody,
  PanelFooter,
  PanelHeading,
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
  <Panel color="primary" className="mb-2">
    <PanelHeading>Title</PanelHeading>
    <PanelBody>Content</PanelBody>
  </Panel>
  <Panel color="success" className="mb-2">
    <PanelHeading>Title</PanelHeading>
    <PanelBody>Content</PanelBody>
  </Panel>
  <Panel color="info" className="mb-2">
    <PanelHeading>Title</PanelHeading>
    <PanelBody>Content</PanelBody>
  </Panel>
  <Panel color="warning" className="mb-2">
    <PanelHeading>Title</PanelHeading>
    <PanelBody>Content</PanelBody>
  </Panel>
  <Panel color="danger" className="mb-2">
    <PanelHeading>Title</PanelHeading>
    <PanelBody>Content</PanelBody>
  </Panel>
</>;
```
