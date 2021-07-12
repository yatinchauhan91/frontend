import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import countryAdd from './components/countryAdd.component';
import countryList from './components/countryList.component';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="container">
          <nav className="btn btn-warning navbar navbar-expand-lg navheader">
            <div className="collapse navbar-collapse" >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={'/countryAdd'} className="nav-link">Add Country</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/countryList'} className="nav-link">Country List</Link>
                </li>
              </ul>
            </div>
          </nav> <br />
          <Switch>
            <Route exact path='/countryAdd' component={countryAdd} />
            <Route path='/countryList' component={countryList} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;

