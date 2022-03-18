import React from "react";
import Accordion from "../../components/Accordion";

export default function Contact() {
  return (
    <div className="page-layout">
      <h2>Kontakt</h2>
      <br />
      <Accordion
        title="KONTAKTPERSONER"
        content=" <p>
          <p>Samordnaren på Tjörn är Magdalena Romanov (Tjörns Kommun). Henne når du på magdalena.romanov@tjorn.se</>
          <p>Utvecklare: Åsa Isacson (Egnahemsfabriken). Henne når du på osa@egnahemsfabriken.se eller 0790 752 602
        </p>"
      />
      <Accordion
        title="GRUPPLEDARE OCH VOLONTÄRSGRUPPER"
        content=" <p>
          Volontärsinsatserna bedrivs i volontärsgrupper. Varje
          volontärsgrupp har 4-6 medlemmar och en gruppledare. Kontakta
          gruppledaren om du har frågor - du får ett
          epostmeddelande med kontaktdetaljer till din grupp när du blir indelad.
        </p>"
      />
      <Accordion
        title="FEEDBACK OCH FÖRSLAG"
        content="  <p>
        Vi uppgraderar kontinuerligt siten för att möta behov, och tar gärna emot förslag om utökning och förbättringar!
        </p>
        <p>osa@egnahemsfabriken.se
        </p>
        "
      />
    </div>
  );
}
