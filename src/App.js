import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from 'react-router-dom';
import Home from './screens/Home';
import Apply from './screens/Apply';
import Volunteer from './screens/Volunteer';

export default function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Startsida</Link>
          </li>
          {/* <li>
            <Link to="/apply">Ansök om assistans</Link>
          </li>
          <li>
            <Link to="/volunteer">Jag vill bli voluntär</Link>
          </li> */}
          {/* <li>
            <Link to="/topics">Topics</Link>
          </li> */}
        </ul>

        <Switch>
          <Route path="/apply">
            <Apply />
          </Route>
          <Route path="/volunteer">
            <Volunteer />
          </Route>
          {/* <Route path="/topics">
            <Topics />
          </Route> */}
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
//Example of nested navigation
// function Topics() {
//   let match = useRouteMatch();

//   return (
//     <div>
//       <h2>Topics</h2>

//       <ul>
//         <li>
//           <Link to={`${match.url}/components`}>Components</Link>
//         </li>
//         <li>
//           <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
//         </li>
//       </ul>

//       {/* The Topics page has its own <Switch> with more routes
//           that build on the /topics URL path. You can think of the
//           2nd <Route> here as an "index" page for all topics, or
//           the page that is shown when no topic is selected */}
//       <Switch>
//         <Route path={`${match.path}/:topicId`}>
//           <Topic />
//         </Route>
//         <Route path={match.path}>
//           <h3>Please select a topic.</h3>
//         </Route>
//       </Switch>
//     </div>
//   );
// }

// function Topic() {
//   let { topicId } = useParams();
//   return <h3>Requested topic ID: {topicId}</h3>;
// }
