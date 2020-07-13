import React, { useState, useEffect } from "react";

import firebase from "firebase/app";
import "firebase/firestore";

import moment from "moment";

import Group from "../../models/group";

import OrdersTable from "./OrdersTable";
import VolunteersTable from "./VolunteersTable";
import FikersTable from "./FikersTable";
import GroupsTable from "./GroupsTable";

//TODO: make below leaner, and split into more components
const Table = (props) => {
  const db = firebase.firestore();

  const [groupData, setGroupData] = useState({});

  //Get group data
  async function getGroups() {
    const groups = [];
    const querySnapshot = await db.collection("groups").get();
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

    setGroupData(groups);
  }

  useEffect(() => {
    getGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    isOrders,
    isVolunteers,
    isFikers,
    isGroups,
    isAdmin,
    tableData,
    groupId,
    refreshAction,
  } = props;

  return isOrders ? (
    <OrdersTable
      groupId={groupId}
      isAdmin={isAdmin}
      tableData={tableData}
      groupData={groupData}
      refreshAction={refreshAction}
    />
  ) : isVolunteers ? (
    <VolunteersTable
      groupId={groupId}
      isAdmin={isAdmin}
      tableData={tableData}
      groupData={groupData}
      refreshAction={refreshAction}
    />
  ) : isFikers ? (
    <FikersTable
      groupId={groupId}
      isAdmin={isAdmin}
      tableData={tableData}
      groupData={groupData}
      refreshAction={refreshAction}
    />
  ) : isGroups ? (
    <GroupsTable
      groupId={groupId}
      isAdmin={isAdmin}
      tableData={tableData}
      groupData={groupData}
      refreshAction={refreshAction}
    />
  ) : (
    <div>Ingen tabell att ladda</div>
  );
};

export default Table;
