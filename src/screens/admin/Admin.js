import React, { useEffect, useState } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Badge from 'react-bootstrap/Badge';
import moment from 'moment';

//Models
import Order from './../../models/order';
import Volunteer from './../../models/volunteer';

//Components
import Volunteers from './Volunteers';
import Orders from './Orders';
import Groups from './Groups';
import Cancellations from './Cancellations';

//Firebase
import firebase from 'firebase/app';
import 'firebase/firestore';

const Admin = props => {
  const firestore = firebase.firestore();

  //Set up hooks
  const [volunteersData, setVolunteersData] = useState({
    newVolunteers: [],
    distributedVolunteers: [],
    welcomedVolunteers: [],
    activeVolunteers: [],
    pausedVolunteers: [],
    notSuitableVolunteers: []
  });

  const [ordersData, setOrdersData] = useState({
    newOrders: [],
    assignedToGroup: [],
    doneOrders: [],
    pausedOrders: [],
    cancelledOrders: []
  });

  //Get orders data
  async function getOrders() {
    const orders = [];
    const querySnapshot = await firestore.collection('orders').get();
    querySnapshot.forEach(function(doc) {
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

    setOrdersData({
      newOrders: orders.filter(data => data.status === '1'),
      assignedToGroup: orders.filter(data => data.status === '2'),
      doneOrders: orders.filter(data => data.status === '4'),
      pausedOrders: orders.filter(data => data.status === '5'),
      cancelledOrders: orders.filter(data => data.status === '6')
    });
  }

  //Get volunteers data
  async function getVolunteers() {
    const volunteers = [];
    const querySnapshot = await firestore.collection('volunteers').get();
    querySnapshot.forEach(function(doc) {
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

    setVolunteersData({
      newVolunteers: volunteers.filter(data => data.status === '1'),
      distributedVolunteers: volunteers.filter(data => data.status === '2'),
      welcomedVolunteers: volunteers.filter(data => data.status === '3'),
      activeVolunteers: volunteers.filter(data => data.status === '4'),
      pausedVolunteers: volunteers.filter(data => data.status === '5'),
      notSuitableVolunteers: volunteers.filter(data => data.status === '6')
    });
  }

  useEffect(() => {
    getOrders();
    getVolunteers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="page-layout">
      <Tabs variant="pills" defaultActiveKey="first" id="0">
        <Tab
          title={
            <span>
              Beställningar{' '}
              {ordersData.newOrders.length ? (
                <Badge pill variant="danger">
                  {ordersData.newOrders.length}
                </Badge>
              ) : (
                '(0)'
              )}
            </span>
          }
          eventKey="first"
        >
          <Orders refreshAction={getOrders} dbData={ordersData} />
        </Tab>
        <Tab
          title={
            <span>
              Volontärer{' '}
              {volunteersData.newVolunteers.length ? (
                <Badge pill variant="danger">
                  {volunteersData.newVolunteers.length}
                </Badge>
              ) : (
                '(0)'
              )}
            </span>
          }
          eventKey="second"
        >
          <Volunteers refreshAction={getVolunteers} dbData={volunteersData} />
        </Tab>
        <Tab title="Grupper" eventKey="third">
          <Groups />
        </Tab>
        <Tab title="Avbokningar" eventKey="fourth">
          <Cancellations />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Admin;
