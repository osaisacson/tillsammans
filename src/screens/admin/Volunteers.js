import React from "react";

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Badge from "react-bootstrap/Badge";

import VolunteersTable from "../tables/VolunteersTable";
import AddButtonHeader from "./../../components/AddButtonHeader";
import RefreshButton from "./../../components/RefreshButton";
import VolunteerForm from "./../users/VolunteerForm";
import Accordion from "./../../components/Accordion";

const Volunteers = ({ dbData, refreshAction, groupData, groupId }) => {
  return (
    <div className="page-layout">
      <AddButtonHeader
        headerText="Volontärer"
        buttonText="volontär"
        formForModal={<VolunteerForm />}
      />
      <Accordion
        title="Hur vi hanterar volontärer"
        content="
        <h5>Uppdatera i vårt system</h5>
        <ul>
        <li>Generellt: samordnaren ansvarar för att de första två (och om volontären har en email, tre) knapparna under 'status' blir gröna.</li>
        </ul>
        <br/>
        <h5>Steg för hantering</h5>
        <ol>
        <li>Under 'Status' klicka 'Välj grupp'</li>
        <li>När detta är klart klicka 'Skicka till grupp'</li>
        <li>Om volontären har registrerat en email så är det samordnarens jobb att skicka välkomstemailet till volontären via knappen 'Skicka bekräftelse'. Annars om det står ett telefonnummer så låt det vara. Då är det upp till gruppledaren att kontakta volontären.</li>
        <li>Klart!</li>
      </ol>
      <br/>
      <p>Håll ett öga på volontären i systemet så gruppledaren så småningom markerar den som 'Aktiv', annars följ upp.</p>
      </br>"
      />

      <RefreshButton refreshAction={refreshAction} />

      <Tabs id="0">
        {dbData.newVolunteers.length ? (
          <Tab
            eventKey="nya"
            title={
              <span>
                Nya {""}
                <Badge pill variant="danger">
                  {dbData.newVolunteers.length}
                </Badge>
              </span>
            }
          >
            <VolunteersTable
              isAdmin
              groupData={groupData}
              groupId={groupId}
              tableData={dbData.newVolunteers}
              refreshAction={refreshAction}
            />
          </Tab>
        ) : null}
        <Tab
          eventKey="fördelade"
          title={`Fördelade till grupper (${
            dbData.distributedVolunteers.length
              ? dbData.distributedVolunteers.length
              : 0
          })`}
        >
          <VolunteersTable
            isAdmin
            groupData={groupData}
            groupId={groupId}
            tableData={dbData.distributedVolunteers}
            refreshAction={refreshAction}
          />
        </Tab>
        <Tab
          eventKey="Att tränas"
          title={`Att tränas (${
            dbData.toBeTrainedVolunteers.length
              ? dbData.toBeTrainedVolunteers.length
              : 0
          })`}
        >
          <VolunteersTable
            isAdmin
            groupData={groupData}
            groupId={groupId}
            tableData={dbData.toBeTrainedVolunteers}
            refreshAction={refreshAction}
          />
        </Tab>
        <Tab
          eventKey="aktiva"
          title={`Aktiva(${
            dbData.activeVolunteers.length ? dbData.activeVolunteers.length : 0
          })`}
        >
          <VolunteersTable
            groupId={groupId}
            isAdmin
            groupData={groupData}
            tableData={dbData.activeVolunteers}
            refreshAction={refreshAction}
          />
        </Tab>
        <Tab
          eventKey="pausade"
          title={`Pausade (${
            dbData.pausedVolunteers.length ? dbData.pausedVolunteers.length : 0
          })`}
        >
          <VolunteersTable
            isAdmin
            groupData={groupData}
            groupId={groupId}
            tableData={dbData.pausedVolunteers}
            refreshAction={refreshAction}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Volunteers;
