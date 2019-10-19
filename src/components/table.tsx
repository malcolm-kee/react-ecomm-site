import cx from 'classnames';
import React from 'react';

export type TableProps = {
  bordered?: boolean;
  condensed?: boolean;
  hover?: boolean;
  responsive?: boolean;
  striped?: boolean;
} & JSX.IntrinsicElements['table'];

/**
 * @see https://getbootstrap.com/docs/3.3/css/#tables
 */
export const Table = ({
  bordered,
  condensed,
  hover,
  responsive,
  striped,
  className,
  ...tableProps
}: TableProps) => {
  const tableNode = (
    <table
      className={cx(
        'table',
        striped && 'table-striped',
        bordered && 'table-bordered',
        hover && 'table-hover',
        condensed && 'table-condensed',
        className
      )}
      {...tableProps}
    />
  );

  return responsive ? (
    <div className="table-responsive">{tableNode}</div>
  ) : (
    tableNode
  );
};
