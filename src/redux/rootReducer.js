import { combineReducers } from 'redux';
import { routeReducer as router } from 'react-router-redux';
import cardManager from './modules/cardManager';

export default combineReducers({
  cardManager,
  router
});
