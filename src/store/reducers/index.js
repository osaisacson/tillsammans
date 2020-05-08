import { combineReducers } from "redux";

//Reducers TBD: Currently not in use.
import ordersReducer from './orders';
import groupsReducer from './groups';
import volunteersReducer from './volunteers';
import cancellationsReducer from './cancellations';
import authReducer from './auth';

//Combines all the reducers which manages our redux state. This is where we geet our current state from in the child screens.
export default combineReducers({
    orders: ordersReducer,
    volunteers: volunteersReducer,
    groups: groupsReducer,
    cancellations: cancellationsReducer,
    auth: authReducer
  });