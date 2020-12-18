import { Route, Switch } from 'react-router';
import Auth from './Auth';
import { Sales, Home, Supplier, SignIn } from './views';

function Router() {
  return (
    <Switch>
        <Route exact path='/signin' component={SignIn} />
      <Auth>
        <Route exact path='/sales' component={Sales} />
        <Route exact path='/supplier' component={Supplier} />

        <Route exact path='(/)?'   component={Home} />
      </Auth>
    </Switch>
  )
};

export default Router;