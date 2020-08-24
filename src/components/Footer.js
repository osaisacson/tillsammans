import React from "react";
import { Link } from "react-router-dom";

const Footer = (props) => (
  <div className="footer">
    <p className="bold">Tips!</p>
    <p>
      Studiecirklar för Tjörnbor online: 'Våra dialekter' och 'Seniorsurfarna'
    </p>
    <p>Coronasäkra aktiviteter: 'Prova på Boule' och 'Bygg för barnen!'</p>
    <p>
      <Link id="tips" to="/tips">
        LÄS MER
      </Link>
    </p>
  </div>
);

export default Footer;
