import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import CreateGoal from './pages/CreateGoal';
import EditGoal from './pages/EditGoal';
import GoalDetails from './pages/GoalDetails';
import Help from './pages/Help';
import Home from './pages/Home';
import Navbar from './layouts/Navbar';
import NotFound from './pages/NotFound';

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
            <Route path="/goals/:id">
              <GoalDetails />
            </Route>
            <Route path="/edit/:id">
              <EditGoal />
            </Route>
            <Route path="/help">
              <Help />
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
