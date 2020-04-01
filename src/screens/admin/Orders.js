import React, { useEffect } from 'react';
import Order from './../../models/order';
import moment from 'moment';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import firebase from 'firebase/app';
import 'firebase/firestore';

//Components
import OrdersTable from './OrdersTable';

const Orders = props => {
  const firestore = firebase.firestore();
  const loadedOrders = [];

  let newOrders = [];
  let activeOrders = [];
  let doneOrders = [];
  let inactiveOrders = [];

  const setSubsets = () => {
    newOrders = loadedOrders.filter(data => data.status === 'ohanterad');
    activeOrders = loadedOrders.filter(data => data.status === 'hanterad');
    doneOrders = loadedOrders.filter(data => data.status === 'klar');
    inactiveOrders = loadedOrders.filter(data => data.status === 'inaktiv');
  };

  //Attempt to NOT use redux
  useEffect(() => {
    // Create an scoped async function in the hook
    async function getOrders() {
      await firestore
        .collection('orders')
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            const resData = doc.data();
            const readableDate = moment(resData.datum).format('L');
            loadedOrders.push(
              new Order(
                doc.id,
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
                resData.grupp,
                resData.status
              )
            );
          });
        });
    }
    console.log('****** ORDERS - NON-REDUX APPROACH ******');

    console.log('-------------screens/admin/Orders.js-------------');
    console.log(
      'Attempting to filter data. Loading main data set works but filtering does not:'
    );

    getOrders();
    console.log('line:71 loadedOrders, THIS WORKS:', loadedOrders);

    setSubsets();
    console.log(
      'line:75 this should show a subset of the loadedOrders, DOES NOT WORK: ',
      newOrders
    );
    console.log('--------------------------------------------------');
    console.log('****** END. NON-REDUX APPROACH ******');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadedOrders]);

  return (
    <div className="page-layout">
      <h2>Beställningar</h2>
      <p>Sortera genom att trycka på titlarna</p>
      <Tabs defaultActiveKey="nya" id="0">
        <Tab eventKey="nya" title={'Nya beställningar '}>
          <OrdersTable ordersData={newOrders} />
        </Tab>
        <Tab eventKey="aktiva" title={'Hanterade'}>
          <OrdersTable ordersData={activeOrders} />
        </Tab>
        <Tab eventKey="klara" title={'Levererade'}>
          <OrdersTable ordersData={doneOrders} />
        </Tab>
        <Tab eventKey="inaktiv" title={`Inaktiva `}>
          <OrdersTable ordersData={inactiveOrders} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Orders;
