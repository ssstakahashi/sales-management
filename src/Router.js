import { Route, Switch } from 'react-router';
import { Sales, Home, Supplier, SignIn } from './views';

function Router() {
  return (
    <Switch>
      <Route exact path='/sales' component={Sales} />
      <Route exact path='/supplier' component={Supplier} />
      <Route exact path='/signin' component={SignIn} />
      <Route exact path='(/)?'   component={Home} />
    </Switch>
  )
};

export default Router;