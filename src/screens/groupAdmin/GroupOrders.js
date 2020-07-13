import React from "react";

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Badge from "react-bootstrap/Badge";

import OrdersTable from "../tables/OrdersTable";
import HelpForm from "../users/HelpForm";
import AddButtonHeader from "../../components/AddButtonHeader";
import RefreshButton from "../../components/RefreshButton";

const GroupOrders = (props) => {
  console.log("GROUPDATA FROM UP ORDERS: ", props.groupData);

  return (
    <div className="page-layout">
      <AddButtonHeader
        headerText="Beställningar"
        buttonText="beställning"
        formForModal={<HelpForm />}
      />
      <br />
      <h4>Hantera beställningar</h4>
      <ol>
        <li>
          När ni får in en beställning, kolla först så 'Bekräftelse till
          beställare' är 'Kontaktad'. Om inte, ring numret som står där och
          klicka sen 'Kontaktad'.
        </li>
        <li>
          Bestäm vem ska ta hand om beställningen och vidarebefodra dess
          detaljer via knappen 'Skicka detaljer' under 'Detaljer till volontär'.
        </li>
        <li>
          Skriv vilken volontär som tagit hand om beställningen under
          'Kommentarer'
        </li>
        <li>
          Slutligen, när beställningen är utförd - ändra fältet under 'Status'
          till 'Klar'
        </li>
        <li>Klart! Ändringarna här syns nu också för samordnaren.</li>
      </ol>
      <br />

      <h5>TIPS</h5>
      <ul>
        <li>
          Öppna redigering genom att klicka på pennan till vänster om
          beställningen
        </li>
        <li>
          Klicka på bocken till vänster om beställningen för att spara - om inte
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

      <Tabs id="0">
        <Tab
          eventKey="nya"
          title={
            <span>
              Att bli utförda{" "}
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
          <OrdersTable
            groupData={props.groupData}
            groupId={props.groupId}
            tableData={props.dbData.distributedGroupOrders}
            refreshAction={props.refreshAction}
          />
        </Tab>
        <Tab
          eventKey="klara"
          title={`Klara (${
            props.dbData.doneOrders.length ? props.dbData.doneOrders.length : 0
          })`}
        >
          <OrdersTable
            groupData={props.groupData}
            groupId={props.groupId}
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
          <OrdersTable
            groupData={props.groupData}
            groupId={props.groupId}
            tableData={props.dbData.pausedOrders}
            refreshAction={props.refreshAction}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default GroupOrders;
