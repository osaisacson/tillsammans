import React from "react";
import { Link } from "react-router-dom";

import School from "./../images/illustration-pointer-med-text.png";
import Icon2 from "./../images/symbol1.png";
import kaffe from "./../images/kaffe.png";
import SPF from "./../images/SPF.png";
import SvenskaKyrkan from "./../images/SvenskaKyrkan.png";
import StudieforbundetVuxenskolan from "./../images/StudieforbundetVuxenskolan.png";

import IconButton from "./../components/IconButton";
import ScheduleItem from "./../components/ScheduleItem";

const Schedule = [
  {
    title: "Folkhälsovecka! - Aktiviteter",
    date: "17-21 Maj",
    details:
      "Varmt välkomna på Folkhälsovecka! SPF kommer bland annat att ha kulturhistoriska promenader runt Tjörn, prova på boule, seniorgympa och golf. Alla aktiviteter sker utomhus och med smittsäkra rutiner. De som deltar i flest utomhusaktiviteter har chans att vinna fina priser!",
    link:
      "https://www.spfseniorerna.se/globalassets/foreningar/tjornveteranerna/folkhalsoveckan-affisch.pdf",
    icon: SPF,
    partner: "SPF Seniorerna",
  },
  {
    title: "Folkhälsovecka! - Föreläsningar",
    date: "17-21 Maj",
    details:
      "Som en del av SPF Seniorernas Folkhälsovecka erbjuds digitala föreläsningar med fokus på ett hälsosamt liv och åldrande som träningstips, kostråd, hjärngympa och psykisk hälsa. Samtliga föreläsningar kommer att kunna ses på spfseniorerna.se/folkhalsovecka.",
    link:
      "https://www.spfseniorerna.se/globalassets/foreningar/tjornveteranerna/forelasningar-folkhalsoveckan.pdf",
    icon: SPF,
    partner: "SPF Seniorerna",
  },
];

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
          <Link to={`/corona-fika`}>
            <IconButton icon={kaffe} text={"Jag vill delta på Coronafika"} />
          </Link>
        </div>

        <div className="schedule-container">
          <div className="schedule-greeting bold">
            Varmt välkomna till våra partneraktiviteter!
          </div>
          {Schedule.map((item) => {
            return (
              <ScheduleItem
                key={item.id}
                title={item.title}
                date={item.date}
                details={item.details}
                icon={item.icon}
                partner={item.partner}
                link={item.link}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
