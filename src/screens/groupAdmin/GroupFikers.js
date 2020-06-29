import React from "react";

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Badge from "react-bootstrap/Badge";

import Table from "../tables/Table";
import AddButtonHeader from "../../components/AddButtonHeader";
import RefreshButton from "../../components/RefreshButton";
import FikaForm from "../users/FikaForm";

const GroupFikers = (props) => {
  return (
    <div className="page-layout">
      <AddButtonHeader
        headerText="Fikaintressenter"
        buttonText="fikaintressent"
        formForModal={<FikaForm />}
      />
      <br />
      <h4>Hantera fikaintressenter</h4>
      <ol>
        <li>
          När ni får in en fikaintressent, kolla först så 'Bekräftelse till
          fikaintressent' är 'Kontaktad'. Om inte, ring numret som står där och
          klicka sen 'Kontaktad'.
        </li>
        <li>
          Ändra status till 'Välkomnad' när fikaintressenten står som
          'Kontaktad'.
        </li>
        <li>
          Bestäm vem ska ta hand om att introducera fikaintressenten och - om
          det behövs - vidarebefodra dess detaljer till denna person via knappen
          'Kopiera detaljer'.
        </li>
        <li>
          När fikaintressenten blivit introducerad i hur allt funkar, ändra
          status till 'Aktiv'.
        </li>
        <li>Klart! Ändringarna här syns nu också för samordnaren.</li>
      </ol>
      <br />

      <h5>TIPS</h5>
      <ul>
        <li>
          Öppna redigering genom att klicka på pennan till vänster om
          fikaintressenten
        </li>
        <li>
          Klicka på bocken till vänster om fikaintressenten för att spara - om
          ändringarna inte syns direkt, klicka den lila refresh-knappen nere
          till höger
        </li>
        <li>
          Använd gärna 'Kommentarer' för att skriva in något ni vill förmedla
          antingen internt eller till samordnaren.
        </li>
      </ul>
      <br />

      <p>
        För frågor, kontakta asaisacson@gmail.com. Vi uppdaterar hela tiden
        systemet och tar gärna emot tips om hur det kan bli bättre!
      </p>
      <br />

      <RefreshButton refreshAction={props.refreshAction} />

      <Tabs defaultActiveKey="nya" id="0">
        <Tab
          eventKey="nya"
          title={
            <span>
              Nya Fikaintressenter - att bli välkomnade{" "}
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
            groupId={props.groupId}
            isGroupFikers={true}
            tableData={props.dbData.newFikers}
            refreshAction={props.refreshAction}
          />
        </Tab>
        <Tab
          eventKey="välkomnade"
          title={`Välkomnade - att introduceras (${
            props.dbData.welcomedFikers.length
              ? props.dbData.welcomedFikers.length
              : 0
          })`}
        >
          <Table
            groupId={props.groupId}
            isGroupFikers={true}
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
            groupId={props.groupId}
            isGroupFikers={true}
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
            groupId={props.groupId}
            isGroupFikers={true}
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
            groupId={props.groupId}
            isGroupFikers={true}
            tableData={props.dbData.notSuitableFikers}
            refreshAction={props.refreshAction}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default GroupFikers;