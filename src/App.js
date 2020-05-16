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
import AdminRouter from './screens/admin/AdminRouter';
import GroupAdminRouter from './screens/groupAdmin/GroupAdminRouter';
import Orders from './screens/admin/Orders';
import Volunteers from './screens/admin/Volunteers';
import Groups from './screens/admin/Groups';
import Cancellations from './screens/admin/Cancellations';
import Mottaget from './screens/users/Mottaget';
import GrantAdminAccess from './screens/admin/GrantAdminAccess';

//Info screens
import HowTo from './screens/info/HowTo';
import Intro from './screens/info/Intro';
import Contact from './screens/info/Contact';

//Authentication
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';

import './App.scss';

require('dotenv').config();

function App(props) {
  const { isAuthenticated, isVerifying } = props;

  return (
    <div>
      <MainHeader />
      <div className="container">
        <Switch>
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
          {/* For admin */}
          <ProtectedRoute
            exact
            path="/admin"
            component={AdminRouter}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
            mainAdminOnly={false}
          />
          <ProtectedRoute
            path="/admin/mottaget"
            exact
            component={Mottaget}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
            mainAdminOnly={true}
          />
          <ProtectedRoute
            path="/admin/beställningar"
            exact
            component={Orders}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
            mainAdminOnly={true}
          />
          <ProtectedRoute
            path="/admin/volontärer"
            exact
            component={Volunteers}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
            mainAdminOnly={true}
          />
          <ProtectedRoute
            path="/admin/grupper"
            exact
            component={Groups}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
            mainAdminOnly={true}
          />
          <ProtectedRoute
            path="/admin/avbokningar"
            exact
            component={Cancellations}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
            mainAdminOnly={true}
          />
          <ProtectedRoute
            path="/admin/add"
            exact
            component={GrantAdminAccess}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
            mainAdminOnly={true}
          />
          {/* For groupadmin */}
          <ProtectedRoute
            path="/grupp/:groupLink/:groupId"
            exact
            component={GroupAdminRouter}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
            mainAdminOnly={false}
          /> 
          {/* For all */}
          <Route exact path="/login" component={Login} />
          <Route path="/">
            <Home />
          </Route>
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
