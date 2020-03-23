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
import Orders from './screens/admin/Orders';
import Volunteers from './screens/admin/Volunteers';
import Groups from './screens/admin/Groups';

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
    </Provider>
  );
}
