import React, { useEffect, useState } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import moment from "moment";

import Fiker from "./../../models/fiker";
import Order from "./../../models/order";
import Volunteer from "./../../models/volunteer";

import Fikers from "./Fikers";
import Volunteers from "./Volunteers";
import Orders from "./Orders";
import Groups from "./Groups";

import LoadingBadge from "./../../components/LoadingBadge";

import firebase from "firebase/app";
import "firebase/firestore";

const Admin = (props) => {
  const firestore = firebase.firestore();

  const [fikersData, setFikersData] = useState({
    allFikers: [],
    newFikers: [],
    distributedFikers: [],
    activeFikers: [],
    pausedFikers: [],
  });

  const [volunteersData, setVolunteersData] = useState({
    allVolunteers: [],
    newVolunteers: [],
    distributedVolunteers: [],
    toBeTrainedVolunteers: [],
    activeVolunteers: [],
    pausedVolunteers: [],
  });

  const [ordersData, setOrdersData] = useState({
    allOrders: [],
    newOrders: [],
    assignedToGroup: [],
    doneOrders: [],
  });

  //Get orders data
  async function getOrders() {
    const orders = [];
    const querySnapshot = await firestore.collection("orders").get();
    querySnapshot.forEach(function (doc) {
      // doc.data() is never undefined for query doc snapshots
      const resData = doc.data();
      const readableDate = moment(new Date(resData.datum)).format(
        "YYYY-MM-DD HH:MM"
      );

      orders.push(
        new Order(
          doc.id,
          resData.gruppId,
          resData.volontärId,
          readableDate,
          resData.typ,
          resData.beskrivning,
          resData.swish,
          resData.kontant,
          resData.faktura,
          resData.tidsrymd,
          resData.telefon,
          resData.förnamn,
          resData.efternamn,
          resData.email,
          resData.address,
          resData.postkod,
          resData.status,
          resData.kommentarer,
          resData.skickadBeställare,
          resData.skickadGrupp,
          resData.skickadVolontär
        )
      );
    });

    setOrdersData({
      allOrders: orders,
      newOrders: orders.filter((data) => data.status === "1"),
      assignedToGroup: orders.filter((data) => data.status === "2"),
      doneOrders: orders.filter((data) => data.status === "4"),
    });
  }

  //Get volunteers data
  async function getVolunteers() {
    const volunteers = [];
    const querySnapshot = await firestore.collection("volunteers").get();
    querySnapshot.forEach(function (doc) {
      // doc.data() is never undefined for query doc snapshots
      const resData = doc.data();
      const readableDate = moment(new Date(resData.datum)).format(
        "YYYY-MM-DD HH:MM"
      );

      volunteers.push(
        new Volunteer(
          doc.id,
          resData.gruppId,
          resData.förnamn,
          resData.efternamn,
          resData.telefon,
          resData.email,
          resData.address,
          resData.postkod,
          resData.beskrivning,
          resData.språk,
          resData.födelseår,
          resData.körkort,
          resData.bil,
          resData.mat,
          resData.varor,
          resData.ärenden,
          resData.djur,
          resData.prata,
          resData.myndigheter,
          resData.teknik,
          readableDate,
          resData.status,
          resData.kommentarer,
          resData.skickadVolontärTillGrupp,
          resData.skickadBekräftelseTillVolontär
        )
      );
    });

    setVolunteersData({
      allVolunteers: volunteers,
      newVolunteers: volunteers.filter((data) => data.status === "1"),
      distributedVolunteers: volunteers.filter((data) => data.status === "2"),
      toBeTrainedVolunteers: volunteers.filter((data) => data.status === "3"),
      activeVolunteers: volunteers.filter((data) => data.status === "4"),
      pausedVolunteers: volunteers.filter((data) => data.status === "5"),
    });
  }

  //Get fika data
  async function getFikers() {
    const fikers = [];
    const querySnapshot = await firestore.collection("fika").get();
    querySnapshot.forEach(function (doc) {
      // doc.data() is never undefined for query doc snapshots
      const resData = doc.data();
      const readableDate = moment(new Date(resData.datum)).format(
        "YYYY-MM-DD HH:MM"
      );

      fikers.push(
        new Fiker(
          doc.id,
          resData.gruppId,
          resData.förnamn,
          resData.efternamn,
          resData.telefon,
          resData.email,
          resData.beskrivning,
          resData.oldSchool,
          resData.newSchool,
          resData.interests,
          resData.språk,
          resData.books,
          resData.gardening,
          resData.globalPolitics,
          resData.localCulture,
          resData.newTech,
          resData.lectures,
          resData.lecture,
          readableDate,
          resData.status,
          resData.kommentarer,
          resData.skickadFikapersonTillGrupp,
          resData.skickadBekräftelseTillFikaperson
        )
      );
    });

    setFikersData({
      allFikers: fikers,
      newFikers: fikers.filter((data) => data.status === "1"),
      distributedFikers: fikers.filter((data) => data.status === "2"),
      activeFikers: fikers.filter((data) => data.status === "4"),
      pausedFikers: fikers.filter((data) => data.status === "5"),
    });
  }

  useEffect(() => {
    getOrders();
    getVolunteers();
    getFikers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="page-layout">
      <Tabs variant="pills" defaultActiveKey="first" id="0">
        <Tab
          title={
            <div className="flex-spread">
              <div className="margin-right-5">Beställningar</div>
              <LoadingBadge
                allDataLength={ordersData.allOrders.length}
                newDataLength={ordersData.newOrders.length}
                inProgressDataLength={ordersData.assignedToGroup.length}
                inProgressCopy={"PÅGÅENDE"}
              />
            </div>
          }
          eventKey="first"
        >
          <Orders
            groupData={props.groupData}
            refreshAction={getOrders}
            dbData={ordersData}
          />
        </Tab>
        <Tab
          title={
            <div className="flex-spread">
              <div className="margin-right-5">Volontärer</div>
              <LoadingBadge
                allDataLength={volunteersData.allVolunteers.length}
                newDataLength={volunteersData.newVolunteers.length}
                inProgressDataLength={
                  volunteersData.toBeTrainedVolunteers.length
                }
                inProgressCopy={"ATT TRÄNAS"}
              />
            </div>
          }
          eventKey="second"
        >
          <Volunteers
            groupData={props.groupData}
            refreshAction={getVolunteers}
            dbData={volunteersData}
          />
        </Tab>
        <Tab
          title={
            <div className="flex-spread">
              <div className="margin-right-5">Fikaintressenter</div>
              <LoadingBadge
                allDataLength={fikersData.allFikers.length}
                newDataLength={fikersData.newFikers.length}
                readyDataLength={fikersData.activeFikers.length}
                readyDataCopy={"Aktiva"}
              />
            </div>
          }
          eventKey="third"
        >
          <Fikers
            groupData={props.groupData}
            refreshAction={getFikers}
            dbData={fikersData}
          />
        </Tab>
        <Tab
          title={
            <div className="flex-spread">
              <div className="margin-right-5">Grupper</div>
              <LoadingBadge allDataLength={props.groupData.length} />
            </div>
          }
          eventKey="fourth"
        >
          <Groups groupData={props.groupData} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Admin;
