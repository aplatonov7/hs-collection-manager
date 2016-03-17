import { actions } from './actions';
import { handleActions } from 'redux-actions';
import selectors from './selectors';

const initialState = {
  collectionPage: 1,
  poolPage: 1,
  cardsPerPage: 8,
  filters: {
    cost: false,
    rarity: false,
    playerClass: false,
    name: false
  }
};

export default handleActions({
  [actions.CHANGE_CLASS_FILTER]: (state, {payload}) => ({
    ...state,
    filters: {
      ...state.filters,
      playerClass: payload
    },
  }),
  [actions.CHANGE_RARITY_FILTER]: (state, {payload}) => ({
    ...state,
    filters: {
      ...state.filters,
      rarity: payload
    }
  }),
  [actions.CHANGE_COST_FILTER]: (state, {payload}) => ({
    ...state,
    filters: {
      ...state.filters,
      cost: payload
    }
  }),
  [actions.CHANGE_NAME_FILTER]: (state, {payload}) => ({
    ...state,
    filters: {
      ...state.filters,
      name: payload
    }
  }),
  [actions.CHANGE_PAGE_POOL]: (state, {payload}) => ({
    ...state,
    poolPage: payload
  }),
  [actions.CHANGE_PAGE_COLLECTION]: (state, {payload}) => ({
    ...state,
    collectionPage: payload
  })
}, initialState);
