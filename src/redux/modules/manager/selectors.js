import { createSelector } from 'reselect';
import { cardsSelector } from '../cards/selectors';

const paginate = (cards, page, cardsPerPage) => {
  const start = (page - 1) * cardsPerPage;
  const end = start + cardsPerPage < cards.length ? start + cardsPerPage : cards.length;

  return cards.slice(start, end);
};

const filtersSelector = state => state.manager.filters;
const collectionPageSelector = state => state.manager.collectionPage;
const poolPageSelector = state => state.manager.poolPage;
const cardsPerPageSelector = state => state.manager.cardsPerPage;

const filteredCardsSelector = createSelector(
  cardsSelector,
  filtersSelector,
  (cards, filters) => {
    return Object.keys(cards).filter(id => {
      const { cost, rarity, playerClass } = filters;
      const exp = new RegExp('.*' + filters.name + '.*', 'gi');

      if (filters.name && !cards[id].name.match(exp)) return false;
      if (cost !== false && cards[id].cost !== cost && !(cards[id].cost >= 7 && cost === 7)) return false;
      if (rarity && (cards[id].rarity !== rarity)) return false;
      return !(playerClass && (playerClass !== 'Neutral' || cards[id].playerClass) && (!cards[id].playerClass || playerClass !== cards[id].playerClass));
    }).reduce((o, id) => ({...o, [id]: cards[id]}), {});
  });

const collectionSelector = createSelector(
  filteredCardsSelector,
  cards => Object.keys(cards).filter(id => cards[id].copies > 0).map(id => cards[id])
);

const poolSelector = createSelector(
  filteredCardsSelector,
  cards => Object.keys(cards).filter(id => cards[id].copies < (cards[id].rarity === 'Legendary' ? 1 : 2)).map(id => ({
    ...cards[id],
    copies: cards[id].rarity === 'Legendary' ? 1 - cards[id].copies : 2 - cards[id].copies
  }))
);

const collectionPagedSelector = createSelector(
  collectionSelector,
  collectionPageSelector,
  cardsPerPageSelector,
  paginate
);

const poolPagedSelector = createSelector(
  poolSelector,
  poolPageSelector,
  cardsPerPageSelector,
  paginate
);

const collectionLastPageSelector = createSelector(
  collectionSelector,
  cardsPerPageSelector,
  (cards, cpp) => Math.ceil(cards.length / cpp)
);

const poolLastPageSelector = createSelector(
  poolSelector,
  cardsPerPageSelector,
  (cards, cpp) => Math.ceil(cards.length / cpp)
);

const dustCostSelector = createSelector(
  cardsSelector,
  cards => (Object.keys(cards).reduce((sum, id) => {
    if (cards[id].rarity === 'Common') return sum + 40 * (2 - cards[id].copies);
    if (cards[id].rarity === 'Rare') return sum + 100 * (2 - cards[id].copies);
    if (cards[id].rarity === 'Epic') return sum + 400 * (2 - cards[id].copies);
    if (cards[id].rarity === 'Legendary') return sum + 1600 * (1 - cards[id].copies);
  }, 0))
);

export default {
  poolPagedSelector,
  collectionPagedSelector,
  collectionLastPageSelector,
  poolLastPageSelector,
  dustCostSelector
};
