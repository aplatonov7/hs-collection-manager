import { createSelector } from 'reselect';

const cardsSelector = state => state.cards.cardsById;

export {
  cardsSelector
};
