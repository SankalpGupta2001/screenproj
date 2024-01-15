// redux/store.js
import { createStore, combineReducers } from 'redux';
import cartReducer from './reducers/cart';
import favoriteReducer from './reducers/favorite';

const rootReducer = combineReducers({
  cart: cartReducer,
  favorite:favoriteReducer
});

const store = createStore(rootReducer);

export default store;
