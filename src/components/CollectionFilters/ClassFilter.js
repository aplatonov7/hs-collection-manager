import React, { PropTypes } from 'react';
import classNames from 'classnames';

import classes from './ClassFilter.scss';

const filterTypes = ['Druid', 'Hunter', 'Mage', 'Paladin', 'Priest', 'Rogue', 'Shaman', 'Warlock', 'Warrior', 'Neutral'];

const classFilterNames = (pClass, activeClass) => classNames({
  [classes[pClass.toLowerCase()]]: true,
  hoverable: true,
  'z-depth-1': true,
  [classes.active]: activeClass === pClass
});

const ClassFilter = (props) => (
  <div className={props.styles}>
    {filterTypes.map((type, index) => (
      <div key={index}
           className={classFilterNames(type, props.activeFilter)}
           onClick={_ => props.onClassFilterChange(type)} title={type}></div>
    ))}
  </div>
);

ClassFilter.propTypes = {
  styles: PropTypes.string,
  activeFilter: PropTypes.string.isRequired,
  onClassFilterChange: PropTypes.func.isRequired
};

export default ClassFilter;
