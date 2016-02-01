import React, { Component, PropTypes } from 'react';
import CardList from 'components/CardList/CardList';
import { actions as cardManagerActions } from 'redux/modules/cardManager';
import { connect } from 'react-redux';
import classes from './CardManager.scss';

const mapStateToProps = (state) => ({
  cardManager: state.cardManager
});
export class CardManager extends Component {
  static propTypes = {
    cardManager: PropTypes.object,
    dispatch: PropTypes.func,
    save: PropTypes.func,
    load: PropTypes.func,
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

  componentDidMount () {
    this.props.load();
  }

  render () {
    const { collection, pool, loading, loaded, dustCost, cards } = this.props.cardManager;

    return (
      <div className='container-fluid'>
        <div className={'clearfix ' + classes.filterContainer}>
          <div className='pull-left'>
            <div>
              <div className={classes.filterLink} onClick={this.props.getAllCards}>Get All Cards</div>
              <div className={classes.filterLink} onClick={this.props.discardAllCards}>Remove All Cards</div>
            </div>
            <div>
              <div className={classes.filterLink} onClick={this.props.save}>Save</div>
              <div className={classes.filterLink} onClick={this.props.load}>Load</div>
            </div>
            <div>
              {dustCost}
            </div>
          </div>

          <div className='pull-right'>
            <div>
              <div className={classes.filterLink} onClick={() => this.props.changeRarityFilter(false)}>Reset</div>
              <div className={classes.filterLink} onClick={() => this.props.changeRarityFilter('Common')}>Common</div>
              <div className={classes.filterLink} onClick={() => this.props.changeRarityFilter('Rare')}>Rare</div>
              <div className={classes.filterLink} onClick={() => this.props.changeRarityFilter('Epic')}>Epic</div>
              <div className={classes.filterLink} onClick={() => this.props.changeRarityFilter('Legendary')}>Legendary
              </div>
            </div>
            <div>
              <div className={classes.filterLink} onClick={() => this.props.changeCostFilter(false)}>Reset</div>
              <div className={classes.filterLink} onClick={() => this.props.changeCostFilter(0)}>0</div>
              <div className={classes.filterLink} onClick={() => this.props.changeCostFilter(1)}>1</div>
              <div className={classes.filterLink} onClick={() => this.props.changeCostFilter(2)}>2</div>
              <div className={classes.filterLink} onClick={() => this.props.changeCostFilter(3)}>3</div>
              <div className={classes.filterLink} onClick={() => this.props.changeCostFilter(4)}>4</div>
              <div className={classes.filterLink} onClick={() => this.props.changeCostFilter(5)}>5</div>
              <div className={classes.filterLink} onClick={() => this.props.changeCostFilter(6)}>6</div>
              <div className={classes.filterLink} onClick={() => this.props.changeCostFilter(7)}>7+</div>
            </div>
            <div>
              <div className={classes.filterLink} onClick={() => this.props.changeClassFilter(false)}>Reset</div>
              <div className={classes.filterLink} onClick={() => this.props.changeClassFilter('Druid')}>Druid</div>
              <div className={classes.filterLink} onClick={() => this.props.changeClassFilter('Hunter')}>Hunter</div>
              <div className={classes.filterLink} onClick={() => this.props.changeClassFilter('Mage')}>Mage</div>
              <div className={classes.filterLink} onClick={() => this.props.changeClassFilter('Paladin')}>Paladin</div>
              <div className={classes.filterLink} onClick={() => this.props.changeClassFilter('Priest')}>Priest</div>
              <div className={classes.filterLink} onClick={() => this.props.changeClassFilter('Rogue')}>Rogue</div>
              <div className={classes.filterLink} onClick={() => this.props.changeClassFilter('Shaman')}>Shaman</div>
              <div className={classes.filterLink} onClick={() => this.props.changeClassFilter('Warlock')}>Warlock</div>
              <div className={classes.filterLink} onClick={() => this.props.changeClassFilter('Warrior')}>Warrior</div>
              <div className={classes.filterLink} onClick={() => this.props.changeClassFilter('Neutral')}>Neutral</div>
            </div>
          </div>
        </div>
        <div className='row'>
          <CardList
            loading={loading}
            loaded={loaded}
            cards={pool.displayedCards.map(id => ({
              ...cards[id],
              copies: cards[id].rarity === 'Legendary' ? 1 - cards[id].copies : 2 - cards[id].copies
            }))}
            page={pool.page}
            changePage={this.props.changePagePool}
            onCardClick={this.props.addCard}
          />
          <CardList
            loading={loading}
            loaded={loaded}
            cards={collection.displayedCards.map(id => cards[id])}
            page={collection.page}
            changePage={this.props.changePageCollection}
            onCardClick={this.props.removeCard}
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, cardManagerActions)(CardManager);

