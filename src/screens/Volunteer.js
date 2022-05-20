import React from "react";
import Accordion from "../components/Accordion";

export default function Volunteer() {
  return (
    <div className="page-layout">
      <h2> Bli volontär </h2>
      <p>
        Se listan på aktörer i Tjörns civilsamhälle som organiserar volontärer
        nedan.
      </p>
      <br />

      <div>
        <Accordion
          title="Svenska Kyrkan"
          content="Här ska information om hur man blir volontär hos samarbetspartnern finnas"
        />
        <Accordion
          title="Egnahemsfabriken"
          content="För att hjälpa till med arbetet Egnahemsfabriken gör se info på deras hemsida under 
          <a href=`https://tjorn.egnahemsfabriken.se/bidra-och-delta/`>Bidra/Delta</a> 
          </br> Egnahemsfabriken har också ett 
          <a href=`https://tjorn.egnahemsfabriken.se/biblioteket/`>bibliotek</a> med projekt som söker finansiering."
        />
        <Accordion
          title="Tjörns Röda Korskrets"
          content="Här ska information om hur man blir volontär hos samarbetspartnern finnas"
        />
        <Accordion
          title="Samarbetspartner"
          content="Här ska information om hur man blir volontär hos samarbetspartnern finnas"
        />
        <Accordion
          title="Samarbetspartner"
          content="Här ska information om hur man blir volontär hos samarbetspartnern finnas"
        />
        <Accordion
          title="Samarbetspartner"
          content="Här ska information om hur man blir volontär hos samarbetspartnern finnas"
        />
        <Accordion
          title="Samarbetspartner"
          content="Här ska information om hur man blir volontär hos samarbetspartnern finnas"
        />
      </div>
    </div>
  );
}
