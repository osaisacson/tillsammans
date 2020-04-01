import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//Reducers
import ordersReducer from './store/reducers/orders';
// import groupsReducer from './store/reducers/groups';
import volunteersReducer from './store/reducers/volunteers';
// import authReducer from './store/reducers/auth';

//Components
import MainHeader from './components/MainHeader';
import Footer from './components/Footer';

//All screens
import Home from './screens/Home';
//User screens
import Apply from './screens/users/Apply';
import Volunteer from './screens/users/Volunteer';
//Admin screens
import CheckAdmin from './screens/admin/CheckAdmin';
import Orders from './screens/admin/Orders';
import Volunteers from './screens/admin/Volunteers';
import Groups from './screens/admin/Groups';
import Mottaget from './screens/users/Mottaget';
//Info screens
import HowTo from './screens/info/HowTo';
import Intro from './screens/info/Intro';
import Contact from './screens/info/Contact';

import './App.scss';

require('dotenv').config();

//Combines all the reducers which manages our redux state. This is where we geet our current state from in the child screens.
const rootReducer = combineReducers({
  orders: ordersReducer,
  volunteers: volunteersReducer
  // groups: groupsReducer,
  // auth: authReducer
});

//NOTE: remove composeWithDevTools before deploying the app. It is only used for React Native Debugger.
// const store = createStore(rootReducer, composeWithDevTools());

const store = createStore(rootReducer, applyMiddleware(ReduxThunk)); //Redux, manages our state.

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <MainHeader />

        <div className="container">
          <Switch>
            {/* För användare */}
            <Route path="/bestallning">
              <Apply />
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
            {/* För admin */}
            <Route path="/admin">
              <CheckAdmin />
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
        <Footer />
      </Router>
    </Provider>
  );
}
