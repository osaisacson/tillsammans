import React from 'react';
import Accordion from '../../components/Accordion';

export default function Contact() {
  return (
    <div className="page-layout">
      <h2>Kontakt</h2>
      <br />
      <Accordion
        title="VOLONTÄRSAMORDNARE"
        content=" <p>
          Volontärsamordnare på Tjörn är Anna Berglund från
          Egnahemsfabriken. Vill du komma i kontakt med
          volontärsamordnaren når du henne på tjorn@allatillsammans.se
        </p>
        <p>
          Om du istället föredrar att ringa in din beställning kan du
          kontakta Maria Eriksson (Diakon, Stenkyrka församling - Svenska
          kyrkan Tjörn) på 0733 230 515.
        </p>"
      />
      <Accordion
        title="GRUPPLEDARE OCH VOLONTÄRSGRUPPER"
        content=" <p>
          Volontärsinsatserna bedrivs i volontärsgrupper. Varje
          volontärsgrupp har 4-6 medlemmar och en gruppledare. Kontakta
          gruppledaren om du har frågor om din beställning efter att denna
          har fördelats till en grupp (du har fått ett sms eller
          epostmeddelande om detta).
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
          Vill du dra tillbaka en beställning innan den har fördelats till
          en grupp? Skicka ett mail till tjorn@allatillsammans.se eller
          använd beställningsformuläret och skriv att du vill avboka.
        </p>"
      />
      <Accordion
        title="SAMVERKANDE ORGANISATIONER"
        content="  <p>
          Medverkande och samverkande organisationer som stöttar
          civilsamhällets volontärsorganisering på Tjörn är:
        </p>
        <ul>
          <li>Egnahemsfabriken</li>
        </ul>"
      />
      <Accordion
        title="FEEDBACK OCH FÖRSLAG"
        content="  <p>
        Vi tar gärna emot förslag om förbättringar av siten!
        </p>
        <p>Webbansvarig: Åsa Isacson
        </p>
        <p>asaisacson@gmail.com
        </p>"
      />
    </div>
  );
}
