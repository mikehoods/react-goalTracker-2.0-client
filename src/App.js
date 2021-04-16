import Navbar from './Navbar';
import Home from './Home';
import CreateGoal from './CreateGoal';
import EditGoal from './EditGoal';
import GoalDetails from './GoalDetails';
import NotFound from './NotFound';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
      <Navbar />
      <div className="content">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/create">
            <CreateGoal />
          </Route>
          <Route path='/goals/:id'>
            <GoalDetails />
          </Route>
          <Route path='/edit/:id'>
            <EditGoal />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
    </Router>
    
  );
}

export default App;
