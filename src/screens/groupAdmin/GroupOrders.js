import React from "react";

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Badge from "react-bootstrap/Badge";

import OrdersTable from "../tables/OrdersTable";
import HelpForm from "../users/HelpForm";
import AddButtonHeader from "../../components/AddButtonHeader";
import RefreshButton from "../../components/RefreshButton";

const GroupOrders = (props) => {
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
          Generellt sätt:{" "}
          <strong>allt nedan under 'status' ska vara grönt :)</strong>
        </li>
      </ol>
      <br />

      <h5>TIPS</h5>
      <ul>
        <li>
          Ser du inte dina ändringar? Klicka den lila refresh-knappen nere till
          höger
        </li>
        <li>
          Använd 'Kommentarer' för att skriva in det ni vill förmedla antingen
          internt eller till samordnaren.
        </li>
      </ul>
      <br />

      <p>
        För frågor, kontakta asaisacson@gmail.com (+34 623 049 041). Vi
        uppdaterar hela tiden systemet och tar gärna emot tips om hur det kan
        bli bättre!
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
              Pågående{" "}
              {props.dbData.distributedGroupOrders.length ? (
                <Badge pill variant="warning">
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
      </Tabs>
    </div>
  );
};

export default GroupOrders;
