import React from "react";
// var prevScrollpos = window.pageYOffset;
// window.onscroll = function () {
//   var currentScrollPos = window.pageYOffset;
//   if (prevScrollpos > currentScrollPos) {
//     document.getElementById("footer").style.top = "0";
//   } else {
//     document.getElementById("footer").style.display = "none";
//   }
//   prevScrollpos = currentScrollPos;
// };

const Footer = () => (
  <div id="footer" className="footer">
    <p>
      Alla Tillsammans är ett ideellt initiativ som stöttar de som behöver
      temporär hjälp under Coronaepidemin.
      <br></br> Vi hjälper främst de som under krisen har hamnat mellan stolarna
      och behöver en hjälpande hand med ärenden för att kunna bibehålla sin
      självkarantän.
    </p>
  </div>
);

export default Footer;
