import { createAction, handleActions } from 'redux-actions';

const SAVE = 'hs-app/collection/SAVE';
const LOAD = 'hs-app/collection/LOAD';
const ADD_CARD = 'hs-app/collection/ADD_CARD';
const REMOVE_CARD = 'hs-app/collection/REMOVE_CARD';
const CHANGE_PAGE_POOL = 'hs-app/collection/CHANGE_PAGE_POOL';
const CHANGE_PAGE_COLLECTION = 'hs-app/collection/CHANGE_PAGE_COLLECTION';
const CHANGE_COST_FILTER = 'hs-app/collection/CHANGE_COST_FILTER';
const CHANGE_RARITY_FILTER = 'hs-app/collection/CHANGE_RARITY_FILTER';
const CHANGE_CLASS_FILTER = 'hs-app/collection/CHANGE_CLASS_FILTER';
const GET_ALL_CARDS = 'hs-app/collection/GET_ALL_CARDS';
const DISCARD_ALL_CARDS = 'hs-app/collection/DISCARD_ALL_CARDS';

const initialState = {
  cards: [],
  collection: {
    page: 1,
    lastPage: 1,
    displayedCards: []
  },
  pool: {
    page: 1,
    lastPage: 1,
    displayedCards: []
  },
  cardsPerPage: 12,
  filters: {
    cost: false,
    rarity: false,
    playerClass: false
  },
  dustCost: 0
};

// Paginating card set
const refreshCardSet = (cards, page, cardsPerPage) => {
  const limit = Math.ceil(cards.length / cardsPerPage);
  let newPage = page;

  if (page < 1 || limit === 0) {
    newPage = 1;
  } else if (page > limit) {
    newPage = limit;
  }

  const start = (newPage - 1) * cardsPerPage;
  const end = start + cardsPerPage < cards.length ? start + cardsPerPage : cards.length;

  return {
    displayedCards: cards.slice(start, end),
    page: newPage,
    lastPage: limit
  };
};

const refreshCards = ({
  cards: cards,
  filters: filters,
  collectionPage: collectionPage,
  poolPage: poolPage,
  cardsPerPage: cardsPerPage
  }) => {
  const collection = {
    cards: {},
    page: collectionPage
  };
  const pool = {
    cards: {},
    page: poolPage
  };

  // Filtering collection
  collection.cards = Object.keys(cards).filter(id => {
    const { cost, rarity, playerClass } = filters;

    if (cards[id].copies < 1) return false;
    if (cost !== false && cards[id].cost !== cost && !(cards[id].cost >= 7 && cost === 7)) return false;
    if (rarity && (cards[id].rarity !== rarity)) return false;
    return !(playerClass && (playerClass !== 'Neutral' || cards[id].playerClass) && (!cards[id].playerClass || playerClass !== cards[id].playerClass));
  });

  // Filtering card pool
  pool.cards = Object.keys(cards).filter(id => {
    const { cost, rarity, playerClass } = filters;

    if (cards[id].rarity === 'Legendary' ? cards[id].copies > 0 : cards[id].copies > 1) return false;
    if (cost !== false && cards[id].cost !== cost && !(cards[id].cost >= 7 && cost === 7)) return false;
    if (rarity && (cards[id].rarity !== rarity)) return false;
    return !(playerClass && (playerClass !== 'Neutral' || cards[id].playerClass) && (!cards[id].playerClass || playerClass !== cards[id].playerClass));
  });

  // Calculating remaining dust cost
  const dustCost = Object.keys(cards).reduce((sum, id) => {
    if (cards[id].rarity === 'Common') return sum + 40 * (2 - cards[id].copies);
    if (cards[id].rarity === 'Rare') return sum + 100 * (2 - cards[id].copies);
    if (cards[id].rarity === 'Epic') return sum + 400 * (2 - cards[id].copies);
    if (cards[id].rarity === 'Legendary') return sum + 1600 * (1 - cards[id].copies);
  }, 0);

  return {
    cards: cards,
    filters: filters,
    collection: refreshCardSet(collection.cards, collection.page, cardsPerPage),
    pool: refreshCardSet(pool.cards, pool.page, cardsPerPage),
    dustCost: dustCost
  };
};

export default handleActions({
  [SAVE]: (state) => {
    window.localStorage.setItem('collection', JSON.stringify(state.cards));
    return state;
  },
  [LOAD]: (state, {payload}) => ({
    ...state,
    ...refreshCards({
      cards: payload,
      filters: state.filters,
      collectionPage: state.collection.page,
      poolPage: state.pool.page,
      cardsPerPage: state.cardsPerPage
    }),
    loaded: true,
    error: null
  }),
  [GET_ALL_CARDS]: (state) => {
    let cards = Object.assign({}, state.cards);

    for (const id in cards) {
      if (cards.hasOwnProperty(id)) {
        cards[id].copies = cards[id].rarity === 'Legendary' ? 1 : 2;
      }
    }

    return {
      ...state,
      ...refreshCards({
        cards: cards,
        filters: state.filters,
        collectionPage: state.collection.page,
        poolPage: state.pool.page,
        cardsPerPage: state.cardsPerPage
      })
    };
  },
  [DISCARD_ALL_CARDS]: (state) => {
    let cards = Object.assign({}, state.cards);

    for (const id in cards) {
      if (cards.hasOwnProperty(id)) {
        cards[id].copies = 0;
      }
    }

    return {
      ...state,
      ...refreshCards({
        cards: cards,
        filters: state.filters,
        collectionPage: state.collection.page,
        poolPage: state.pool.page,
        cardsPerPage: state.cardsPerPage
      })
    };
  },
  [CHANGE_CLASS_FILTER]: (state, {payload}) => ({
    ...state,
    ...refreshCards({
      cards: state.cards,
      filters: {
        ...state.filters,
        playerClass: payload
      },
      collectionPage: state.collection.page,
      poolPage: state.pool.page,
      cardsPerPage: state.cardsPerPage
    })
  }),
  [CHANGE_RARITY_FILTER]: (state, {payload}) => ({
    ...state,
    ...refreshCards({
      cards: state.cards,
      filters: {
        ...state.filters,
        rarity: payload
      },
      collectionPage: state.collection.page,
      poolPage: state.pool.page,
      cardsPerPage: state.cardsPerPage
    })
  }),
  [CHANGE_COST_FILTER]: (state, {payload}) => ({
    ...state,
    ...refreshCards({
      cards: state.cards,
      filters: {
        ...state.filters,
        cost: payload
      },
      collectionPage: state.collection.page,
      poolPage: state.pool.page,
      cardsPerPage: state.cardsPerPage
    })
  }),
  [CHANGE_PAGE_POOL]: (state, {payload}) => ({
    ...state,
    ...refreshCards({
      cards: state.cards,
      filters: state.filters,
      collectionPage: state.collection.page,
      poolPage: payload,
      cardsPerPage: state.cardsPerPage
    })
  }),
  [CHANGE_PAGE_COLLECTION]: (state, {payload}) => ({
    ...state,
    ...refreshCards({
      cards: state.cards,
      filters: state.filters,
      collectionPage: payload,
      poolPage: state.pool.page,
      cardsPerPage: state.cardsPerPage
    })
  }),
  [REMOVE_CARD]: (state, {payload}) => {
    let cards = Object.assign({}, state.cards);

    if (cards[payload].copies > 0) {
      cards[payload].copies--;
    }

    return {
      ...state,
      ...refreshCards({
        cards: cards,
        filters: state.filters,
        collectionPage: state.collection.page,
        poolPage: state.pool.page,
        cardsPerPage: state.cardsPerPage
      })
    };
  },
  [ADD_CARD]: (state, {payload}) => {
    let cards = Object.assign({}, state.cards);

    if (
      (cards[payload].rarity === 'Legendary' && cards[payload].copies < 1) ||
      (cards[payload].rarity !== 'Legendary' && cards[payload].copies < 2)
    ) {
      cards[payload].copies++;
    }

    return {
      ...state,
      ...refreshCards({
        cards: cards,
        filters: state.filters,
        collectionPage: state.collection.page,
        poolPage: state.pool.page,
        cardsPerPage: state.cardsPerPage
      })
    };
  }
}, initialState);

export const save = createAction(SAVE);
export const load = createAction(LOAD, () => JSON.parse(localStorage.getItem('collection')));
export const addCard = createAction(ADD_CARD, value => value);
export const removeCard = createAction(REMOVE_CARD, value => value);
export const changePagePool = createAction(CHANGE_PAGE_POOL, value => value);
export const changePageCollection = createAction(CHANGE_PAGE_COLLECTION, value => value);
export const changeCostFilter = createAction(CHANGE_COST_FILTER, value => value);
export const changeRarityFilter = createAction(CHANGE_RARITY_FILTER, value => value);
export const changeClassFilter = createAction(CHANGE_CLASS_FILTER, value => value);
export const getAllCards = createAction(GET_ALL_CARDS);
export const discardAllCards = createAction(DISCARD_ALL_CARDS);

export const actions = {
  save,
  load,
  addCard,
  removeCard,
  changePagePool,
  changePageCollection,
  changeCostFilter,
  changeRarityFilter,
  changeClassFilter,
  getAllCards,
  discardAllCards
};
