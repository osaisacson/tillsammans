import React from "react";
import { Link } from "react-router-dom";

import School from "./../images/illustration-pointer-med-text.png";
import Icon2 from "./../images/symbol1.png";
import Icon3 from "./../images/symbol3.png";
import kaffe from "./../images/kaffe.png";

import IconButton from "./../components/IconButton";
import Footer from "./../components/Footer";

export default function Home() {
  return (
    <>
      <div>
        <div className="large-button-container">
          <div className="blurb">
            <img src={School} className="school" alt="" />
          </div>

          <Link to={`/bestallning`}>
            <IconButton
              icon={Icon2}
              text={"Jag vill beställa hjälp med ärenden"}
            />
          </Link>
          <Link to={`/bli-volontar`}>
            <IconButton icon={Icon3} text={"Jag vill bli volontär"} />
          </Link>
          <Link to={`/corona-fika`}>
            <IconButton icon={kaffe} text={"Jag vill delta på Coronafika"} />
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
