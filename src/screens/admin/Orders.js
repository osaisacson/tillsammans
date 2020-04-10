import React, { useEffect, useState } from 'react';
import moment from 'moment';

//Models
//Bootstrap
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Badge from 'react-bootstrap/Badge';

//Components
import Table from '../tables/Table';
import HelpForm from './../users/HelpForm';
import AddButtonHeader from './../../components/AddButtonHeader';
import RefreshButton from './../../components/RefreshButton';
import Accordion from './../../components/Accordion';

const Orders = props => {
  return (
    <div className="page-layout">
      <AddButtonHeader
        headerText="Beställningar"
        buttonText="beställning"
        formForModal={<HelpForm />}
      />
      <Accordion
        title="Hur vi hanterar beställningar"
        content="<ol>
        <li>Öppna redigering genom att klicka på pennan till vänster om beställningen</li>
        <li>Välj grupp</li>
        <li>Ändra status till 'Fördelad till grupp'.</li>
      
        <li>
          Klicka på spara symbolen för att spara ändringar
        </li>
      <li>Om inte ändringarna syns direkt, klicka refresh-knappen till höger</li>
      <li>VIKTIGT: Skicka ut ett email till den valda gruppens kontaktperson om att de fått in en ny beställning</li>
      </ol>
      
     
</br>
      -----------------------------------------------------------------------
      </br>
<p>Hej!</p>

            <p>Ni har fått in en ny beställning till er volontärgrupp från Alla Tillsammans.</p>

            <p>Nästa steg:</p>
            
            <p>1. Gå in på er sida (kontakta asaisacson@gmail.com om ni behöver addressen/login)</p>
            
            <p>2. Hitta alla detaljer om beställningen där, och tryck på en knapp för att vidarebefordra dom till lämplig volontär</p>
           
            <p>3. Kontakta beställaren och låt dom veta beställningen är mottagen och på gång.</p>

            <p>4. Uppdatera beställningen via er gruppsida. </p>

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
              Ej fördelade Beställningar{' '}
              {props.dbData.newOrders.length ? (
                <Badge pill variant="danger">
                  {props.dbData.newOrders.length}
                </Badge>
              ) : (
                0
              )}
            </span>
          }
        >
          <Table
            isOrders={true}
            tableData={props.dbData.newOrders}
            refreshAction={props.refreshAction}
          />
        </Tab>
        <Tab
          eventKey="gruppfördelade"
          title={`Fördelade till grupp (${
            props.dbData.assignedToGroup.length
              ? props.dbData.assignedToGroup.length
              : 0
          })`}
        >
          <Table
            isOrders={true}
            tableData={props.dbData.assignedToGroup}
            refreshAction={props.refreshAction}
          />
        </Tab>
        <Tab
          eventKey="klara"
          title={`Klara (${
            props.dbData.doneOrders.length ? props.dbData.doneOrders.length : 0
          })`}
        >
          <Table
            isOrders={true}
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
            isOrders={true}
            tableData={props.dbData.pausedOrders}
            refreshAction={props.refreshAction}
          />
        </Tab>
        <Tab
          eventKey="avbokad"
          title={`Avbokade (${
            props.dbData.cancelledOrders.length
              ? props.dbData.cancelledOrders.length
              : 0
          })`}
        >
          <Table
            isOrders={true}
            tableData={props.dbData.cancelledOrders}
            refreshAction={props.refreshAction}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Orders;
