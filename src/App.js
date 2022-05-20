import React from "react";
import { Routes, Route } from "react-router-dom";

//Components
import MainHeader from "./components/MainHeader";

//Screens
import Home from "./screens/Home";
import About from "./screens/About";
import Partners from "./screens/Partners";
import Intro from "./screens/Intro";
import Contact from "./screens/Contact";
import Donate from "./screens/Donate";
import Volunteer from "./screens/Volunteer";

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
          <Route path="skank-saker" element={<Donate />} />
          <Route path="bli-volontar" element={<Volunteer />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
