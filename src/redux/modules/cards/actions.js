import { createAction } from 'redux-actions';
import client from 'helpers/ApiClient';

export const actions = {
  LOAD: 'hs-app/collection/LOAD',
  LOAD_SUCCESS: 'hs-app/collection/LOAD_SUCCESS',
  LOAD_FAILURE: 'hs-app/collection/LOAD_FAILURE',
  ADD_CARD: 'hs-app/collection/ADD_CARD',
  REMOVE_CARD: 'hs-app/collection/REMOVE_CARD',
  GET_ALL_CARDS: 'hs-app/collection/GET_ALL_CARDS',
  DISCARD_ALL_CARDS: 'hs-app/collection/DISCARD_ALL_CARDS'
};

const load = createAction(actions.LOAD);
const loadSuccess = createAction(actions.LOAD_SUCCESS);
const loadFailure = createAction(actions.LOAD_FAILURE);
const addCard = createAction(actions.ADD_CARD);
const removeCard = createAction(actions.REMOVE_CARD);
const getAllCards = createAction(actions.GET_ALL_CARDS);
const discardAllCards = createAction(actions.DISCARD_ALL_CARDS);

const loadCards = (cards) => {
  return (dispatch) => {
    if (cards) {
      dispatch(loadSuccess(cards));
    } else {
      dispatch(load());
      let collection = localStorage.getItem('collection');

      if (collection) {
        dispatch(loadSuccess(JSON.parse(collection)));
      } else {
        client.get('cards').then(cards => {
          collection = {};
          cards = [...cards['Classic'], ...cards['Goblins vs Gnomes'], ...cards['The Grand Tournament']]
            .filter(card => card.collectible)
            .map(card => ({...card, copies: 0}))
            .sort((a, b) => a.cost - b.cost === 0 ? a.name >= b.name : a.cost - b.cost);

          for (let i = 0; i < cards.length; i++) {
            collection[cards[i].cardId] = cards[i];
          }

          dispatch(loadSuccess(collection));
        }, (err) => {
          dispatch(loadFailure(err));
        });
      }
    }
  };
};

export default {
  load,
  loadCards,
  loadSuccess,
  loadFailure,
  addCard,
  removeCard,
  getAllCards,
  discardAllCards
}
