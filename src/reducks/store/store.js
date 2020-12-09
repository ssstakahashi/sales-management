import { createStore as reduxCreateStore, combineReducers, applyMiddleware } from 'redux';
import { SalesReducer } from '../sales/reducers';
import { SupplierReducer } from '../supplier/reducers';
import { UsersReducer } from '../users/reducers';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';

export default function createStore(history) {
  return reduxCreateStore(
    combineReducers({
        sales    : SalesReducer,
        supplier : SupplierReducer,
        users    : UsersReducer,
        router   : connectRouter(history),
      }),
    applyMiddleware(
      routerMiddleware(history),
      thunk,
    )
  )
};