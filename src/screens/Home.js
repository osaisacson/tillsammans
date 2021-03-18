import React from "react";
import { Link } from "react-router-dom";

import School from "./../images/illustration-pointer-med-text.png";
import Icon2 from "./../images/symbol1.png";
// import Icon3 from "./../images/symbol3.png";
import kaffe from "./../images/kaffe.png";

import IconButton from "./../components/IconButton";
import ScheduleItem from "./../components/ScheduleItem";

export default function Home() {
  return (
    <>
      <div className="front-page-layout">
        <div className="blurb">
          <img src={School} className="school" alt="" />
        </div>

        <div className="large-button-container">
          <Link to={`/bestallning`}>
            <IconButton
              icon={Icon2}
              text={"Jag vill beställa hjälp med ärenden"}
            />
          </Link>
          {/* <Link to={`/bli-volontar`}>
            <IconButton icon={Icon3} text={"Jag vill bli volontär"} />
          </Link> */}
          <Link to={`/corona-fika`}>
            <IconButton icon={kaffe} text={"Jag vill delta på Coronafika"} />
          </Link>
        </div>

        <div className="schedule-container">
          <ScheduleItem
            date={"1-31"}
            month={"April"}
            time={"torsdagar 10:00"}
            details={
              "Florence Karlsson tel. 076-813 02 53. Bordtennislokalen (belägen nära Humlan, Kållekärr). Tag med racket och egna bollar."
            }
            partner={"SPF Seniorerna"}
          />
        </div>
      </div>
    </>
  );
}
