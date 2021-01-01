import { Route, Switch } from 'react-router';
import Auth from './Auth';
import { Sales, Home, Supplier, SignIn, SalesReportTable, Product } from './views';

function Router() {
  return (
    <Switch>
        <Route exact path='/signin' component={SignIn} />
      <Auth>
        <Route exact path='/sales' component={Sales} />
        <Route exact path='/supplier' component={Supplier} />
        <Route exact path='/product' component={Product} />
        <Route exact path='/sales-report' component={SalesReportTable} />

        <Route exact path='(/)?'   component={Home} />
      </Auth>
    </Switch>
  )
};

export default Router;