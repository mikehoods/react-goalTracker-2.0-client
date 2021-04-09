import Navbar from './Navbar';
import Home from './Home';
import CreateGoal from './CreateGoal';
import GoalDetails from './GoalDetails';
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
        </Switch>
      </div>
    </div>
    </Router>
    
  );
}

export default App;
