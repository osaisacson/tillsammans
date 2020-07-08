import React from "react";

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Badge from "react-bootstrap/Badge";

import Table from "../tables/Table";
import HelpForm from "./../users/HelpForm";

import ContactForm from "./../../components/ContactForm";
import AddButtonHeader from "./../../components/AddButtonHeader";
import RefreshButton from "./../../components/RefreshButton";
import Accordion from "./../../components/Accordion";

const Orders = (props) => {
  return (
    <div className="page-layout">
      <AddButtonHeader
        headerText="Beställningar"
        buttonText="beställning"
        formForModal={<HelpForm />}
      />
      <AddButtonHeader
        headerText="Email"
        buttonText="email"
        formForModal={
          <ContactForm
            email={"asaisacson@gmail.com"}
            message="det funkar"
            name="Åsa"
          />
        }
      />
      <Accordion
        title="Hur vi hanterar beställningar"
        content="
        <h5>Uppdatera i vårt system</h5>
        <ol>
        <li>Öppna redigering genom att klicka på pennan till vänster om beställningen</li>
        <li>Välj grupp under 'Grupp'</li>
        <li>Ändra status till 'Fördelad till grupp' under 'Status'.</li>
        <li>Klicka på spara symbolen för att spara ändringar - om inte ändringarna syns direkt klicka refresh-knappen till höger</li>
        </ol>
        <br/>
        <h5>Kommunicera med beställare</h5>
        <ol>
        <li>Under 'Bekräftelse till beställare' klicka 'Skicka bekräftelse' - detta öppnar din email med mailet och addressen redan klart.</li>
        <li>Om det istället för ovan knapp står ett telefonnummer så låt det vara. Då är det upp till gruppledaren att kontakta beställaren.</li>
        <li>När skickat - klicka knappen 'Kontaktad'</li>
      </ol>
      <br/>

        <h5>Kommunicera beställning till grupp</h5>
        <ol>
        <li>Under 'Detaljer till grupp' klicka 'Skicka detaljer' - detta öppnar din email med mailet redan klart.</li>
        <li>Kolla detaljerna så allt ser bra ut och lägg till emailen för gruppledaren det ska skickas till</li>
        <li>När skickat - klicka knappen 'Skickad'</li>
      </ol>
      <br/>
      <p>Håll ett öga på beställningen i systemet så gruppledaren så småningom markerar den som 'Klar', annars följ upp.</p>
      </br>"
      />

      <RefreshButton refreshAction={props.refreshAction} />

      <Tabs defaultActiveKey="nya" id="0">
        <Tab
          eventKey="nya"
          title={
            <span>
              Ej fördelade Beställningar{" "}
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
