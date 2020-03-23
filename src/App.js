import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//All screens
import Home from './screens/Home';
//User screens
import Apply from './screens/users/Apply';
import Volunteer from './screens/users/Volunteer';
//Admin screens
import Admin from './screens/admin/Admin';
import Orders from './screens/admin/Orders';
import Volunteers from './screens/admin/Volunteers';
import Groups from './screens/admin/Groups';

import './App.scss';

export default function App() {
  return (
    <Router>
      <div className="container">
        <Switch>
          {/* För användare */}
          <Route path="/ansök-om-assistans">
            <Apply />
          </Route>
          <Route path="/bli-voluntär">
            <Volunteer />
          </Route>
          {/* För admin */}
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/beställningar">
            <Orders />
          </Route>
          <Route path="/voluntärer">
            <Volunteers />
          </Route>
          <Route path="/grupper">
            <Groups />
          </Route>
          {/* För alla */}
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
