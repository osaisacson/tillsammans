import React, { useEffect, useState } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Badge from 'react-bootstrap/Badge';
import moment from 'moment';

import Order from './../../models/order';
import Group from './../../models/group';
import Volunteer from './../../models/volunteer';

import firebase from 'firebase/app';
import 'firebase/firestore';

import GroupOrders from '../groupAdmin/GroupOrders';
import GroupVolunteers from '../groupAdmin/GroupVolunteers';

const GroupAdmin = (props) => {
  const firestore = firebase.firestore();

  //Set up hooks
  const [groupData, setGroupData] = useState({
    currentGroup: [],
  });

  const [groupOrdersData, setGroupOrdersData] = useState({
    distributedGroupOrders: [],
    distributedVolunteerOrders: [],
    doneOrders: [],
    pausedOrders: [],
    cancelledOrders: [],
  });

  const [groupVolunteersData, setGroupVolunteersData] = useState({
    newVolunteers: [],
    welcomedVolunteers: [],
    activeVolunteers: [],
    pausedVolunteers: [],
    notSuitableVolunteers: [],
  });

  //Get group orders
  async function getGroupOrders() {
    const orders = [];
    const querySnapshot = await firestore.collection('orders').get();
    querySnapshot.forEach(function (doc) {
      // doc.data() is never undefined for query doc snapshots
      const resData = doc.data();
      const readableDate = moment(new Date(resData.datum)).format('lll');

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
          resData.kommentarer
        )
      );
    });

    //Only get the orders which match our current group id
    const currentGroupOrders = orders.filter(
      (data) => data.gruppId === props.groupId
    );
    setGroupOrdersData({
      distributedGroupOrders: currentGroupOrders.filter(
        (data) => data.status === '2'
      ),
      distributedVolunteerOrders: currentGroupOrders.filter(
        (data) => data.status === '3'
      ),
      doneOrders: currentGroupOrders.filter((data) => data.status === '4'),
      pausedOrders: currentGroupOrders.filter((data) => data.status === '5'),
      cancelledOrders: currentGroupOrders.filter((data) => data.status === '6'),
    });
  }

  //Get group volunteers
  async function getGroupVolunteers() {
    const volunteers = [];
    const querySnapshot = await firestore.collection('volunteers').get();
    querySnapshot.forEach(function (doc) {
      // doc.data() is never undefined for query doc snapshots
      const resData = doc.data();
      const readableDate = moment(new Date(resData.datum)).format('lll');

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
          resData.kommentarer
        )
      );
    });

    //Only get the orders which match our current group id
    const currentGroupVolunteers = volunteers.filter(
      (data) => data.gruppId === props.groupId
    );

    setGroupVolunteersData({
      newVolunteers: currentGroupVolunteers.filter(
        (data) => data.status === '2'
      ),
      welcomedVolunteers: currentGroupVolunteers.filter(
        (data) => data.status === '3'
      ),
      activeVolunteers: currentGroupVolunteers.filter(
        (data) => data.status === '4'
      ),
      pausedVolunteers: currentGroupVolunteers.filter(
        (data) => data.status === '5'
      ),
      notSuitableVolunteers: currentGroupVolunteers.filter(
        (data) => data.status === '6'
      ),
    });
  }

  //Get group data
  async function getGroups() {
    const groups = [];
    const querySnapshot = await firestore.collection('groups').get();
    querySnapshot.forEach(function (doc) {
      // doc.data() is never undefined for query doc snapshots
      const resData = doc.data();
      const readableDate = moment(new Date(resData.datum)).format('lll');

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
          resData.address,
          resData.postkod,
          resData.status,
          resData.adminNamn,
          resData.adminPwd
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="page-layout">
      <h2>{groupData.currentGroup.gruppnamn}</h2>
      <br />
      <Tabs variant="pills" defaultActiveKey="first" id="0">
        <Tab
          title={
            <span>
              Beställningar{' '}
              {groupOrdersData.distributedGroupOrders.length ? (
                <Badge pill variant="danger">
                  {groupOrdersData.distributedGroupOrders.length}
                </Badge>
              ) : (
                '(0)'
              )}
            </span>
          }
          eventKey="first"
        >
          <GroupOrders
            groupId={props.groupId}
            dbData={groupOrdersData}
            refreshAction={getGroupOrders}
          />
        </Tab>
        <Tab
          title={
            <span>
              Volontärer{' '}
              {groupVolunteersData.newVolunteers.length ? (
                <Badge pill variant="danger">
                  {groupVolunteersData.newVolunteers.length}
                </Badge>
              ) : (
                '(0)'
              )}
            </span>
          }
          eventKey="second"
        >
          <GroupVolunteers
            groupId={props.groupId}
            dbData={groupVolunteersData}
            refreshAction={getGroupVolunteers}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default GroupAdmin;
