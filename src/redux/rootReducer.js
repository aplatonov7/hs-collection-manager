import { combineReducers } from 'redux';
import { routeReducer as router } from 'react-router-redux';
import counter from './modules/counter';
import cardManager from './modules/cardManager';

export default combineReducers({
  counter,
  cardManager,
  router
});
