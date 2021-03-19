import React from "react";
import { Link } from "react-router-dom";

import School from "./../images/illustration-pointer-med-text.png";
import Icon2 from "./../images/symbol1.png";
// import Icon3 from "./../images/symbol3.png";
import kaffe from "./../images/kaffe.png";
import SPF from "./../images/SPF.png";
import SvenskaKyrkan from "./../images/SvenskaKyrkan.png";
import RodaKorset from "./../images/RodaKorset.svg";
import StudieforbundetVuxenskolan from "./../images/StudieforbundetVuxenskolan.png";

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
          <div className="schedule-greeting bold">
            Varmt välkomna till våra partneraktiviteter!
          </div>
          <ScheduleItem
            title={"Digitala gudstjänster och andakter"}
            date={"1-31"}
            month={"Mars"}
            details={
              "Vi fortsätter sända en gudstjänst varje söndag 11.00 via vår hemsida och fram till 24 mars även en onsdagsandakt."
            }
            icon={SvenskaKyrkan}
            partner={"Svenska Kyrkan"}
          />
          <ScheduleItem
            title={"Bordtennis"}
            date={"11,18,25"}
            month={"April"}
            details={
              "Varje torsdag kl. 10.00. Florence Karlsson tel. 076-813 02 53. Bordtennislokalen (belägen nära Humlan, Kållekärr). Tag med racket och egna bollar."
            }
            icon={SPF}
            partner={"SPF Seniorerna"}
          />
          <ScheduleItem
            title={"Digitalt måndagscafé"}
            date={"26"}
            month={"April"}
            details={
              "Studieförbundet Vuxenskolan tillsammans med Stenungsunds kommun, ABF, SPF och PRO erbjuder ett digitalt café kl. 14-15. Caféet kommer att ha en hemlig gäst som deltar. Det blir en blandning av humor, underhållning, berättelser, nostalgi, historia och hälsa."
            }
            icon={StudieforbundetVuxenskolan}
            partner={"Studieförbundet Vuxenskolan"}
          />
        </div>
      </div>
    </>
  );
}
