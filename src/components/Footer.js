import React from "react";
// import { Link } from "react-router-dom";
var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("footer").style.top = "0";
  } else {
    document.getElementById("footer").style.display = "none";
  }
  prevScrollpos = currentScrollPos;
};

const Footer = () => (
  <div id="footer" className="footer">
    <p>
      Alla Tillsammans är ett ideellt initiativ som stöttar de som behöver
      temporär hjälp under Coronaepidemin.
      <br></br> Vi hjälper främst de som under krisen har hamnat mellan stolarna
      och behöver en hjälpande hand med ärenden för att kunna bibehålla sin
      självkarantän.
    </p>
    {/* <p>I denna roll har vi via våra fabulösa volontärer under 2020 utfört nästan 300 ärenden, men från och med januari 2021 drog vi ner på vår hjälpverksamhet eftersom vi fyllt vår funktion. De som använder plattformen regelbundet kommer hjälpas med att lösa övergången till långsiktiga lösningar.
    </p>
<p>Vi är fortfarande igång, men vill redan nu passa på att varmt tacka alla volontärer och beställare för ert samarbete. Tillsammans har ni dragit ert strå till stacken med att begränsa smittspridningen 2020! För framtiden är vårt samarbete etablerat och vår stödstruktur kommer stå redo att aktiveras närhelst vi behövs. Under tiden - ta hand om er <span role="img" aria-label="heart">❤️</span></p> */}
    {/* <p>
      <Link id="tips" to="/tips">
        LÄS MER
      </Link>
    </p> */}
  </div>
);

export default Footer;
