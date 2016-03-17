import { combineReducers } from 'redux';
import { routeReducer as router } from 'react-router-redux';
import cards from './modules/cards/reducer';
import manager from './modules/manager/reducer';

export default combineReducers({
  cards,
  manager,
  router
});
