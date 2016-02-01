import React, {Component, PropTypes} from 'react';
import {CardList} from 'components/CardList/CardList';
import { actions as cardManagerActions } from 'redux/modules/cardManager';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
  collection: state.collection
});
export class CardManager extends Component {
  static propTypes = {
    collection: PropTypes.object,
    dispatch: PropTypes.func
  };

  componentDidMount() {
    this.props.dispatch(load());
  }

  render() {
    const style = require('./CollectionManager.scss');
    const { collection, pool, loading, loaded, dustCost, cards } = this.props.collection;

    const addCardClick = (cardId) => {
      this.props.dispatch(addCard(cardId));
    };

    const removeCardClick = (cardId) => {
      this.props.dispatch(removeCard(cardId));
    };

    const changePoolPage = (page) => {
      this.props.dispatch(changePagePool(page));
    };

    const changeCollectionPage = (page) => {
      this.props.dispatch(changePageCollection(page));
    };

    const changeCostFilterDispatch = (cost) => {
      this.props.dispatch(changeCostFilter(cost));
    };

    const changeRarityFilterDispatch = (rarity) => {
      this.props.dispatch(changeRarityFilter(rarity));
    };

    const changeClassFilterDispatch = (playerClass) => {
      this.props.dispatch(changeClassFilter(playerClass));
    };

    const getAllCardsDispatch = () => {
      this.props.dispatch(getAllCards());
    };

    const discardAllCardsDispatch = () => {
      this.props.dispatch(discardAllCards());
    };

    const saveDispatch = () => {
      this.props.dispatch(save());
    };

    const loadDispatch = () => {
      this.props.dispatch(load());
    };
    return (
      <div className="container-fluid">
        <div className={'clearfix ' + style.filterContainer}>
          <div className="pull-left">
            <div>
              <div className={style.filterLink} onClick={getAllCardsDispatch}>Get All Cards</div>
              <div className={style.filterLink} onClick={discardAllCardsDispatch}>Remove All Cards</div>
            </div>
            <div>
              <div className={style.filterLink} onClick={saveDispatch}>Save</div>
              <div className={style.filterLink} onClick={loadDispatch}>Load</div>
            </div>
            <div>
              {dustCost}
            </div>
          </div>

          <div className="pull-right">
            <div>
              <div className={style.filterLink} onClick={changeRarityFilterDispatch.bind(this, false)}>Reset</div>
              <div className={style.filterLink} onClick={changeRarityFilterDispatch.bind(this, 'Common')}>Common</div>
              <div className={style.filterLink} onClick={changeRarityFilterDispatch.bind(this, 'Rare')}>Rare</div>
              <div className={style.filterLink} onClick={changeRarityFilterDispatch.bind(this, 'Epic')}>Epic</div>
              <div className={style.filterLink} onClick={changeRarityFilterDispatch.bind(this, 'Legendary')}>Legendary
              </div>
            </div>
            <div>
              <div className={style.filterLink} onClick={changeCostFilterDispatch.bind(this, false)}>Reset</div>
              <div className={style.filterLink} onClick={changeCostFilterDispatch.bind(this, 0)}>0</div>
              <div className={style.filterLink} onClick={changeCostFilterDispatch.bind(this, 1)}>1</div>
              <div className={style.filterLink} onClick={changeCostFilterDispatch.bind(this, 2)}>2</div>
              <div className={style.filterLink} onClick={changeCostFilterDispatch.bind(this, 3)}>3</div>
              <div className={style.filterLink} onClick={changeCostFilterDispatch.bind(this, 4)}>4</div>
              <div className={style.filterLink} onClick={changeCostFilterDispatch.bind(this, 5)}>5</div>
              <div className={style.filterLink} onClick={changeCostFilterDispatch.bind(this, 6)}>6</div>
              <div className={style.filterLink} onClick={changeCostFilterDispatch.bind(this, 7)}>7+</div>
            </div>
            <div>
              <div className={style.filterLink} onClick={changeClassFilterDispatch.bind(this, false)}>Reset</div>
              <div className={style.filterLink} onClick={changeClassFilterDispatch.bind(this, 'Druid')}>Druid</div>
              <div className={style.filterLink} onClick={changeClassFilterDispatch.bind(this, 'Hunter')}>Hunter</div>
              <div className={style.filterLink} onClick={changeClassFilterDispatch.bind(this, 'Mage')}>Mage</div>
              <div className={style.filterLink} onClick={changeClassFilterDispatch.bind(this, 'Paladin')}>Paladin</div>
              <div className={style.filterLink} onClick={changeClassFilterDispatch.bind(this, 'Priest')}>Priest</div>
              <div className={style.filterLink} onClick={changeClassFilterDispatch.bind(this, 'Rogue')}>Rogue</div>
              <div className={style.filterLink} onClick={changeClassFilterDispatch.bind(this, 'Shaman')}>Shaman</div>
              <div className={style.filterLink} onClick={changeClassFilterDispatch.bind(this, 'Warlock')}>Warlock</div>
              <div className={style.filterLink} onClick={changeClassFilterDispatch.bind(this, 'Warrior')}>Warrior</div>
              <div className={style.filterLink} onClick={changeClassFilterDispatch.bind(this, 'Neutral')}>Neutral</div>
            </div>
          </div>
        </div>
        <div className="row">
          <CardList
            loading={loading}
            loaded={loaded}
            cards={pool.displayedCards.map(id => {
              return {
                ...cards[id],
                copies: cards[id].rarity === 'Legendary' ? 1 - cards[id].copies : 2 - cards[id].copies
              };
            })}
            page={pool.page}
            changePage={changePoolPage}
            onCardClick={addCardClick}
          />
          <CardList
            loading={loading}
            loaded={loaded}
            cards={collection.displayedCards.map(id => cards[id])}
            page={collection.page}
            changePage={changeCollectionPage}
            onCardClick={removeCardClick}
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, cardManagerActions)(CardManager);

