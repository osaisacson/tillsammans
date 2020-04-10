import React from 'react';

//Bootstrap
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Badge from 'react-bootstrap/Badge';

//Components
import Table from '../tables/Table';
import HelpForm from '../users/HelpForm';
import AddButtonHeader from '../../components/AddButtonHeader';
import RefreshButton from '../../components/RefreshButton';

const GroupOrders = props => {
  return (
    <div className="page-layout">
      <AddButtonHeader
        headerText="Beställningar"
        buttonText="beställning"
        formForModal={<HelpForm />}
      />
      <br />
      <h4>Hur vi hanterar beställningar</h4>
      <ol>
        <li>
          Öppna redigering genom att klicka på pennan till vänster om
          beställningen
        </li>
        <li>
          Ändra status till det som passar. (Du kan också uppdatera annan
          information om du vill - till exempel 'kommentarer' - men 'status' är
          viktigast)
        </li>
        <li>
          Klicka på bock-ikonen till vänster om beställningen för att spara
          ändringar
        </li>
        <li>
          Om inte ändringarna syns direkt, klicka den lila refresh-knappen nere
          till höger
        </li>
        <li>Klart! Ändringarna här syns nu också för samordnaren.</li>
      </ol>
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
              Att bli utförda{' '}
              {props.dbData.distributedGroupOrders.length ? (
                <Badge pill variant="danger">
                  {props.dbData.distributedGroupOrders.length}
                </Badge>
              ) : (
                0
              )}
            </span>
          }
        >
          <Table
            groupId={props.groupId}
            isGroupOrders={true}
            tableData={props.dbData.distributedGroupOrders}
            refreshAction={props.refreshAction}
          />
        </Tab>
        {/* <Tab
          eventKey="aktiva"
          title={`Fördelade (${
            props.dbData.distributedVolunteerOrders.length
              ? props.dbData.distributedVolunteerOrders.length
              : 0
          })`}
        >
          <Table
            groupId={props.groupId}
            isGroupOrders={true}
            tableData={props.dbData.distributedVolunteerOrders}
            refreshAction={props.refreshAction}
          />
        </Tab> */}
        <Tab
          eventKey="klara"
          title={`Klara (${
            props.dbData.doneOrders.length ? props.dbData.doneOrders.length : 0
          })`}
        >
          <Table
            groupId={props.groupId}
            isGroupOrders={true}
            tableData={props.dbData.doneOrders}
            refreshAction={props.refreshAction}
          />
        </Tab>
        <Tab
          eventKey="pausad"
          title={`Pausade (${
            props.dbData.pausedOrders.length
              ? props.dbData.pausedOrders.length
              : 0
          })`}
        >
          <Table
            groupId={props.groupId}
            isGroupOrders={true}
            tableData={props.dbData.pausedOrders}
            refreshAction={props.refreshAction}
          />
        </Tab>
        <Tab
          eventKey="avbokade"
          title={`Avbokade (${
            props.dbData.cancelledOrders.length
              ? props.dbData.cancelledOrders.length
              : 0
          })`}
        >
          <Table
            groupId={props.groupId}
            isGroupOrders={true}
            tableData={props.dbData.cancelledOrders}
            refreshAction={props.refreshAction}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default GroupOrders;
