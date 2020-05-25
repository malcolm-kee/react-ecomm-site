import * as React from 'react';
import { useTransientState } from '../hooks/use-transient-state';
import { copyText } from '../lib/copy';
import { isShareSupported, share } from '../lib/share';
import { Button, ButtonProps } from './button';

type ShareButtonProps = {
  urlToShare: string;
  label?: string;
  /** title of the Share Popup. Note that this has no effect when we fallback to copy */
  titleToShare?: string;
} & Omit<ButtonProps, 'ref' | 'children'>;

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
}: ShareButtonProps) => {
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
