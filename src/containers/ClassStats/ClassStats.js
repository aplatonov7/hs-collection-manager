import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { actions as cardManagerActions } from 'redux/modules/cardManager';

const mapStateToProps = (state) => ({
  cardManager: state.cardManager
});
export class CardManager extends Component {
  static propTypes = {
    cardManager: PropTypes.object,
    loadCards: PropTypes.func
  };

  componentDidMount () {
    if (Object.keys(this.props.cardManager.cards).length === 0) this.props.loadCards();
  }

  render () {
    const stats = ((cards) => {
      const rarityData = {
        Common: {craft: 40, likelihood: 71.42, dust: 5},
        Rare: {craft: 100, likelihood: 22.80, dust: 20},
        Epic: {craft: 400, likelihood: 4.58, dust: 100},
        Legendary: {craft: 1600, likelihood: 1.20, dust: 400}
      };

      let stats = {};
      for (let i in cards) {
        let cardSet = cards[i].cardSet;
        let copies = cards[i].copies;
        let rarity = cards[i].rarity;
        let playerClass = cards[i].playerClass ? cards[i].playerClass : 'Neutral';

        if (!stats.hasOwnProperty(cardSet)) {
          stats[cardSet] = {
            name: cardSet
          };
        }

        let set = stats[cardSet];

        if (!set.hasOwnProperty(playerClass)) {
          set[playerClass] = {};
        }

        if (!set[playerClass].hasOwnProperty(rarity)) {
          set[playerClass][rarity] = {
            total: 0,
            collected: 0,
            uniqueTotal: 0,
            uniqueCollected: 0,
            dustTotal: 0,
            dustCollected: 0
          };
        }

        set[playerClass][rarity].total += rarity === 'Legendary' ? 1 : 2;
        set[playerClass][rarity].collected += copies;
        set[playerClass][rarity].uniqueTotal += 1;
        set[playerClass][rarity].uniqueCollected += +!!copies;
        set[playerClass][rarity].dustTotal += (rarity === 'Legendary' ? 1 : 2) * rarityData[rarity].craft;
        set[playerClass][rarity].dustCollected += copies * rarityData[rarity].craft;
      }

      return stats;
    })(this.props.cardManager.cards);

    return (
      <div className='row'>
        {Object.keys(stats).map(set => stats[set]).map(set => (
          <div key={set.name} className='col s4'>
            <h4>{set.name}</h4>

            <pre>
              {JSON.stringify(set, null, 2)}
            </pre>
          </div>
        ))}
      </div>
    );
  }
}

export default connect(mapStateToProps, cardManagerActions)(CardManager);
