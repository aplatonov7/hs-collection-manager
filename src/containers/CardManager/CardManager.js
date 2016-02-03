import React, { Component, PropTypes } from 'react';
import CardList from 'components/CardList/CardList';
import { actions as cardManagerActions } from 'redux/modules/cardManager';
import { connect } from 'react-redux';
import classes from './CardManager.scss';
import classNames from 'classnames';

const mapStateToProps = (state) => ({
  cardManager: state.cardManager
});
export class CardManager extends Component {
  static propTypes = {
    cardManager: PropTypes.object,
    dispatch: PropTypes.func,
    save: PropTypes.func,
    loadCards: PropTypes.func,
    addCard: PropTypes.func,
    removeCard: PropTypes.func,
    changePagePool: PropTypes.func,
    changePageCollection: PropTypes.func,
    changeCostFilter: PropTypes.func,
    changeRarityFilter: PropTypes.func,
    changeClassFilter: PropTypes.func,
    getAllCards: PropTypes.func,
    discardAllCards: PropTypes.func
  };

  componentDidMount() {
    this.props.loadCards();
  }

  render() {
    const { collection, pool, dustCost, cards, filters, loading } = this.props.cardManager;

    const classFilterNames = (pClass) => classNames({
      [classes[pClass.toLowerCase()]]: true,
      hoverable: true,
      'z-depth-1': true,
      [classes.active]: filters.playerClass === pClass
    });

    const costFilterNames = (cost) => classNames({
      hoverable: true,
      'z-depth-1': filters.cost !== cost,
      'z-depth-2': filters.cost === cost,
      [classes.active]: filters.cost === cost
    });

    const classFilterClick = (pClass) => {
      let filter = pClass === filters.playerClass ? false : pClass;
      this.props.changeClassFilter(filter);
    };

    const rarityFilterChange = (e) => {
      let filter = e.currentTarget.value !== 'None' ? e.currentTarget.value : false;
      this.props.changeRarityFilter(filter);
    };

    const costFilterChange = (cost) => {
      let filter = cost === filters.cost ? false : cost;
      this.props.changeCostFilter(filter);
    };

    let content;

    if (loading) {
      content =
        <div className='row'>
          <div className='progress col s8 offset-s2'>
            <div className='indeterminate'></div>
          </div>
        </div>;
    } else {
      content =
        <div className='row'>
          <div className='col s6'>
            <h4 className='center-align grey-text text-lighten-3'>Card pool</h4>
            <CardList
              cards={pool.displayedCards.map(id => ({
                ...cards[id],
                copies: cards[id].rarity === 'Legendary' ? 1 - cards[id].copies : 2 - cards[id].copies
              }))}
              page={pool.page}
              lastPage={pool.lastPage}
              changePage={this.props.changePagePool}
              onCardClick={this.props.addCard}
            />
          </div>
          <div className='col s6'>
            <h4 className='center-align grey-text text-lighten-3'>Your collection</h4>
            <CardList
              cards={collection.displayedCards.map(id => cards[id])}
              page={collection.page}
              lastPage={collection.lastPage}
              changePage={this.props.changePageCollection}
              onCardClick={this.props.removeCard}
            />
          </div>
        </div>;
    }

    return (
      <div>
        <div className={'row ' + classes.filterContainer}>
          <div className='col s3'>
            <div className={classes.btnGroup}>
              <span className='waves-effect waves-light btn light-blue darken-4' onClick={this.props.save}>
                <i className='material-icons left'>call_received</i>Save
              </span>
              <span className='waves-effect waves-light btn light-blue darken-4' onClick={this.props.loadCards}>
                <i className='material-icons left'>call_made</i>Load
              </span>
            </div>
            <div className={classes.dustInfo}>
              Dust needed to finish the collection: {dustCost}
            </div>
            <p class='flow-text grey-text text-lighten-3'>No register\login required to use the application. The collection saves to\loads from
              your browser, so you will always get your restored collection as long as you use the same browser.</p>
          </div>

          <div className='col s3'>
            <p>
              <input name='group1' type='radio' value='None' id='noneRarityFilter' defaultChecked
                     onChange={rarityFilterChange}/>
              <label className={classes.noneRadio} htmlFor='noneRarityFilter'>None</label>
            </p>
            <p>
              <input name='group1' type='radio' value='Common' id='commonRarityFilter' onChange={rarityFilterChange}/>
              <label className={classes.commonRadio} htmlFor='commonRarityFilter'>Common</label>
            </p>
            <p>
              <input name='group1' type='radio' value='Rare' id='rareRarityFilter' onChange={rarityFilterChange}/>
              <label className={classes.rareRadio} htmlFor='rareRarityFilter'>Rare</label>
            </p>
            <p>
              <input name='group1' type='radio' value='Epic' id='epicRarityFilter' onChange={rarityFilterChange}/>
              <label className={classes.epicRadio} htmlFor='epicRarityFilter'>Epic</label>
            </p>
            <p>
              <input name='group1' type='radio' value='Legendary' id='legendaryRarityFilter'
                     onChange={rarityFilterChange}/>
              <label className={classes.legendaryRadio} htmlFor='legendaryRarityFilter'>Legendary</label>
            </p>
          </div>

          <div className='col s6'>
            <div className='right-align'>
              <div className={classFilterNames('Druid')} onClick={() => classFilterClick('Druid')} title='Druid'></div>
              <div className={classFilterNames('Hunter')} onClick={() => classFilterClick('Hunter')}
                   title='Hunter'></div>
              <div className={classFilterNames('Mage')} onClick={() => classFilterClick('Mage')} title='Mage'></div>
              <div className={classFilterNames('Paladin')} onClick={() => classFilterClick('Paladin')}
                   title='Paladin'></div>
              <div className={classFilterNames('Priest')} onClick={() => classFilterClick('Priest')}
                   title='Priest'></div>
              <div className={classFilterNames('Rogue')} onClick={() => classFilterClick('Rogue')} title='Rogue'></div>
              <div className={classFilterNames('Shaman')} onClick={() => classFilterClick('Shaman')}
                   title='Shaman'></div>
              <div className={classFilterNames('Warlock')} onClick={() => classFilterClick('Warlock')}
                   title='Warlock'></div>
              <div className={classFilterNames('Warrior')} onClick={() => classFilterClick('Warrior')}
                   title='Warrior'></div>
              <div className={classFilterNames('Neutral')} onClick={() => classFilterClick('Neutral')}
                   title='Neutral'></div>
            </div>
            <div className={classes.manaFilterWrap + ' right-align'}>
              <div className={costFilterNames(0)} onClick={() => costFilterChange(0)}>0</div>
              <div className={costFilterNames(1)} onClick={() => costFilterChange(1)}>1</div>
              <div className={costFilterNames(2)} onClick={() => costFilterChange(2)}>2</div>
              <div className={costFilterNames(3)} onClick={() => costFilterChange(3)}>3</div>
              <div className={costFilterNames(4)} onClick={() => costFilterChange(4)}>4</div>
              <div className={costFilterNames(5)} onClick={() => costFilterChange(5)}>5</div>
              <div className={costFilterNames(6)} onClick={() => costFilterChange(6)}>6</div>
              <div className={costFilterNames(7)} onClick={() => costFilterChange(7)}>7+</div>
            </div>
            <div className={classes.filterBtnGroup}>
              <span className='waves-effect waves-light btn light-blue darken-4 left'
                    onClick={this.props.discardAllCards}>
              Remove All Cards
              </span>
              <span className='waves-effect waves-light btn light-blue darken-4 right' onClick={this.props.getAllCards}>
                Get All Cards
              </span>
            </div>
          </div>
        </div>

        {content}
      </div>
    );
  }
}

export default connect(mapStateToProps, cardManagerActions)(CardManager);
