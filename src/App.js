import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

//Components
import MainHeader from './components/MainHeader';

//All screens
import Home from './screens/Home';

//User screens
import Apply from './screens/users/Apply';
import Partners from './screens/info/Partners';
import Cancel from './screens/users/Cancel';
import Volunteer from './screens/users/Volunteer';

//Admin screens
import Admin from './screens/admin/Admin';
import Orders from './screens/admin/Orders';
import Volunteers from './screens/admin/Volunteers';
import Groups from './screens/admin/Groups';
import Cancellations from './screens/admin/Cancellations';
import Mottaget from './screens/users/Mottaget';

//Group Admin screens
import GroupAdmin from './screens/groupAdmin/CheckGroupAdmin';

//Info screens
import HowTo from './screens/info/HowTo';
import Intro from './screens/info/Intro';
import Contact from './screens/info/Contact';

//Authentication
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';

import './App.scss';

require('dotenv').config();

//NOTE: remove composeWithDevTools before deploying the app. It is only used for React Native Debugger.
// const store = createStore(rootReducer, composeWithDevTools());

function App(props) {
  const { isAuthenticated, isVerifying } = props;

  return (
    <div>
      <MainHeader />
      <div className="container">
        <Switch>
          {/* For all */}
          <Route path="/">
            <Home />
          </Route>
          {/* For users */}
          <Route path="/bestallning">
            <Apply />
          </Route>
          <Route path="/avboka">
            <Cancel />
          </Route>
          <Route path="/bli-volontar">
            <Volunteer />
          </Route>
          <Route path="/byt-sprak"></Route>
          <Route path="/sahar-funkar-det">
            <HowTo />
          </Route>
          <Route path="/intro">
            <Intro />
          </Route>
          <Route path="/kontakt">
            <Contact />
          </Route>
          <Route path="/partners">
            <Partners />
          </Route>
          {/* Login */}
          <Route exact path="/admin" component={Login} />
          {/* For main admin */}
          <ProtectedRoute
            exact
            path="/main-admin"
            component={Admin}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          {/* For group admins */}
          <ProtectedRoute
            path="/grupp/:groupLink"
            exact
            component={GroupAdmin}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          {/* NOTE TO VISHNU: 
          These are sub routes of admin */}
          <ProtectedRoute
            path="/mottaget"
            exact
            component={Mottaget}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <ProtectedRoute
            path="/beställningar"
            exact
            component={Orders}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <ProtectedRoute
            path="/volontärer"
            exact
            component={Volunteers}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <ProtectedRoute
            path="/grupper"
            exact
            component={Groups}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <ProtectedRoute
            path="/avbokningar"
            exact
            component={Cancellations}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
        </Switch>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying,
  };
}

export default connect(mapStateToProps)(App);
