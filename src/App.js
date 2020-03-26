import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//Reducers
import ordersReducer from './store/reducers/orders';
// import groupsReducer from './store/reducers/groups';
// import volunteersReducer from './store/reducers/volunteers';
// import authReducer from './store/reducers/auth';

//All screens
import Home from './screens/Home';
//User screens
import Apply from './screens/users/Apply';
import Volunteer from './screens/users/Volunteer';
//Admin screens
import Admin from './screens/admin/Admin';
import SignInPage from './screens/admin/SignInPage';
import Orders from './screens/admin/Orders';
import Volunteers from './screens/admin/Volunteers';
import Groups from './screens/admin/Groups';
import Mottaget from './screens/users/Mottaget';
//Info screens
import Conditions from './screens/info/Conditions';
import HowTo from './screens/info/HowTo';
import Intro from './screens/info/Intro';
import Network from './screens/info/Network';

import './App.scss';

//Combines all the reducers which manages our redux state. This is where we geet our current state from in the child screens.
const rootReducer = combineReducers({
  orders: ordersReducer
  // groups: groupsReducer,
  // volunteers: volunteersReducer
  // auth: authReducer
});

//NOTE: remove composeWithDevTools before deploying the app. It is only used for React Native Debugger.
// const store = createStore(rootReducer, composeWithDevTools());

const store = createStore(rootReducer, applyMiddleware(ReduxThunk)); //Redux, manages our state.

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="container">
          <Switch>
            {/* För användare */}
            <Route path="/ansök-om-assistans">
              <Apply />
            </Route>
            <Route path="/bli-volontar">
              <Volunteer />
            </Route>
            <Route path="/vilkor">
              <Conditions />
            </Route>
            <Route path="/sahar-funkar-det">
              <HowTo />
            </Route>
            <Route path="/intro">
              <Intro />
            </Route>
            <Route path="/natverk">
              <Network />
            </Route>
            {/* För admin */}
            <Route path="/admin">
              <Admin />
            </Route>
            <Route path="/sign-in">
              <SignInPage />
            </Route>
            <Route path="/mottaget">
              <Mottaget />
            </Route>
            <Route path="/beställningar">
              <Orders />
            </Route>
            <Route path="/volontärer">
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
    </Provider>
  );
}
