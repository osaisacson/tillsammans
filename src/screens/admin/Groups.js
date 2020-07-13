import React, { useEffect, useState } from "react";
import Group from "./../../models/group";
import moment from "moment";

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Badge from "react-bootstrap/Badge";

import firebase from "firebase/app";
import "firebase/firestore";

import GroupsTable from "../tables/GroupsTable";
import AddButtonHeader from "./../../components/AddButtonHeader";
import RefreshButton from "./../../components/RefreshButton";
import GroupForm from "../users/GroupForm";
import Accordion from "./../../components/Accordion";
import GrantAdminAccess from "./../admin/GrantAdminAccess";

const Groups = (props) => {
  const firestore = firebase.firestore();
  const [data, setData] = useState({
    activeGroups: [],
    inactiveGroups: [],
  });

  async function getGroups() {
    const groups = [];
    const querySnapshot = await firestore.collection("groups").get();
    querySnapshot.forEach(function (doc) {
      // doc.data() is never undefined for query doc snapshots
      const resData = doc.data();
      const readableDate = moment(new Date(resData.datum)).format("lll");

      groups.push(
        new Group(
          doc.id,
          readableDate,
          resData.gruppnamn,
          resData.länkNamn,
          resData.kontakt,
          resData.kommentarer,
          resData.telefon,
          resData.email,
          resData.reserv,
          resData.reservTelefon,
          resData.reservEmail,
          resData.address,
          resData.postkod,
          resData.status
        )
      );
    });

    setData({
      activeGroups: groups.filter((data) => data.status === "aktiv"),
      inactiveGroups: groups.filter((data) => data.status === "inaktiv"),
    });
  }
  useEffect(() => {
    getGroups();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="page-layout">
      <AddButtonHeader
        headerText="Grupper"
        buttonText="grupp"
        formForModal={<GroupForm />}
      />
      <Accordion
        title="Hur vi hanterar grupper"
        content="        <p>
        Den här sidan är till för att få överblick över grupper knutna till
        plattformen
      </p>
      <ol>
        <li>Se anknytna volontärer och beställningar under varje grupp</li>
        <li>Om du behöver kontakta gruppen, se 'kontaktperson' nedan.</li>
      </ol>"
      />

      <RefreshButton refreshAction={getGroups} />

      <Tabs defaultActiveKey="aktiva" id="0">
        <Tab
          eventKey="aktiva"
          title={
            <span>
              Aktiva Grupper{" "}
              {data.activeGroups.length ? (
                <Badge pill variant="danger">
                  {data.activeGroups.length}
                </Badge>
              ) : (
                0
              )}
            </span>
          }
        >
          <AddButtonHeader
            buttonTextSimple="Sätt admin privilegier"
            formForModal={<GrantAdminAccess groups={data.activeGroups} />}
          />
          <GroupsTable
            groupData={props.groupData}
            tableData={data.activeGroups}
            refreshAction={getGroups}
          />
        </Tab>
        <Tab
          eventKey="inaktiva"
          title={`Inaktiva grupper (${
            data.inactiveGroups.length ? data.inactiveGroups.length : 0
          })`}
        >
          <GroupsTable
            groupData={props.groupData}
            tableData={data.inactiveGroups}
            refreshAction={getGroups}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Groups;
