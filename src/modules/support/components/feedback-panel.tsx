import { Button } from 'components/button';
import { Panel, PanelBody } from 'components/panel';
import { toast } from 'components/toast';
import * as React from 'react';

export const FeedbackPanel = (props: { className?: string }) => {
  const [hovered, setHovered] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const inverted = hovered || focused;

  const onFeedback = () => {
    toast('Thanks for your feedback! But we will not record it anywhere.', {
      type: 'success',
      autoClose: 3000,
    });
  };

  return (
    <Panel className={props.className}>
      <PanelBody>
        <p>Was this article helpful?</p>
        <div className="mt-2">
          <Button
            onClick={onFeedback}
            color={inverted ? 'danger' : 'success'}
            className="mr-1"
          >
            {inverted ? 'No ' : 'Yes '}
            <span role="img" aria-hidden>
              {inverted ? '👎' : '👍'}
            </span>
          </Button>
          <Button
            onClick={onFeedback}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            color={inverted ? 'success' : 'danger'}
          >
            {inverted ? 'Yes ' : 'No '}
            <span role="img" aria-hidden>
              {inverted ? '👍' : '👎'}
            </span>
          </Button>
        </div>
      </PanelBody>
    </Panel>
  );
};
