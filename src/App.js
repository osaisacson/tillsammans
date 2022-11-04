import React from "react";
import { Routes, Route } from "react-router-dom";

//Components
import MainHeader from "./components/MainHeader";

//Screens
import Home from "./screens/Home";

import "./App.scss";

function App() {
  return (
    <div>
      <MainHeader />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
