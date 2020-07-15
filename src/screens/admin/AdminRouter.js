import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import Admin from "./Admin";
import GroupAdmin from "../groupAdmin/GroupAdmin";
import AccessDenied from "../../components/AccessDenied";

import "firebase/firestore";

import moment from "moment";

import Group from "../../models/group";

const AdminRouter = () => {
  // Checks the type of admin (main vs group) and renders appropriate admin page

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

        // Check if user is a group admin and if so, retrieves the group ID
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
    <Admin groupData={groupData} />
  ) : groupAdmin ? (
    <GroupAdmin groupId={groupAdmin} groupData={groupData} />
  ) : (
    <AccessDenied />
  );
};

const LoadingMessage = () => {
  return (
    <div className="page-layout centered">
      <h3>Var snäll och vänta</h3>
      <p>Adminpanelen laddas</p>
    </div>
  );
};

export default AdminRouter;
