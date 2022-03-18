import React from "react";
import Accordion from "../../components/Accordion";

export default function Contact() {
  return (
    <div className="page-layout">
      <h2>Kontaktpersoner</h2>

      <p>
        Tjörns Kommun: Magdalena Romanov. Henne når du på
        magdalena.romanov@tjorn.se
      </p>
      <p>
        Samordnare och utvecklare: Åsa Isacson (Egnahemsfabriken). Henne når du
        på osa@egnahemsfabriken.se eller 0790 752 602
      </p>
      <p>
        Volontärgrupper: Volontärsinsatserna bedrivs i volontärsgrupper. Varje
        volontärsgrupp har 4-6 medlemmar och en gruppledare. Kontakta
        gruppledaren om du har frågor - du får ett epostmeddelande med
        kontaktdetaljer till din grupp när du blir indelad.
      </p>

      <br />
      <h2>Feedback och förslag</h2>

      <p>
        Vi uppgraderar kontinuerligt siten för att möta behov, och tar gärna
        emot förslag om utökning och förbättringar!
      </p>
      <p>Har du förslag på hur vi kan göra plattformen bättre?</p>

      <a
        className="small-button draw meet"
        href="https://forms.monday.com/forms/e8eb72b489db14da16d374516228f0bb?r=use1"
      >
        Skicka oss din feedback!
      </a>
      <br />
    </div>
  );
}
