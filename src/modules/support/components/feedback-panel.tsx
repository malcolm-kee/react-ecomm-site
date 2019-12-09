import React from 'react';
import { toast } from 'react-toastify';
import { Button } from '../../../components/button';
import { Panel, PanelBody } from '../../../components/panel';

export const FeedbackPanel = () => {
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
    <Panel>
      <PanelBody>
        <p>Was this article helpful?</p>
        <div className="btn-toolbar">
          <Button onClick={onFeedback} color={inverted ? 'danger' : 'success'}>
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
