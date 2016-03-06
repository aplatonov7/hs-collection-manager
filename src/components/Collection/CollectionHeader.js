import React, { PropTypes } from 'react';
import classes from './CollectionHeader.scss';

import RarityFilter from 'components/CollectionFilters/RarityFilter';
import ClassFilter from 'components/CollectionFilters/ClassFilter';
import CostFilter from 'components/CollectionFilters/CostFilter';

const HeaderLeft = (props) => (
  <div className='col s4'>
    <div className={classes.btnGroup}>
        <span className='waves-effect waves-light btn light-blue darken-4' onClick={props.onSaveClick}>
          <i className='material-icons left'>call_received</i>Save
        </span>
        <span className='waves-effect waves-light btn light-blue darken-4' onClick={props.onLoadClick}>
          <i className='material-icons left'>call_made</i>Load
        </span>
    </div>
    <div className={classes.dustInfo}>
      Dust needed to finish the collection: {props.dust}
    </div>
    <p className='grey-text text-lighten-3'>No register\login required to use the application. The collection
      saves to\loads from your browser, so you will always get your restored collection as long as you use the
      same browser. You also can import\export your collection via json file (click on icons near titles)</p>
  </div>
);

HeaderLeft.propTypes = {
  dust: PropTypes.number,
  onSaveClick: PropTypes.func.isRequired,
  onLoadClick: PropTypes.func.isRequired
};

const HeaderRight = (props) => (
  <div className='col s6'>
    <ClassFilter
      styles='right-align'
      activeFilter={props.activeClassFilter}
      onClassFilterChange={props.onClassFilterChange} />

    <CostFilter
      styles='right-align'
      activeFilter={props.activeCostFilter}
      onCostFilterChange={props.onCostFilterChange} />

    <div className={classes.filterBtnGroup}>
      <span className='waves-effect waves-light btn light-blue darken-4 left'
            onClick={props.onDiscardCardsBtnClick}>
        Remove All Cards
      </span>
      <span className='waves-effect waves-light btn light-blue darken-4 right'
            onClick={props.onGetCardsBtnClick}>
        Get All Cards
      </span>
    </div>
  </div>
);

const CollectionHeader = (props) => (
  <div className={'row ' + classes.collectionHeader}>
    <HeaderLeft
      onSaveClick={props.onSaveClick}
      onLoadClick={props.onLoadClick}
      dust={props.dust} />

    <RarityFilter
      styles='col s2'
      activeFilter={props.filters.rarity}
      onRarityFilterChange={props.onRarityFilterChange} />

    <HeaderRight
      activeClassFilter={props.filters.playerClass}
      activeCostFilter={props.filters.cost}
      onClassFilterChange={props.onClassFilterChange}
      onCostFilterChange={props.onCostFilterChange}
      onDiscardCardsBtnClick={props.onDiscardCardsBtnClick}
      onGetCardsBtnClick={props.onGetCardsBtnClick} />
  </div>
);

CollectionHeader.propTypes = {
  dust: PropTypes.number,
  onSaveClick: PropTypes.func.isRequired,
  onLoadClick: PropTypes.func.isRequired
};

export default CollectionHeader;
