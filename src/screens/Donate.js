import React from "react";
import Accordion from "../components/Accordion";

export default function Donate() {
  return (
    <div className="page-layout">
      <h2>Skänk saker</h2>
      <p>
        Se listan på aktörer i Tjörns civilsamhälle som tar emot skänkta saker
        nedan.
      </p>
      <br />
      <div>
        <Accordion
          title="St Mary's"
          content="Här ska information om hur man skänker saker till samarbetspartnern finnas"
        />
        <Accordion
          title="Röda Korset"
          content="Här ska information om hur man skänker saker till samarbetspartnern finnas"
        />
        <Accordion
          title="Samarbetspartner"
          content="Här ska information om hur man skänker saker till samarbetspartnern finnas"
        />
        <Accordion
          title="Samarbetspartner"
          content="Här ska information om hur man skänker saker till samarbetspartnern finnas"
        />
        <Accordion
          title="Samarbetspartner"
          content="Här ska information om hur man skänker saker till samarbetspartnern finnas"
        />
      </div>
    </div>
  );
}
