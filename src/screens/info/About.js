import React from "react";
import Accordion from "../../components/Accordion";

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
            'Alla Tillsammans'
            drivs av frivilliga krafter i civilsamhällets organisationer
            på Tjörn i samarbete med Tjörns Kommun. Se listan av samarbetsorganisationer på startsidan.
          </li>
          <li>
            Syftet är att snabbt svara mot kriser och samordna civilsamhället i behövda aktioner.
          </li>
          <li>
            Vårt gemensamma mål är  att skydda utsatta och särskilt
            sårbara grupper i krissituationer som exempelvis epidemin Covid-19 eller kriget i Ukraina.
          </li>
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
          title="VAD HÄNDER NÄR MAN ANMÄLT SITT BIDRAG?"
          content="
          <ul>
          <li>
            Efter att du skickat in ditt bidrag lagras den i någon av våra 'banker'. För närvarande har vi en volontärsbank, en arbetsbank, en boendebank och en resursbank.
            Vi har också en behovsbank där man kan skicka in behov.
          </li>
          <li>
            Ju mer information du förser ditt bidrag med desto lättare blir det för oss att hantera.
          </li>
          <li>
            Vår samordnaren tittar på ditt bidrag, matchar det med ett behov och fördelar det därefter vidare till en av våra aktiva
            samarbetspartners, exempelvis Svenska Kyrkan.
          </li>
          <li>
          Du blir därefter kontaktad av denna samarbetspartner för vidare aktion.
          </li>
        </ul>"
        />
      </div>
    </div>
  );
}
