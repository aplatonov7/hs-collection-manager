import { createSelector } from 'reselect';

const cardsSelector = state => state.cards;
const filtersSelector = state => state.filters;

const collectionSelector = createSelector(cardsSelector, filtersSelector, (cards, filters) => {
  collection.cards = cards.filter(card => {
    const { cost, rarity, playerClass } = filters;
    const exp = new RegExp('.*' + filters.name + '.*', 'gi');

    if (card.copies < 1) return false;
    if (filters.name && !card.name.match(exp)) return false;
    if (cost !== false && card.cost !== cost && !(card.cost >= 7 && cost === 7)) return false;
    if (rarity && (card.rarity !== rarity)) return false;
    return !(playerClass && (playerClass !== 'Neutral' || card.playerClass) && (!card.playerClass || playerClass !== card.playerClass));
  });

  return {
    collection: collection
  }
});

export default collectionSelector;
