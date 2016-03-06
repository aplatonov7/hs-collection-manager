import React, { PropTypes } from 'react';

const TextFilter = (props) => (
  <div className='row'>
    <div className='col s4 offset-s4'>
      <div className='input-field'>
        <input id='cardNameSearch' type='text' onChange={props.onTextFilterChange}/>

        <label htmlFor='cardNameSearch'>Card name</label>
      </div>
    </div>
  </div>
);

TextFilter.propTypes = {
  onTextFilterChange: PropTypes.func.isRequired
};

export default TextFilter;
