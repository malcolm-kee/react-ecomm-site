import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

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
}) => {
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

Table.propTypes = {
  bordered: PropTypes.bool,
  condensed: PropTypes.bool,
  hover: PropTypes.bool,
  responsive: PropTypes.bool,
  striped: PropTypes.bool,
};
