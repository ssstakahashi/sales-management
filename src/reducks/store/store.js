import { createStore as reduxCreateStore, combineReducers, applyMiddleware } from 'redux';
import { SalesReducer } from '../sales/reducers';
import { PaymentReducer } from '../payment/reducers';
import { SupplierReducer } from '../supplier/reducers';
import { ProductReducer } from '../product/reducers';
import { UsersReducer } from '../users/reducers';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';

export default function createStore(history) {
  return reduxCreateStore(
    combineReducers({
        sales    : SalesReducer,
        payments : PaymentReducer,
        supplier : SupplierReducer,
        products : ProductReducer,
        users    : UsersReducer,
        router   : connectRouter(history),
      }),
    applyMiddleware(
      routerMiddleware(history),
      thunk,
    )
  )
};