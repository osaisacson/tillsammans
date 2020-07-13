import React from "react";

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Badge from "react-bootstrap/Badge";

import Table from "../tables/Table";
import AddButtonHeader from "../../components/AddButtonHeader";
import RefreshButton from "../../components/RefreshButton";
import VolunteerForm from "../users/VolunteerForm";

const GroupVolunteers = (props) => {
  return (
    <div className="page-layout">
      <AddButtonHeader
        headerText="Volontärer"
        buttonText="volontär"
        formForModal={<VolunteerForm />}
      />
      <br />
      <h4>Hantera volontärer</h4>
      <ol>
        <li>
          När ni får in en volontär, kolla först så 'Bekräftelse till volontär'
          är 'Kontaktad'. Om inte, ring numret som står där och klicka sen
          'Kontaktad'.
        </li>
        <li>
          Ändra status till 'Välkomnad' när volontären står som 'Kontaktad'.
        </li>
        <li>
          Bestäm vem ska ta hand om att träna volontären och - om det behövs -
          vidarebefodra dess detaljer via knappen 'Kopiera detaljer'.
        </li>
        <li>När volontären blivit tränad, ändra status till 'Aktiv'.</li>
        <li>Klart! Ändringarna här syns nu också för samordnaren.</li>
      </ol>
      <br />

      <h5>TIPS</h5>
      <ul>
        <li>
          Öppna redigering genom att klicka på pennan till vänster om volontären
        </li>
        <li>
          Klicka på bocken till vänster om volontären för att spara - om inte
          ändringarna syns direkt, klicka den lila refresh-knappen nere till
          höger
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
      <h5>Mer information här</h5>
      <a href="https://docs.google.com/document/d/1lLxe5x-4yJ1qPHfGkBkfle2EIp7tVjUU4aMhYuRQQ5Y/edit?usp=sharing">
        Gemensamma procedurer för beställningar och volontärer
      </a>
      <RefreshButton refreshAction={props.refreshAction} />

      <Tabs defaultActiveKey="nya" id="0">
        <Tab
          eventKey="nya"
          title={
            <span>
              Nya Volontärer - att bli välkomnade{" "}
              {props.dbData.newVolunteers.length ? (
                <Badge pill variant="danger">
                  {props.dbData.newVolunteers.length}
                </Badge>
              ) : (
                0
              )}
            </span>
          }
        >
          <Table
            isVolunteers
            groupId={props.groupId}
            tableData={props.dbData.newVolunteers}
            refreshAction={props.refreshAction}
          />
        </Tab>
        <Tab
          eventKey="välkomnade"
          title={`Välkomnade - att tränas (${
            props.dbData.welcomedVolunteers.length
              ? props.dbData.welcomedVolunteers.length
              : 0
          })`}
        >
          <Table
            isVolunteers
            groupId={props.groupId}
            tableData={props.dbData.welcomedVolunteers}
            refreshAction={props.refreshAction}
          />
        </Tab>
        <Tab
          eventKey="aktiva"
          title={`Aktiva(${
            props.dbData.activeVolunteers.length
              ? props.dbData.activeVolunteers.length
              : 0
          })`}
        >
          <Table
            isVolunteers
            groupId={props.groupId}
            tableData={props.dbData.activeVolunteers}
            refreshAction={props.refreshAction}
          />
        </Tab>
        <Tab
          eventKey="pausade"
          title={`Pausade (${
            props.dbData.pausedVolunteers.length
              ? props.dbData.pausedVolunteers.length
              : 0
          })`}
        >
          <Table
            isVolunteers
            groupId={props.groupId}
            tableData={props.dbData.pausedVolunteers}
            refreshAction={props.refreshAction}
          />
        </Tab>
        <Tab
          eventKey="olämpliga"
          title={`Olämpliga (${
            props.dbData.notSuitableVolunteers.length
              ? props.dbData.notSuitableVolunteers.length
              : 0
          })`}
        >
          <Table
            isVolunteers
            groupId={props.groupId}
            tableData={props.dbData.notSuitableVolunteers}
            refreshAction={props.refreshAction}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default GroupVolunteers;
