import React from "react";
import Accordion from "../components/Accordion";

export default function About() {
  return (
    <div className="page-layout">
      <h2> OM SAMARBETET </h2>
      <br />
      <div>
        <Accordion
          title="VILKA STÅR BAKOM ALLA TILLSAMMANS OCH VAD ÄR VÅRT SYFTE?"
          content=" <ul>
          <li>
        Alla tillsammans är en plattform där Tjörns kommun och civilsamhälle samordnar insatser och behov för olika målgrupper inom kommunen i extraordinära situationer, så som Covid-19, eller flyktingströmmar från kriget i Ukraina.
          </li>
          <li> Vårt gemensamma mål är att snabbt sätta upp stödaktioner för utsatta och särskilt
          sårbara grupper.</li>
          <li>
          Se listan av samarbetsorganisationer på startsidan. Där kan man även gå med som samarbetspartner.          </li>

        </ul>"
        />
        <Accordion
          title="VEM RIKTAR VI OSS TILL?"
          content="<ul>
          <li>
            Alla som vill engagera sig aktivt med att hjälpa till i krissituationer.
          </li>
        </ul>"
        />
        <Accordion
          title="VAD HÄNDER NÄR DU ANMÄLT DITT BEHOV?"
          content="
          <ul>
          <li>
            När du skickar in ditt behov väljer du också vilken samarbetspartner du vill ska hantera det. Ett email med detaljerna om behovet skickas då direkt till huvudkontakt + reservkontakt för din valda samarbetspartner. Dessa kommer kontakta dig så fort de har hittat den lösning.
          </li>
        </ul>"
        />
      </div>
    </div>
  );
}
