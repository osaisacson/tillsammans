import React from 'react';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Badge from 'react-bootstrap/Badge';

import Table from '../tables/Table';
import AddButtonHeader from './../../components/AddButtonHeader';
import RefreshButton from './../../components/RefreshButton';
import VolunteerForm from './../users/VolunteerForm';
import Accordion from './../../components/Accordion';

const Volunteers = (props) => {
  return (
    <div className="page-layout">
      <AddButtonHeader
        headerText="Volontärer"
        buttonText="volontär"
        formForModal={<VolunteerForm />}
      />
      <Accordion
        title="Hur vi hanterar Volontärer"
        content="<h5>Uppdatera i vårt system</h5>
        <ol>
        <li>Öppna redigering genom att klicka på pennan till vänster om volontären</li>
        <li>Välj grupp under 'Grupp'</li>
        <li>Ändra status till 'Fördelad till grupp' under 'Status'.</li>
        <li>Klicka på spara symbolen för att spara ändringar - om inte ändringarna syns direkt klicka refresh-knappen till höger</li>
        </ol>
        <br/>
        <h5>Kommunicera med volontär</h5>
        <ol>
        <li>Under 'Bekräftelse till volontär' klicka 'Skicka bekräftelse' - detta öppnar din email med mailet och addressen redan klart.</li>
        <li>Om det istället för ovan knapp står ett telefonnummer så låt det vara. Då är det upp till gruppledaren att kontakta volontären.</li>
        <li>När skickat - klicka knappen 'Kontaktad'</li>
      </ol>
      <br/>

        <h5>Kommunicera ny volontär till grupp</h5>
        <ol>
        <li>Under 'Detaljer till grupp' klicka 'Skicka detaljer' - detta öppnar din email med mailet redan klart.</li>
        <li>Kolla detaljerna så allt ser bra ut och lägg till emailen för gruppledaren det ska skickas till</li>
        <li>När skickat - klicka knappen 'Skickad'</li>
      </ol>
      <br/>
      <p>Håll ett öga på volontären i systemet så gruppledaren så småningom markerar den som 'Aktiv', annars följ upp.</p>
      </br>"
      />

      <RefreshButton refreshAction={props.refreshAction} />

      <Tabs defaultActiveKey="nya" id="0">
        <Tab
          eventKey="nya"
          title={
            <span>
              Nya {''}
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
            groupId={props.groupId}
            isVolunteers={true}
            tableData={props.dbData.newVolunteers}
            refreshAction={props.refreshAction}
          />
        </Tab>
        <Tab
          eventKey="fördelade"
          title={`Fördelade till grupper (${
            props.dbData.distributedVolunteers.length
              ? props.dbData.distributedVolunteers.length
              : 0
          })`}
        >
          <Table
            groupId={props.groupId}
            isVolunteers={true}
            tableData={props.dbData.distributedVolunteers}
            refreshAction={props.refreshAction}
          />
        </Tab>
        <Tab
          eventKey="välkomnade"
          title={`Välkomnade (${
            props.dbData.welcomedVolunteers.length
              ? props.dbData.welcomedVolunteers.length
              : 0
          })`}
        >
          <Table
            groupId={props.groupId}
            isVolunteers={true}
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
            groupId={props.groupId}
            isVolunteers={true}
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
            groupId={props.groupId}
            isVolunteers={true}
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
            groupId={props.groupId}
            isVolunteers={true}
            tableData={props.dbData.notSuitableVolunteers}
            refreshAction={props.refreshAction}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Volunteers;
