import { createStore as reduxCreateStore, combineReducers, applyMiddleware } from 'redux';
import { SalesReducer } from '../sales/reducers';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';

export default function createStore(history) {
  return reduxCreateStore(
    combineReducers({
        router : connectRouter(history),
        sales  : SalesReducer
      }),
    applyMiddleware(
      routerMiddleware(history),
      thunk,
    )
  )
};