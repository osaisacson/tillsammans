import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

export default function Contact() {
  return (
    <div className="page-layout">
      <h2>Kontakt</h2>
      <br />
      <Accordion>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            <h6>VOLONTÄRSAMORDNARE</h6>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <p>
                Volontärsamordnare på Tjörn är Anna Berglund från
                Egnahemsfabriken. Vill du komma i kontakt med
                volontärsamordnaren når du henne på tjorn@allatillsammans.se
              </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="1">
            <h6>GRUPPLEDARE OCH VOLONTÄRSGRUPPER</h6>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <p>
                Volontärsinsatserna bedrivs i volontärsgrupper. Varje
                volontärsgrupp har 4-6 medlemmar och en gruppledare. Kontakta
                gruppledaren om du har frågor om din beställning efter att denna
                har fördelats till en grupp (du har fått ett sms eller
                epostmeddelande om detta).
              </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="2">
            <h6>VOLONTÄRER</h6>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="2">
            <Card.Body>
              <p>
                Enskilda volontärer nås genom gruppledare i respektive grupp
                eller genom att maila till tjorn@allatillsammans.se.
              </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="3">
            <h6>AVBOKA BESTÄLLNING</h6>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="3">
            <Card.Body>
              <p>
                Vill du dra tillbaka en beställning innan den har fördelats till
                en grupp? Skicka ett mail till tjorn@allatillsammans.se eller
                använd beställningsformuläret och skriv att du vill avboka.
              </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="4">
            <h6>SAMVERKANDE ORGANISATIONER</h6>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="4">
            <Card.Body>
              <p>
                Medverkande och samverkande organisationer som stöttar
                civilsamhällets volontärsorganisering på Tjörn är:
              </p>
              <ul>
                <li>Egnahemsfabriken</li>
              </ul>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
}
