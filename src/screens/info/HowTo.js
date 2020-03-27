import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
export default function HowTo() {
  return (
    <div className="page-layout">
      <h2> Såhär funkar det </h2>
      <br />
      <Accordion>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            <h6>VILKA STÅR BAKOM TJÄNSTEN OCH VAD ÄR DESS SYFTE?</h6>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              {' '}
              <ul>
                <li>
                  Beställningstjänsten ALLA TILLSAMMANS MOT COVID-19 PÅ TJÖRN
                  drivs av frivilliga krafter i civilsamhällets organisationer
                  på Tjörn.
                </li>
                <li>
                  Syftet med tjänsten är att hjälpa dig som sitter i
                  karantän/självisolering med att få ärenden utanför hemmet
                  utförda av volontärer – för att du inte ska behöva lämna din
                  karantän.
                </li>
                <li>
                  Vårt gemensamma mål med detta är att minimera smittspridningen
                  under pandemin 2020 och att skydda utsatta och särskilt
                  sårbara grupper från smittan.
                </li>
              </ul>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="1">
            <h6>VEM KAN ANVÄNDA TJÄNSTEN?</h6>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              {' '}
              <ul>
                <li>
                  Syftet med tjänsten är att hjälpa den som sitter i
                  karantän/självisolering med att få ärenden utanför hemmet
                  utförda av volontärer – för att du inte ska behöva lämna din
                  karantän.
                </li>
                <li>
                  Tjänsten är öppen att använda för alla som behöver den och bor
                  eller vistas på Tjörn under den period då myndigheter
                  rekommenderar social distansering för att begränsa
                  smittspridning.
                </li>
              </ul>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="2">
            <h6>VAD KAN MAN FÅ HJÄLP MED?</h6>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              {' '}
              <ul>
                <li>
                  Tjänsten kan användas för att beställa hjälp med de flesta
                  typer av ärenden. Det behöver alltså inte bara handla om att
                  handla mat utan kan vara att hämta upp / lämna någonting, att
                  handla djurmat osv.{' '}
                </li>
                <li>
                  Vi försöker efter bästa förmåga hantera och bistå alla
                  beställningar.{' '}
                </li>
                <li>
                  Eftersom längre social isolering och osäkerhet kan vara mycket
                  mentalt påfrestande har vi även i vårt beställningsformulär
                  alternativet ”prata” – vi har volontärer som kan ringa upp dig
                  som främst önskar någon att prata med.
                </li>
              </ul>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="3">
            <h6>HUR HANTERAS DIN BESTÄLLNING?</h6>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              {' '}
              <ul>
                <li>
                  Efter att du skickat in din beställning lagras den i vårt
                  system. Volontärsamordnaren tittar på var på Tjörn du bor och
                  vad du behöver hjälp med och fördelar därefter baserat på
                  informationen din beställning till en av de aktiva
                  volontärgrupperna på Tjörn.
                </li>
                <li>
                  Ju mer information du förser din beställning med (i
                  meddelanderutan) desto lättare blir den för oss att hantera.
                </li>
                <li>
                  Om vi inte har möjlighet att hjälpa dig kommer vi så snart som
                  möjligt att kontakta dig på telefon och meddela detta.
                </li>
                <li>
                  Om din beställning behöver kompletteras med information för
                  att kunna fullföljas blir du kontaktad på telefon angående
                  detta av en volontär.
                </li>
                <li>
                  Om du vill avboka en lagd beställning ber vi dig att kontakta
                  volontärsamordnaren på tjorn@allatillsammans.se
                </li>
              </ul>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="3">
            <h6>VAD KOSTAR DET? HUR FUNGERAR BETALNINGAR?</h6>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              {' '}
              <ul>
                <li>Att använda tjänsten är gratis.</li>
                <li>
                  Är det ett inköp som du behöver hjälp med så ersätter du
                  kostnaden för inköpet i efterskott. Volontären lägger ut
                  pengar vid inköpet och skickar dig direkt ett sms med ett foto
                  av kvittot. Du betalar med betaltjänsten Swish (på mobil)
                  eller med kontanter i samband med att du får leveransen.
                </li>
                <li>
                  Bensinkostnaderna för transporter kopplade till
                  beställningarna fördelas mellan de medverkande
                  civilsamhällesorganisationerna.
                </li>
              </ul>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="3">
            <h6>KAN JAG LITA PÅ VOLONTÄRERNA?</h6>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <ul>
                <li>
                  Alla beställningar passerar Volontärsamordnaren som fördelar
                  dem till lämplig grupp baserat på beställningens innehåll och
                  adress. Varje grupp har en gruppledare som i sin tur fördelar
                  beställningen till en av gruppens 6-8 volontärer. Gruppledaren
                  står i ständig kontakt med gruppens volontärer och rapporterar
                  till volontärsamordnaren när en beställning är färdighanterad.
                </li>
                <li>
                  En beställning får inte flaggas som KLAR i vårt system om inte
                  gruppledaren har bekräftat att den är färdig. Det innebär att
                  det alltid är tre personer – och varken fler eller färre – som
                  vet om att du har gjort en beställning.
                </li>
                <li>
                  Kom ihåg att volontärerna är vanliga människor, andra Tjörnbor
                  och alla gör så gott de kan!
                </li>
              </ul>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
}
