import React from "react";
import { Link } from "react-router-dom";

import School from "./../images/illustration-pointer-med-text.png";
import Icon2 from "./../images/symbol1.png";
import kaffe from "./../images/kaffe.png";
import SPF from "./../images/SPF.png";
import SvenskaKyrkan from "./../images/SvenskaKyrkan.png";
import StudieforbundetVuxenskolan from "./../images/StudieforbundetVuxenskolan.png";
import TjornsKommun from "./../images/TjornsKommun.png";

import IconButton from "./../components/IconButton";
import ScheduleItem from "./../components/ScheduleItem";

var isStillMay = "2021-05-29";
var CurrentDate = new Date();
isStillMay = new Date(isStillMay);
console.log(CurrentDate);

let Schedule = {};

if (isStillMay > CurrentDate) {
  Schedule = [
    {
      title: "Folkhälsovecka! - Föreläsningar",
      date: "17-21 Maj",
      details:
        "Som en del av SPF Seniorernas Folkhälsovecka erbjuds digitala föreläsningar med fokus på ett hälsosamt liv och åldrande som träningstips, kostråd, hjärngympa och psykisk hälsa. Samtliga föreläsningar kommer att kunna ses på spfseniorerna.se/folkhalsovecka.",
      link: "https://www.spfseniorerna.se/globalassets/foreningar/tjornveteranerna/forelasningar-folkhalsoveckan.pdf",
      icon: SPF,
      partner: "SPF Seniorerna",
    },
    {
      title: "Prova på Boule",
      date: "20 Maj 13.00-15.00",
      details:
        "Florence Karlsson, tel. 076-813 02 53. Vi spelar på banorna vid Kroksdalshallen.",
      link: "https://www.spfseniorerna.se/distrikt/bohusdistriktet/foreningslista/Tjornveteranerna/aktiviteter/kalender/prova-pa-boule/",
      icon: SPF,
      partner: "SPF Seniorerna",
    },
    {
      title: "Kulturhistorisk promenad Hakenäset",
      date: "20 Maj 10.00",
      details: "Henry Hermansson tel. 070-635 31 55. Samling Bökeviken, Rörvik",
      link: "https://www.spfseniorerna.se/distrikt/bohusdistriktet/foreningslista/Tjornveteranerna/",
      icon: SPF,
      partner: "SPF Seniorerna",
    },
    {
      title: "Kulturhistorisk promenad Toröd",
      date: "21 Maj 10.00",
      details: "Henry Hermansson tel. 070-635 31 55. Samling Klövedals kyrka",
      link: "https://www.spfseniorerna.se/distrikt/bohusdistriktet/foreningslista/Tjornveteranerna/",
      icon: SPF,
      partner: "SPF Seniorerna",
    },
    {
      title: "Instruktörslett träningspass för seniorer",
      date: "21 maj kl.13.30-15.00",
      details:
        "Jenny Sandberg, leg.sjukgymnast, tel. 010-473 46 70. Kållekärrs utegym bredvid vårdcentralen",
      link: "https://www.spfseniorerna.se/distrikt/bohusdistriktet/foreningslista/Tjornveteranerna/",
      icon: SPF,
      partner: "SPF Seniorerna",
    },
    {
      title: "Skogsbad - guidad naturupplevelse",
      date: "24 Maj 18.00-20.30",
      details:
        "Skogsbad är vandring långsamt i naturen och göra övningar som uppmuntrar till att använda sinnena aktivt och utöva närvaro/härvaro. Vi träffas på Sundsby säteri. Kostnad: 350kr. vast@sv.se eller 010-3300900",
      link: "https://www.sv.se/avdelningar/sv-vast/kurser/skogsbad---guidad-naturupplevelse-77730/?fbclid=IwAR2gy5dFFto85XT1Mh3zY-OYP1TBUEHbZjTcXIouFgzone4SlNs7gfwNvTw",
      icon: StudieforbundetVuxenskolan,
      partner: "Studieförbundet Vuxenskolan",
    },
    {
      title: "Kållekärrs Utegym",
      date: "Öppet!",
      details:
        "Kållekärrs utegym bredvid vårdcentralen. Kostnadsfritt att använda. Vid frågor om utegymmet kontakta föreningssamordnare Camilla Jansson Edholm, camilla.jansson.edholm@tjorn.se  Tel. 0304- 60 11 51",
      link: "https://www.tjorn.se/kultur-fritid-och-turism/idrott-och-motion/utegym",
      icon: TjornsKommun,
      partner: "Tjörns Kommun",
    },
  ];
} else {
  Schedule = [
    {
      title: "Kållekärrs Utegym",
      date: "Öppet!",
      details:
        "Kållekärrs utegym bredvid vårdcentralen. Kostnadsfritt att använda. Vid frågor om utegymmet kontakta föreningssamordnare Camilla Jansson Edholm, camilla.jansson.edholm@tjorn.se  Tel. 0304- 60 11 51",
      link: "https://www.tjorn.se/kultur-fritid-och-turism/idrott-och-motion/utegym",
      icon: TjornsKommun,
      partner: "Tjörns Kommun",
    },
  ];
}

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
