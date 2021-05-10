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
    title: "Folkhälsovecka! - Föreläsningar",
    date: "17-21 Maj",
    details:
      "Som en del av SPF Seniorernas Folkhälsovecka erbjuds digitala föreläsningar med fokus på ett hälsosamt liv och åldrande som träningstips, kostråd, hjärngympa och psykisk hälsa. Samtliga föreläsningar kommer att kunna ses på spfseniorerna.se/folkhalsovecka.",
    link:
      "https://www.spfseniorerna.se/globalassets/foreningar/tjornveteranerna/forelasningar-folkhalsoveckan.pdf",
    icon: SPF,
    partner: "SPF Seniorerna",
  },
  {
    title: "Kulturhistorisk promenad i Villekärr",
    date: "17 Maj 10.00",
    details:
      "Henry Hermansson tel. 070-635 31 55. Samling vid Edvardssons handelsträdgård.",
    link:
      "https://www.spfseniorerna.se/globalassets/foreningar/tjornveteranerna/folkhalsoveckan-affisch.pdf",
    icon: SPF,
    partner: "SPF Seniorerna",
  },
  {
    title: "Prova på Boule",
    date: "17 & 20 Maj 13.00-15.00",
    details:
      "Florence Karlsson, tel. 076-813 02 53. Vi spelar på banorna vid Kroksdalshallen.",
    link:
      "https://www.spfseniorerna.se/distrikt/bohusdistriktet/foreningslista/Tjornveteranerna/aktiviteter/kalender/prova-pa-boule/",
    icon: SPF,
    partner: "SPF Seniorerna",
  },
  {
    title: "Kulturhistorisk promenad Tuveslätt",
    date: "18 Maj 10.00",
    details:
      "Henry Hermansson tel. 070-635 31 55. Samling vid fotbollsplan, Tuveslätt",
    link:
      "https://www.spfseniorerna.se/globalassets/foreningar/tjornveteranerna/folkhalsoveckan-affisch.pdf",
    icon: SPF,
    partner: "SPF Seniorerna",
  },
  {
    title: "Seniorgympa med Gymmix",
    date: "18 Maj 14.00-15.00",
    details:
      "Birgitta Kjellman, tel. 070-512 59 86. Passet är ett s.k. Seniorpass, med fokus på coreträning, styrka, och balans. Medtag en handduk, den används som redskap i träningen.",
    link:
      "https://www.spfseniorerna.se/distrikt/bohusdistriktet/foreningslista/Tjornveteranerna/aktiviteter/kalender/seniorgympa-med-gymmix/",
    icon: SPF,
    partner: "SPF Seniorerna",
  },
  {
    title: "Kulturhistorisk promenad Kihl",
    date: "19 Maj 10.00",
    details:
      "Henry Hermansson tel. 070-635 31 55. Samling vid AD-bilar, Hjälteby",
    link:
      "https://www.spfseniorerna.se/globalassets/foreningar/tjornveteranerna/folkhalsoveckan-affisch.pdf",
    icon: SPF,
    partner: "SPF Seniorerna",
  },
  {
    title: "Prova på golf för seniorer",
    date: "19 maj 15.00-17.00",
    details:
      "Lisbeth Landström, tel. 070-567 44 87 Prova på golf och korthålsbanan, Tjörns golfklubb",
    link:
      "https://www.spfseniorerna.se/distrikt/bohusdistriktet/foreningslista/Tjornveteranerna/aktiviteter/kalender/prova-pa-golf/",
    icon: SPF,
    partner: "SPF Seniorerna",
  },
  {
    title: "Skogsbad - guidad naturupplevelse",
    date: "24 Maj 18.00-20.30",
    details:
      "Skogsbad är vandring långsamt i naturen och göra övningar som uppmuntrar till att använda sinnena aktivt och utöva närvaro/härvaro. Vi träffas på Sundsby säteri. Kostnad: 350kr. vast@sv.se eller 010-3300900",
    link:
      "https://www.sv.se/avdelningar/sv-vast/kurser/skogsbad---guidad-naturupplevelse-77730/?fbclid=IwAR2gy5dFFto85XT1Mh3zY-OYP1TBUEHbZjTcXIouFgzone4SlNs7gfwNvTw",
    icon: StudieforbundetVuxenskolan,
    partner: "Studieförbundet Vuxenskolan",
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
