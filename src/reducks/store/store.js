import { createStore as reduxCreateStore, combineReducers, applyMiddleware } from 'redux';
import { AccountingReducer } from '../accounting/reducers';
import { SalesReducer } from '../sales/reducers';
import { PaymentReducer } from '../payment/reducers';
import { SupplierReducer } from '../supplier/reducers';
import { ProductReducer } from '../product/reducers';
import { UsersReducer } from '../users/reducers';
import { DialogReducer } from '../dialog/reducers';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';

export default function createStore(history) {
  return reduxCreateStore(
    combineReducers({
        accountings : AccountingReducer,
        sales       : SalesReducer,
        payments    : PaymentReducer,
        suppliers   : SupplierReducer,
        products    : ProductReducer,
        users       : UsersReducer,
        dialogs     : DialogReducer,
        router      : connectRouter(history),
      }),
    applyMiddleware(
      routerMiddleware(history),
      thunk,
    )
  )
};