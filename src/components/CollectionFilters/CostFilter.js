import React, { PropTypes } from 'react';
import classNames from 'classnames';

import classes from './CostFilter.scss';

const filterTypes = [0, 1, 2, 3, 4, 5, 6, 7];

const costFilterNames = (cost, activeFilter) => classNames({
  hoverable: true,
  'z-depth-1': activeFilter !== cost,
  'z-depth-2': activeFilter === cost,
  [classes.active]: activeFilter === cost
});

const CostFilter = (props) => (
  <div className={classes.costFilterWrap + ' ' + props.styles}>
    {filterTypes.map((type, index) => (
      <div key={index}
           className={costFilterNames(type, props.activeFilter)}
           onClick={_ => props.onCostFilterChange(type)}>
        {index === filterTypes.length - 1 ? type + '+' : type}
      </div>
    ))}
  </div>
);

CostFilter.propTypes = {
  styles: PropTypes.string,
  activeFilter: PropTypes.string.isRequired,
  onCostFilterChange: PropTypes.func.isRequired
};

export default CostFilter;
