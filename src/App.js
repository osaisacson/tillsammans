import React from "react";
import { Switch, Route } from "react-router-dom";

//Components
import MainHeader from "./components/MainHeader";

//Screens
import Home from "./screens/Home";
import About from "./screens/info/About";
import Partners from "./screens/info/Partners";
import Intro from "./screens/info/Intro";
import Contact from "./screens/info/Contact";

import "./App.scss";

require("dotenv").config();

function App(props) {
  return (
    <div>
      <MainHeader />
      <div className="container">
        <Switch>
          <Route path="/om-samarbetet">
            <About />
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
          {/* For all */}
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
