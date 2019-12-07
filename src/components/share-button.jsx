import PropTypes from 'prop-types';
import React from 'react';
import { useTransientState } from '../hooks/use-transient-state';
import { copyText } from '../lib/copy';
import { isShareSupported, share } from '../lib/share';
import { Button } from './button';

/**
 * A button to share an URL using Web Share API.
 * Fallback to copy to clipboard when Web Share API is not supported.
 */
export const ShareButton = ({
  urlToShare,
  color = 'primary',
  label = 'Share',
  titleToShare = '',
  ...buttonProps
}) => {
  const [copied, setCopied] = useTransientState(false);

  const handleClick = () => {
    if (isShareSupported()) {
      share({
        url: urlToShare,
        title: titleToShare,
      });
    } else {
      copyText(urlToShare);
      setCopied(true);
    }
  };

  return (
    <Button
      onClick={handleClick}
      color={copied ? 'success' : color}
      {...buttonProps}
    >
      {copied ? 'Link copied!' : label}
    </Button>
  );
};

ShareButton.propTypes = {
  urlToShare: PropTypes.string.isRequired,
  color: PropTypes.oneOf([
    'default',
    'primary',
    'success',
    'info',
    'warning',
    'danger',
    'link',
  ]),
  label: PropTypes.node,
  /** title of the Share Popup. Note that this has no effect when we fallback to copy */
  titleToShare: PropTypes.string,
};
