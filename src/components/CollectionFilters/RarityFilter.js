import React, { PropTypes } from 'react';
import classes from './RarityFilter.scss';

const filterTypes = ['None', 'Common', 'Rare', 'Epic', 'Legendary'];

const RarityFilter = (props) => (
  <div className={props.styles}>
    {filterTypes.map((type, index) => (
      <p key={index}>
        <input type='radio' name='rarityFilters' onChange={props.onRarityFilterChange}
               value={type}
               id={type + 'RarityFilter'}
               checked={props.activeFilter === (type === 'None' ? false : type)}
        />
        <label className={classes[type.toLowerCase() + 'Radio']} htmlFor={type + 'RarityFilter'}>{type}</label>
      </p>
    ))}
  </div>
);

RarityFilter.propTypes = {
  onRarityFilterChange: PropTypes.func.isRequired,
  activeFilter: PropTypes.string,
  styles: PropTypes.string
};

export default RarityFilter;
