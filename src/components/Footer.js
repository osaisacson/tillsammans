import React from "react";
import { Link } from "react-router-dom";

const Footer = (props) => (
  <div className="footer">
    <p className="bold">TIPS:</p>
    <p>
      Studiecirklar för Tjörnbor online: 'Våra dialekter' (start vecka 34),
      'Seniorsurfarna' (start vecka 34)
    </p>
    <p>Ny Coronasäkra aktiviteter: 'Prova på Boule' och 'Bygg för barnen!'</p>
    <p>
      <Link id="tips" to="/tips">
        LÄS MER
      </Link>
    </p>

    {/* <p>
      Äldrevården i Tjörns kommun söker akut förstärkning av personal.{" "}
      <a
        target=""
        href="https://www.tjorn.se/arkiv/nyheter2020/villduvaramedochbidratillsverigesjustnuviktigastejobb.5.1e578a6216fb6758ddefc6e.html"
      >
        LÄS MER
      </a>
    </p> */}
  </div>
);

export default Footer;
