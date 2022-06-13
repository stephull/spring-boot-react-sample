import React, {Component} from 'react';
import "./App.css";
import Home from './Home';
import QueryEdit from './QueryEdit';
import QueryList from "./QueryList";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact={true} component={Home}/>
          <Route path="/api/v1/queries" exact={true} component={QueryList}/>
          <Route path="/api/v1/queries/:id" exact={true} component={QueryEdit}/>
        </Switch>
      </Router>
    );
  }
}