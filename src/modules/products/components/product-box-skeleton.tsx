import cx from 'classnames';
import * as React from 'react';

export const ProductBoxSkeleton = (props: { className?: string }) => {
  return (
    <div
      className={cx(
        'block p-2 sm:p-4 bg-gray-100 animate-pulse',
        props.className
      )}
      aria-hidden
    >
      <div
        style={{
          paddingBottom: '100%',
        }}
        className="w-full bg-gray-300 rounded"
      />
      <div className="mt-4">
        <p className="bg-gray-300 mb-2 h-3 w-16">&nbsp;</p>
        <p className="text-base my-1">
          <span className="inline-block w-24 bg-gray-300">&nbsp;</span>
        </p>
        <p className="flex text-gray-700 mt-1 items-baseline">
          RM <span className="inline-block ml-1 w-20 bg-gray-300">&nbsp;</span>
        </p>
      </div>
    </div>
  );
};
