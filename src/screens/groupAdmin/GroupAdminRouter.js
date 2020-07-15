import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import firebase from "firebase/app";
import GroupAdmin from "./GroupAdmin";
import AccessDenied from "../../components/AccessDenied";

import "firebase/firestore";

import moment from "moment";

import Group from "../../models/group";

const GroupAdminRouter = () => {
  // Checks the type of admin that is logged in and allows main admins to access any group admin page
  // and group admins to only access their own group's page.

  const { groupId } = useParams();
  const [isLoadingClaims, setisLoadingClaims] = useState(true);
  const [isLoadingGroups, setisLoadingGroups] = useState(true);
  const [isAdmin, setisAdmin] = useState(false);
  const [groupAdmin, setgroupAdmin] = useState("");

  const db = firebase.firestore();

  const [groupData, setGroupData] = useState({});

  //Get group data
  async function getGroups() {
    const groups = [];
    const querySnapshot = await db.collection("groups").get();
    querySnapshot.forEach(function (doc) {
      // doc.data() is never undefined for query doc snapshots
      const resData = doc.data();
      const readableDate = moment(new Date(resData.datum)).format(
        "YYYY-MM-DD HH:MM"
      );

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
    getGroups()
      .then(() => {
        setisLoadingGroups(false);
      })
      .catch((error) => {
        console.log(error);
        setisLoadingGroups(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    firebase
      .auth()
      .currentUser.getIdTokenResult()
      .then((idTokenResult) => {
        // Check if user is a main admin
        if (!!idTokenResult.claims.admin) {
          setisAdmin(true);
        }

        // Check if user is a group admin
        if (idTokenResult.claims.groupAdmin) {
          setgroupAdmin(idTokenResult.claims.groupAdmin);
        }
        setisLoadingClaims(false);
      })
      .catch((error) => {
        console.log(error);
        setisLoadingClaims(false);
      });
  }, []);

  return isLoadingClaims || isLoadingGroups ? (
    <LoadingMessage />
  ) : isAdmin ? (
    <GroupAdmin groupData={groupData} groupId={groupId} />
  ) : groupAdmin && groupAdmin === groupId ? (
    <GroupAdmin groupData={groupData} groupId={groupAdmin} />
  ) : (
    <AccessDenied />
  );
};

const LoadingMessage = () => {
  return (
    <div className="page-layout centered">
      <h3>Var snäll och vänta</h3>
      <p>Din gruppsida laddas</p>
    </div>
  );
};

export default GroupAdminRouter;
