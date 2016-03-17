import { actions } from './actions';
import { handleActions } from 'redux-actions';

const initialState = {
  cardsById: {},
  loaded: false,
  loading: false,
  error: null
};

export default handleActions({
  [actions.LOAD]: (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null
  }),
  [actions.LOAD_SUCCESS]: (state, {payload}) => ({
    ...state,
    cardsById: payload,
    loaded: true,
    loading: false,
    error: null
  }),
  [actions.LOAD_FAILURE]: (state, {payload}) => ({
    ...state,
    loading: false,
    loaded: false,
    error: payload
  }),
  [actions.GET_ALL_CARDS]: (state) => {
    let cardsById = {};

    for (let id in state.cardsById) {
      if (state.cardsById.hasOwnProperty(id)) {
        cardsById[id] = {
          ...state.cardsById[id],
          copies: state.cardsById[id].rarity === 'Legendary' ? 1 : 2
        };
      }
    }

    return {
      ...state,
      cardsById
    };
  },
  [actions.DISCARD_ALL_CARDS]: (state) => {
    let cardsById = Object.keys(state.cardsById).reduce((o, id) => {
      o[id] = {
        ...state.cardsById[id],
        copies: 0
      };

      return o;
    }, {})

    return {
      ...state,
      cardsById
    };
  },
  [actions.REMOVE_CARD]: (state, {payload}) => {
    let cardsById = {
      ...state.cardsById,
      [payload]: Object.assign({}, state.cardsById[payload])
    };

    if (cardsById[payload].copies > 0) {
      cardsById[payload].copies--;
    }

    return {
      ...state,
      cardsById
    };
  },
  [actions.ADD_CARD]: (state, {payload}) => {
    let cardsById = {
      ...state.cardsById,
      [payload]: Object.assign({}, state.cardsById[payload])
    };

    if (
      (cardsById[payload].rarity === 'Legendary' && cardsById[payload].copies < 1) ||
      (cardsById[payload].rarity !== 'Legendary' && cardsById[payload].copies < 2)
    ) {
      cardsById[payload].copies++;
    }

    return {
      ...state,
      cardsById
    };
  }
}, initialState);
