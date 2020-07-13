import React, { useEffect, useState } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Badge from "react-bootstrap/Badge";
import moment from "moment";

import Order from "./../../models/order";
import Group from "./../../models/group";
import Volunteer from "./../../models/volunteer";
import Fiker from "./../../models/fiker";

import firebase from "firebase/app";
import "firebase/firestore";

import GroupOrders from "../groupAdmin/GroupOrders";
import GroupVolunteers from "../groupAdmin/GroupVolunteers";
import GroupFikers from "../groupAdmin/GroupFikers";

const GroupAdmin = (props) => {
  const firestore = firebase.firestore();

  console.log("GROUPDATA FROM UP UP ORDERS: ", props.groupData);

  //Set up hooks
  const [groupData, setGroupData] = useState({
    currentGroup: [],
  });

  const [groupOrdersData, setGroupOrdersData] = useState({
    allGroupOrders: [],
    distributedGroupOrders: [],
    distributedVolunteerOrders: [],
    doneOrders: [],
    pausedOrders: [],
  });

  const [groupVolunteersData, setGroupVolunteersData] = useState({
    allGroupVolunteers: [],
    newVolunteers: [],
    welcomedVolunteers: [],
    activeVolunteers: [],
    pausedVolunteers: [],
  });

  const [groupFikersData, setGroupFikersData] = useState({
    allGroupFikers: [],
    newFikers: [],
    welcomedFikers: [],
    activeFikers: [],
    pausedFikers: [],
  });

  //Get group orders
  async function getGroupOrders() {
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

    //Only get the orders which match our current group id
    const currentGroupOrders = orders.filter(
      (data) => data.gruppId === props.groupId
    );
    setGroupOrdersData({
      allGroupOrders: currentGroupOrders,
      distributedGroupOrders: currentGroupOrders.filter(
        (data) => data.status === "2"
      ),
      distributedVolunteerOrders: currentGroupOrders.filter(
        (data) => data.status === "3"
      ),
      doneOrders: currentGroupOrders.filter((data) => data.status === "4"),
      pausedOrders: currentGroupOrders.filter((data) => data.status === "5"),
    });
  }

  //Get fika data
  async function getGroupFikers() {
    const groupFikers = [];
    const querySnapshot = await firestore.collection("fika").get();
    querySnapshot.forEach(function (doc) {
      // doc.data() is never undefined for query doc snapshots
      const resData = doc.data();
      const readableDate = moment(new Date(resData.datum)).format("lll");

      groupFikers.push(
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

    //Only get the orders which match our current group id
    const currentGroupFikers = groupFikers.filter(
      (data) => data.gruppId === props.groupId
    );

    setGroupFikersData({
      allGroupFikers: currentGroupFikers,
      newFikers: currentGroupFikers.filter((data) => data.status === "2"),
      welcomedFikers: currentGroupFikers.filter((data) => data.status === "3"),
      activeFikers: currentGroupFikers.filter((data) => data.status === "4"),
      pausedFikers: currentGroupFikers.filter((data) => data.status === "5"),
    });
  }

  //Get group volunteers
  async function getGroupVolunteers() {
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

    //Only get the orders which match our current group id
    const currentGroupVolunteers = volunteers.filter(
      (data) => data.gruppId === props.groupId
    );

    setGroupVolunteersData({
      allGroupVolunteers: currentGroupVolunteers,
      newVolunteers: currentGroupVolunteers.filter(
        (data) => data.status === "2"
      ),
      welcomedVolunteers: currentGroupVolunteers.filter(
        (data) => data.status === "3"
      ),
      activeVolunteers: currentGroupVolunteers.filter(
        (data) => data.status === "4"
      ),
      pausedVolunteers: currentGroupVolunteers.filter(
        (data) => data.status === "5"
      ),
    });
  }

  //Get group data
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

    //set current group data as the object which matches the passed group id
    setGroupData({
      currentGroup: groups.find((data) => data.id === props.groupId),
    });
  }

  useEffect(() => {
    getGroups();
    getGroupOrders();
    getGroupVolunteers();
    getGroupFikers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="page-layout">
      <h2>{groupData.currentGroup.gruppnamn}</h2>
      <br />
      <Tabs variant="pills" defaultActiveKey="first" id="0">
        {groupOrdersData.allGroupOrders.length ? (
          <Tab
            title={
              <div className="flex-spread">
                <div className="margin-right-5">Beställningar</div>
                {groupOrdersData.allGroupOrders.length ? (
                  <>
                    <Badge pill variant="light" className="margin-right-5">
                      {groupOrdersData.allGroupOrders.length} TOTALT
                    </Badge>
                    <Badge
                      pill
                      variant={
                        groupOrdersData.distributedGroupOrders.length
                          ? "danger"
                          : "success"
                      }
                    >
                      {groupOrdersData.distributedGroupOrders.length > 0
                        ? `${groupOrdersData.distributedGroupOrders.length} ${
                            groupOrdersData.distributedGroupOrders.length > 1
                              ? "NYA"
                              : "NY"
                          }`
                        : "ALLA KLARA"}
                    </Badge>
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
            <GroupOrders
              groupData={props.groupData}
              groupId={props.groupId}
              dbData={groupOrdersData}
              refreshAction={getGroupOrders}
            />
          </Tab>
        ) : null}
        {groupVolunteersData.allGroupVolunteers.length ? (
          <Tab
            title={
              <div className="flex-spread">
                <div className="margin-right-5">Volontärer</div>
                <Badge pill variant="light" className="margin-right-5">
                  {groupVolunteersData.allGroupVolunteers.length} TOTALT
                </Badge>
                <Badge
                  pill
                  variant={
                    groupVolunteersData.newVolunteers.length
                      ? "danger"
                      : "success"
                  }
                >
                  {groupVolunteersData.newVolunteers.length > 0
                    ? `${groupVolunteersData.newVolunteers.length} "ATT VÄLKOMNAS"`
                    : "ALLA VÄLKOMNADE"}
                </Badge>
              </div>
            }
            eventKey="second"
          >
            <GroupVolunteers
              groupData={props.groupData}
              groupId={props.groupId}
              dbData={groupVolunteersData}
              refreshAction={getGroupVolunteers}
            />
          </Tab>
        ) : null}
        {groupFikersData.allGroupFikers.length ? (
          <Tab
            title={
              <div className="flex-spread">
                <div className="margin-right-5">Fikaintressenter</div>
                <Badge pill variant="light" className="margin-right-5">
                  {groupFikersData.allGroupFikers.length} TOTALT
                </Badge>
                <Badge
                  pill
                  variant={
                    groupFikersData.newFikers.length ? "danger" : "success"
                  }
                >
                  {groupFikersData.newFikers.length > 0
                    ? `${groupFikersData.newFikers.length} ${
                        groupFikersData.newFikers.length > 1 ? "NYA" : "NY"
                      }`
                    : "INGA NYA"}
                </Badge>
              </div>
            }
            eventKey="third"
          >
            <GroupFikers
              groupData={props.groupData}
              groupId={props.groupId}
              dbData={groupFikersData}
              refreshAction={getGroupFikers}
            />
          </Tab>
        ) : null}
      </Tabs>
    </div>
  );
};

export default GroupAdmin;
