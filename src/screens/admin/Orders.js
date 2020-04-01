import React, { useEffect, useState } from "react";
import Order from "./../../models/order";
import moment from "moment";

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import firebase from "firebase/app";
import "firebase/firestore";

//Components
import OrdersTable from "./OrdersTable";

const Orders = props => {
  const firestore = firebase.firestore();
  const [data, setData] = useState({
    newOrders: [],
    activeOrders: [],
    doneOrders: [],
    inactiveOrders: []
  });

  //Attempt to NOT use redux
  useEffect(() => {
    // Create an scoped async function in the hook
    async function getOrders() {
      const orders = [];
      const querySnapshot = await firestore.collection("orders").get();
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        const resData = doc.data();
        const readableDate = moment(resData.datum).format("L");

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
        newOrders: orders.filter(data => data.status === "ohanterad"),
        activeOrders: orders.filter(data => data.status === "hanterad"),
        doneOrders: orders.filter(data => data.status === "klar"),
        inactiveOrders: orders.filter(data => data.status === "inaktiv")
      });
    }

    getOrders();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="page-layout">
      <h2>Beställningar</h2>
      <p>Sortera genom att trycka på titlarna</p>
      <Tabs defaultActiveKey="nya" id="0">
        <Tab eventKey="nya" title={"Nya beställningar "}>
          <OrdersTable ordersData={data.newOrders} />
        </Tab>
        <Tab eventKey="aktiva" title={"Hanterade "}>
          <OrdersTable ordersData={data.activeOrders} />
        </Tab>
        <Tab eventKey="klara" title={"Levererade "}>
          <OrdersTable ordersData={data.doneOrders} />
        </Tab>
        <Tab eventKey="inaktiv" title={"Inaktiva "}>
          <OrdersTable ordersData={data.inactiveOrders} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Orders;
