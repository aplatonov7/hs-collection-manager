import { createAction } from 'redux-actions';
import selectors from './selectors';

export const actions = {
  CHANGE_PAGE_POOL: 'hs-app/collection/CHANGE_PAGE_POOL',
  CHANGE_PAGE_COLLECTION: 'hs-app/collection/CHANGE_PAGE_COLLECTION',
  CHANGE_COST_FILTER: 'hs-app/collection/CHANGE_COST_FILTER',
  CHANGE_RARITY_FILTER: 'hs-app/collection/CHANGE_RARITY_FILTER',
  CHANGE_CLASS_FILTER: 'hs-app/collection/CHANGE_CLASS_FILTER',
  CHANGE_NAME_FILTER: 'hs-app/collection/CHANGE_NAME_FILTER'
};

const changePageCollection = (page) => (dispatch, getState) => {
  const last = selectors.collectionLastPageSelector(getState());
  if (page > 0 && page <= last) dispatch(createAction(actions.CHANGE_PAGE_COLLECTION)(page));
};

const changePagePool = (page) => (dispatch, getState) => {
  const last = selectors.poolLastPageSelector(getState());
  if (page > 0 && page <= last) dispatch(createAction(actions.CHANGE_PAGE_POOL)(page));
};

const changeCostFilter = createAction(actions.CHANGE_COST_FILTER);
const changeRarityFilter = createAction(actions.CHANGE_RARITY_FILTER);
const changeClassFilter = createAction(actions.CHANGE_CLASS_FILTER);
const changeNameFilter = createAction(actions.CHANGE_NAME_FILTER);

export default {
  changePagePool,
  changePageCollection,
  changeCostFilter,
  changeRarityFilter,
  changeClassFilter,
  changeNameFilter
}
