import React from "react";
import { Routes, Route } from "react-router-dom";

//Components
import MainHeader from "./components/MainHeader";

//Screens
import Home from "./screens/Home";
import About from "./screens/info/About";
import Partners from "./screens/info/Partners";
import Intro from "./screens/info/Intro";
import Contact from "./screens/info/Contact";

import "./App.scss";

function App() {
  return (
    <div>
      <MainHeader />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="om-samarbetet" element={<About />} />
          <Route path="intro" element={<Intro />} />
          <Route path="kontakt" element={<Contact />} />
          <Route path="partners" element={<Partners />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
