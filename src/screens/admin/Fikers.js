import React from "react";

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Badge from "react-bootstrap/Badge";

import Table from "../tables/Table";
import AddButtonHeader from "../../components/AddButtonHeader";
import RefreshButton from "../../components/RefreshButton";
import FikaForm from "../users/FikaForm";
import Accordion from "../../components/Accordion";

const Fikers = (props) => {
  return (
    <div className="page-layout">
      <AddButtonHeader
        headerText="Fikaintressenter"
        buttonText="fikaintressent"
        formForModal={<FikaForm />}
      />
      <Accordion
        title="Hur vi hanterar Fikaintressenter"
        content="<h5>Uppdatera i vårt system</h5>
        <ol>
        <li>Öppna redigering genom att klicka på pennan till vänster om fikaintressenten</li>
        <li>Kolla vilka intressen fikaintressenten angivit och välj baserat på detta en grupp till intressenten under 'Grupp'</li>
        <li>Ändra status till 'Fördelad till grupp' under 'Status'.</li>
        <li>Klicka på spara symbolen för att spara ändringar - om inte ändringarna syns direkt klicka refresh-knappen till höger</li>
        </ol>
        <br/>
        <h5>Kommunicera med fikaintressent</h5>
        <ol>
        <li>Under 'Bekräftelse till fikaintressent' klicka 'Skicka bekräftelse' - detta öppnar din email med mailet och addressen redan klart.</li>
        <li>Om det istället för ovan knapp står ett telefonnummer så låt det vara. Då är det upp till gruppledaren att kontakta fikaintressenten.</li>
        <li>När skickat - klicka knappen 'Kontaktad'</li>
      </ol>
      <br/>

        <h5>Kommunicera ny fikaintressent till grupp</h5>
        <ol>
        <li>Under 'Detaljer till grupp' klicka 'Skicka detaljer' - detta öppnar din email med mailet redan klart.</li>
        <li>Kolla detaljerna så allt ser bra ut och lägg till emailen för gruppledaren det ska skickas till</li>
        <li>När skickat - klicka knappen 'Skickad'</li>
      </ol>
      <br/>
      <p>Håll ett öga på fikaintressenten i systemet så gruppledaren så småningom markerar den som 'Aktiv', annars följ upp.</p>
      </br>"
      />

      <RefreshButton refreshAction={props.refreshAction} />

      <Tabs defaultActiveKey="nya" id="0">
        <Tab
          eventKey="nya"
          title={
            <span>
              Nya {""}
              {props.dbData.newFikers.length ? (
                <Badge pill variant="danger">
                  {props.dbData.newFikers.length}
                </Badge>
              ) : (
                0
              )}
            </span>
          }
        >
          <Table
            isAdmin
            isFikers
            groupId={props.groupId}
            tableData={props.dbData.newFikers}
            refreshAction={props.refreshAction}
          />
        </Tab>
        <Tab
          eventKey="fördelade"
          title={`Fördelade till grupper (${
            props.dbData.distributedFikers.length
              ? props.dbData.distributedFikers.length
              : 0
          })`}
        >
          <Table
            isAdmin
            isFikers
            groupId={props.groupId}
            tableData={props.dbData.distributedFikers}
            refreshAction={props.refreshAction}
          />
        </Tab>
        <Tab
          eventKey="välkomnade"
          title={`Välkomnade (${
            props.dbData.welcomedFikers.length
              ? props.dbData.welcomedFikers.length
              : 0
          })`}
        >
          <Table
            isAdmin
            isFikers
            groupId={props.groupId}
            tableData={props.dbData.welcomedFikers}
            refreshAction={props.refreshAction}
          />
        </Tab>
        <Tab
          eventKey="aktiva"
          title={`Aktiva(${
            props.dbData.activeFikers.length
              ? props.dbData.activeFikers.length
              : 0
          })`}
        >
          <Table
            isAdmin
            isFikers
            groupId={props.groupId}
            tableData={props.dbData.activeFikers}
            refreshAction={props.refreshAction}
          />
        </Tab>
        <Tab
          eventKey="pausade"
          title={`Pausade (${
            props.dbData.pausedFikers.length
              ? props.dbData.pausedFikers.length
              : 0
          })`}
        >
          <Table
            isAdmin
            isFikers
            groupId={props.groupId}
            tableData={props.dbData.pausedFikers}
            refreshAction={props.refreshAction}
          />
        </Tab>
        <Tab
          eventKey="olämpliga"
          title={`Olämpliga (${
            props.dbData.notSuitableFikers.length
              ? props.dbData.notSuitableFikers.length
              : 0
          })`}
        >
          <Table
            isAdmin
            isFikers
            groupId={props.groupId}
            tableData={props.dbData.notSuitableFikers}
            refreshAction={props.refreshAction}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Fikers;
