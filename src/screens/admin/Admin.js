import React, { useEffect, useState } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Badge from "react-bootstrap/Badge";
import moment from "moment";

import Fiker from "./../../models/fiker";
import Order from "./../../models/order";
import Volunteer from "./../../models/volunteer";

import Fikers from "./Fikers";
import Volunteers from "./Volunteers";
import Orders from "./Orders";
import Groups from "./Groups";

import firebase from "firebase/app";
import "firebase/firestore";

const Admin = (props) => {
  const firestore = firebase.firestore();

  const [fikersData, setFikersData] = useState({
    allFikers: [],
    newFikers: [],
    distributedFikers: [],
    welcomedFikers: [],
    activeFikers: [],
    pausedFikers: [],
  });

  const [volunteersData, setVolunteersData] = useState({
    allVolunteers: [],
    newVolunteers: [],
    distributedVolunteers: [],
    welcomedVolunteers: [],
    activeVolunteers: [],
    pausedVolunteers: [],
  });

  const [ordersData, setOrdersData] = useState({
    allOrders: [],
    newOrders: [],
    assignedToGroup: [],
    doneOrders: [],
    pausedOrders: [],
  });

  //Get orders data
  async function getOrders() {
    const orders = [];
    const querySnapshot = await firestore.collection("orders").get();
    querySnapshot.forEach(function (doc) {
      // doc.data() is never undefined for query doc snapshots
      const resData = doc.data();
      const readableDate = moment(new Date(resData.datum)).format("lll");

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
      pausedOrders: orders.filter((data) => data.status === "5"),
    });
  }

  //Get volunteers data
  async function getVolunteers() {
    const volunteers = [];
    const querySnapshot = await firestore.collection("volunteers").get();
    querySnapshot.forEach(function (doc) {
      // doc.data() is never undefined for query doc snapshots
      const resData = doc.data();
      const readableDate = moment(new Date(resData.datum)).format("lll");

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
      welcomedVolunteers: volunteers.filter((data) => data.status === "3"),
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
      const readableDate = moment(new Date(resData.datum)).format("lll");

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
      welcomedFikers: fikers.filter((data) => data.status === "3"),
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
              {ordersData.allOrders.length ? (
                <>
                  <Badge pill variant="light" className="margin-right-5">
                    {ordersData.allOrders.length} TOTALT
                  </Badge>
                  <Badge
                    className="margin-right-5"
                    pill
                    variant={ordersData.newOrders.length ? "danger" : "success"}
                  >
                    {ordersData.newOrders.length
                      ? `${ordersData.newOrders.length} ${
                          ordersData.newOrders.length > 1 ? "NYA" : "NY"
                        }`
                      : "0 NYA"}
                  </Badge>
                  {ordersData.assignedToGroup.length ? (
                    <Badge pill variant={"warning"}>
                      {ordersData.assignedToGroup.length} PÅGÅENDE
                    </Badge>
                  ) : null}
                </>
              ) : (
                <Badge pill variant={"light"}>
                  ...Laddar
                </Badge>
              )}
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
              {volunteersData.allVolunteers.length ? (
                <>
                  <Badge pill variant="light" className="margin-right-5">
                    {volunteersData.allVolunteers.length} TOTALT
                  </Badge>
                  <Badge
                    pill
                    variant={
                      volunteersData.newVolunteers.length ? "danger" : "success"
                    }
                  >
                    {volunteersData.newVolunteers.length
                      ? `${volunteersData.newVolunteers.length} ${
                          volunteersData.newVolunteers.length > 1 ? "NYA" : "NY"
                        }`
                      : "0 NYA"}
                  </Badge>
                </>
              ) : (
                <Badge pill variant={"light"}>
                  ...Laddar
                </Badge>
              )}
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
              {fikersData.allFikers.length ? (
                <>
                  <Badge pill variant="light" className="margin-right-5">
                    {fikersData.allFikers.length} TOTALT
                  </Badge>
                  <Badge
                    pill
                    variant={fikersData.newFikers.length ? "danger" : "success"}
                  >
                    {fikersData.newFikers.length
                      ? `${fikersData.newFikers.length} ${
                          fikersData.newFikers.length > 1 ? "NYA" : "NY"
                        }`
                      : "0 NYA"}
                  </Badge>
                </>
              ) : (
                <Badge pill variant={"light"}>
                  ...Laddar
                </Badge>
              )}
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
        <Tab className="fat-tab" title="Grupper" eventKey="fourth">
          <Groups groupData={props.groupData} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Admin;
