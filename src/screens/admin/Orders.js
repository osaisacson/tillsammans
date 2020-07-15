import React from "react";

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Badge from "react-bootstrap/Badge";

import OrdersTable from "../tables/OrdersTable";
import HelpForm from "./../users/HelpForm";

import AddButtonHeader from "./../../components/AddButtonHeader";
import RefreshButton from "./../../components/RefreshButton";
import Accordion from "./../../components/Accordion";

const Orders = ({ groupData, dbData, refreshAction }) => {
  return (
    <div className="page-layout">
      <AddButtonHeader
        headerText="Beställningar"
        buttonText="beställning"
        formForModal={<HelpForm />}
      />

      <Accordion
        title="Hur vi hanterar beställningar"
        content="
        <h5>Uppdatera i vårt system</h5>
        <ul>
        <li>Generellt: samordnaren ansvarar för att de första två (och om beställaren har en email, tre) knapparna under 'status' blir gröna.</li>
        </ul>
        <br/>
        <h5>Steg för hantering</h5>
        <ol>
        <li>Under 'Status' klicka 'Välj grupp'</li>
        <li>När detta är klart klicka 'Skicka till grupp'</li>
        <li>Om beställaren har registrerat en email så är det samordnarens jobb att skicka bekräftelsemailet till beställaren via knappen 'Skicka bekräftelse'. Annars om det står ett telefonnummer så låt det vara. Då är det upp till gruppledaren att kontakta beställaren.</li>
        <li>Klart!</li>
      </ol>
      <br/>
      <p>Håll ett öga på beställningen i systemet så gruppledaren så småningom markerar den som 'Klar', annars följ upp.</p>
      </br>"
      />

      <RefreshButton refreshAction={refreshAction} />
      {dbData.allOrders.length ? (
        <Tabs id="0">
          {dbData.newOrders.length ? (
            <Tab
              eventKey="nya"
              title={
                <span>
                  Ej fördelade Beställningar{" "}
                  <Badge pill variant="danger">
                    {dbData.newOrders.length}
                  </Badge>
                </span>
              }
            >
              <OrdersTable
                isAdmin
                groupData={groupData}
                tableData={dbData.newOrders}
                refreshAction={refreshAction}
              />
            </Tab>
          ) : null}
          <Tab
            eventKey="gruppfördelade"
            title={`Fördelade till grupp (${
              dbData.assignedToGroup.length ? dbData.assignedToGroup.length : 0
            })`}
          >
            <OrdersTable
              isAdmin
              groupData={groupData}
              tableData={dbData.assignedToGroup}
              refreshAction={refreshAction}
            />
          </Tab>
          <Tab
            eventKey="klara"
            title={`Klara (${
              dbData.doneOrders.length ? dbData.doneOrders.length : 0
            })`}
          >
            <OrdersTable
              isAdmin
              groupData={groupData}
              tableData={dbData.doneOrders}
              refreshAction={refreshAction}
            />
          </Tab>
        </Tabs>
      ) : (
        <h2>Laddar...</h2>
      )}
    </div>
  );
};

export default Orders;
