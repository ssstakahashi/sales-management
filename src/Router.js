import { Route, Switch } from 'react-router';
import { Sales, Home} from './views';

function Router() {
  return (
    <Switch>
      <Route exact path='/sales' component={Sales} />
      <Route exact path='(/)?'   component={Home} />
    </Switch>
  )
};

export default Router;