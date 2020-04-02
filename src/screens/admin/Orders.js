import React, { useEffect, useState } from 'react';
import Order from './../../models/order';
import moment from 'moment';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

import firebase from 'firebase/app';
import 'firebase/firestore';

//Components
import Table from './Table';
import HelpForm from './../users/HelpForm';
import AddButtonHeader from './../../components/AddButtonHeader';

const Orders = props => {
  const firestore = firebase.firestore();
  const [data, setData] = useState({
    newOrders: [],
    activeOrders: [],
    doneOrders: [],
    inactiveOrders: []
  });

  // Create an scoped async function in the hook
  async function getOrders() {
    const orders = [];
    const querySnapshot = await firestore.collection('orders').get();
    querySnapshot.forEach(function(doc) {
      // doc.data() is never undefined for query doc snapshots
      const resData = doc.data();
      const readableDate = moment(resData.datum).format('L');

      orders.push(
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

    setData({
      newOrders: orders.filter(data => data.status === 'ohanterad'),
      activeOrders: orders.filter(data => data.status === 'hanterad'),
      doneOrders: orders.filter(data => data.status === 'klar'),
      inactiveOrders: orders.filter(data => data.status === 'inaktiv')
    });
  }

  useEffect(() => {
    getOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="page-layout">
      <AddButtonHeader
        headerText="Beställningar"
        buttonText="Beställning"
        formForModal={<HelpForm />}
      />
      <p>Sortera genom att trycka på titlarna</p>

      <div className="refresh-wrapper">
        <Button onClick={getOrders}>Ladda nya beställningar</Button>
      </div>

      <Tabs defaultActiveKey="nya" id="0">
        <Tab
          eventKey="nya"
          title={
            <span>
              Ohanterade Beställningar{' '}
              {data.newOrders.length ? (
                <Badge pill variant="danger">
                  {data.newOrders.length}
                </Badge>
              ) : (
                0
              )}
            </span>
          }
        >
          <Table isOrders={true} tableData={data.newOrders} />
        </Tab>
        <Tab
          eventKey="aktiva"
          title={`Hanterade (${
            data.activeOrders.length ? data.activeOrders.length : 0
          })`}
        >
          <Table isOrders={true} tableData={data.activeOrders} />
        </Tab>
        <Tab
          eventKey="klara"
          title={`Levererade (${
            data.doneOrders.length ? data.doneOrders.length : 0
          })`}
        >
          <Table isOrders={true} tableData={data.doneOrders} />
        </Tab>
        <Tab
          eventKey="inaktiv"
          title={`Inaktiva (${
            data.inactiveOrders.length ? data.inactiveOrders.length : 0
          })`}
        >
          <Table isOrders={true} tableData={data.inactiveOrders} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Orders;
