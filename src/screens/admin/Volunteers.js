import React from 'react';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Badge from 'react-bootstrap/Badge';

//Components
import Table from '../tables/Table';
import AddButtonHeader from './../../components/AddButtonHeader';
import RefreshButton from './../../components/RefreshButton';
import VolunteerForm from './../users/VolunteerForm';
import Accordion from './../../components/Accordion';

const Volunteers = props => {
  return (
    <div className="page-layout">
      <AddButtonHeader
        headerText="Volontärer"
        buttonText="volontär"
        formForModal={<VolunteerForm />}
      />
      <Accordion
        title="Hur vi hanterar Volontärer"
        content="<ol>
        <li>Öppna redigering genom att klicka på pennan till vänster om volontären</li>
        <li>Välj grupp</li>
        <li>Ändra status till 'Fördelad till grupp'.</li>
      
        <li>
          Klicka på spara symbolen för att spara ändringar
        </li>
      <li>Om inte ändringarna syns direkt, klicka refresh-knappen till höger</li>
      <li>VIKTIGT: Skicka ut ett email till den valda gruppens kontaktperson om att de fått in en ny volontär</li>
      </ol>
      
     
</br>
      -----------------------------------------------------------------------
      </br>
<p>Hej!</p>

            <p>Ni har fått in en ny volontär till er volontärgrupp från Alla Tillsammans.</p>

            <p>Nästa steg:</p>
            
            <p>1. Gå in på er sida (kontakta asaisacson@gmail.com om ni behöver addressen/login)</p>
            
            <p>2. Hitta alla detaljer om volontären där</p>
           
            <p>3. Kontakta volontären och låt dom veta att de snart kommer bli välkomnade.</p>

            <p>4. Uppdatera volontärens status via er gruppsida när de blivit välkomnade. </p>

            <br />

            <p>Låt mig veta om ni har några frågor!</p>
            <p>Vänliga hälsningar,</p>

      -----------------------------------------------------------------------
      </br>
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
