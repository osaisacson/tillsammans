import React from "react";
import Accordion from "../../components/Accordion";
import allaTillsammansPic from "./../../images/allatillsammans.PNG";

export default function Contact() {
  return (
    <div className="page-layout">
      <h2>Kontakt</h2>
      <br />
      <Accordion
        title="SAMORDNARE"
        content=" <p>
          Samordnaren på Tjörn är Anna Berglund (Egnahemsfabriken). Henne når du på tjorn@allatillsammans.se
        </p>
        <p>Föredrar du istället att ringa in din beställning kan du göra detta på 0304 - 60 10 10 (kundcenter kommunen, uppge att du vill
        beställa från Alla Tillsammans) eller maila 
        tjorn@allatillsammans.se</p>"
      />
      <Accordion
        title="GRUPPLEDARE OCH VOLONTÄRSGRUPPER"
        content=" <p>
          Volontärsinsatserna bedrivs i volontärsgrupper. Varje
          volontärsgrupp har 4-6 medlemmar och en gruppledare. Kontakta
          gruppledaren om du har frågor om din beställning (du får ett sms eller
          epostmeddelande med kontaktdetaljer till din grupp när beställningen har fördelats).
        </p>"
      />
      <Accordion
        title="VOLONTÄRER"
        content=" <p>
          Enskilda volontärer nås genom gruppledare i respektive grupp
          eller genom att maila till tjorn@allatillsammans.se.
        </p>"
      />
      <Accordion
        title="AVBOKA BESTÄLLNING"
        content=" <p>
          Vill du dra tillbaka en beställning? Skicka ett mail till tjorn@allatillsammans.se eller
          använd avbokningsformuläret <a href='https://tjorn.allatillsammans.se/avboka'>här</div></a>.
        </p>"
      />
      <Accordion
        title="FEEDBACK OCH FÖRSLAG"
        content="  <p>
        Vi uppgraderar kontinuerligt siten för att möta behov, och tar gärna emot förslag om utökning och förbättringar!
        </p>
        <p>Webbansvarig: Åsa Isacson
        </p>
        <p>asaisacson@gmail.com
        </p>"
      />
      <img
        alt=""
        src={allaTillsammansPic}
        width="100%"
        className="full-width-pic"
      />
    </div>
  );
}
