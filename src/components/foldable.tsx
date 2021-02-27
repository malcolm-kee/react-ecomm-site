import cx from 'classnames';
import * as React from 'react';

export interface FoldableProps {
  topContent: React.ReactNode;
  bottomContent: React.ReactNode;
  backContent?: React.ReactNode;
  /**
   * a number between 0 and 100: 0 means not folded at all while 100 means fully folded
   */
  percentage: number;
  width: number;
  height: number;
  wrapperClass?: string;
}

export const Foldable = (props: FoldableProps) => {
  const sharedStyles = {
    width: props.width,
    height: props.height / 2,
  };

  return (
    <div
      style={{
        width: props.width,
        perspective: 500,
        transform: `translateY(${(props.percentage * props.height) / 400}px)`,
        willChange: 'transform',
      }}
      className={cx(
        props.wrapperClass,
        'transition-transform ease-in-out duration-500 pointer-events-none'
      )}
    >
      <div
        className="bg-white rounded-t-lg border-t border-l border-r border-gray-300 pointer-events-auto"
        style={sharedStyles}
      >
        {props.topContent}
      </div>
      <div
        className="bg-white rounded-b-lg border-b border-l border-r border-gray-300 transition-transform ease-in-out duration-500 pointer-events-auto"
        style={{
          ...sharedStyles,
          transform: `rotateX(${convertPercentageToDegree(
            props.percentage
          )}deg)`,
          transformOrigin: 'center top',
          willChange: 'transform',
          transformStyle: 'preserve-3d',
        }}
      >
        {props.bottomContent}
        <div
          className="absolute inset-0 bg-gray-300 rounded-t-lg overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateX(180deg) translateZ(2px)',
          }}
        >
          <div
            className="absolute inset-0 bg-black transition-opacity ease-in-out duration-500"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'translateZ(2px)',
              opacity: 1 - props.percentage / 100 + 0.05,
            }}
          ></div>
          {props.backContent}
        </div>
      </div>
    </div>
  );
};

const convertPercentageToDegree = (percent: number) => percent * 1.8;

// 100 -> 180
// 0 -> 0
