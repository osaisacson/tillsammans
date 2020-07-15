import React from "react";

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Badge from "react-bootstrap/Badge";

import FikersTable from "../tables/FikersTable";
import AddButtonHeader from "../../components/AddButtonHeader";
import RefreshButton from "../../components/RefreshButton";
import FikaForm from "../users/FikaForm";
import Accordion from "../../components/Accordion";

const Fikers = (props) => {
  return (
    <div className="page-layout">
      <AddButtonHeader
        headerText="Fikaintressenter"
        buttonText="fikaintressent"
        formForModal={<FikaForm />}
      />
      <Accordion
        title="Hur vi hanterar fikaintressenter"
        content="
        <h5>Uppdatera i vårt system</h5>
        <ul>
        <li>Generellt: samordnaren ansvarar för att de första två (och om fikaintressenten har en email, tre) knapparna under 'status' blir gröna.</li>
        </ul>
        <br/>
        <h5>Steg för hantering</h5>
        <ol>
        <li>Under 'Status' klicka 'Välj grupp'</li>
        <li>När detta är klart klicka 'Skicka till grupp'</li>
        <li>Om fikaintressenten har registrerat en email så är det samordnarens jobb att skicka välkomstemailet till fikaintressenten via knappen 'Skicka bekräftelse'. Annars om det står ett telefonnummer så låt det vara. Då är det upp till gruppledaren att kontakta fikaintressenten.</li>
        <li>Klart!</li>
      </ol>
      <br/>
      <p>Håll ett öga på fikaintressenten i systemet så gruppledaren så småningom markerar den som 'Aktiv', annars följ upp.</p>
      </br>"
      />

      <RefreshButton refreshAction={props.refreshAction} />

      <Tabs id="0">
        {props.dbData.newFikers.length ? (
          <Tab
            eventKey="nya"
            title={
              <span>
                Nya {""}
                <Badge pill variant="danger">
                  {props.dbData.newFikers.length}
                </Badge>
              </span>
            }
          >
            <FikersTable
              isAdmin
              groupData={props.groupData}
              groupId={props.groupId}
              tableData={props.dbData.newFikers}
              refreshAction={props.refreshAction}
            />
          </Tab>
        ) : null}
        <Tab
          eventKey="fördelade"
          title={`Fördelade till grupper (${
            props.dbData.distributedFikers.length
              ? props.dbData.distributedFikers.length
              : 0
          })`}
        >
          <FikersTable
            isAdmin
            groupData={props.groupData}
            groupId={props.groupId}
            tableData={props.dbData.distributedFikers}
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
          <FikersTable
            isAdmin
            groupData={props.groupData}
            groupId={props.groupId}
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
          <FikersTable
            isAdmin
            groupData={props.groupData}
            groupId={props.groupId}
            tableData={props.dbData.pausedFikers}
            refreshAction={props.refreshAction}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Fikers;
