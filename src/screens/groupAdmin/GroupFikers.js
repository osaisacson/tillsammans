import React from "react";

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Badge from "react-bootstrap/Badge";

import FikersTable from "../tables/FikersTable";
import AddButtonHeader from "../../components/AddButtonHeader";
import RefreshButton from "../../components/RefreshButton";
import FikaForm from "../users/FikaForm";

const GroupFikers = (props) => {
  return (
    <div className="page-layout">
      <AddButtonHeader
        headerText="Fikaintressenter"
        buttonText="fikaintressent"
        formForModal={<FikaForm />}
      />
      <br />
      <h4>Hantera fikaintressenter</h4>
      <ol>
        <li>Generellt: allt under 'status' ska vara grönt :)</li>
      </ol>
      <br />

      <h5>TIPS</h5>
      <ul>
        <li>
          Om dina ändringar inte syns direkt, klicka den lila refresh-knappen
          nere till höger
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

      <RefreshButton refreshAction={props.refreshAction} />

      <Tabs defaultActiveKey="nya" id="0">
        <Tab
          eventKey="nya"
          title={
            <span>
              Nya Fikaintressenter - att bli välkomnade{" "}
              {props.dbData.newFikers.length ? (
                <Badge pill variant="danger">
                  {props.dbData.newFikers.length}
                </Badge>
              ) : (
                0
              )}
            </span>
          }
        >
          <FikersTable
            groupData={props.groupData}
            groupId={props.groupId}
            tableData={props.dbData.newFikers}
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

export default GroupFikers;
