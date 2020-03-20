import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

//Components
import OrdersTable from '../../components/tables/OrdersTable';

export default function Orders() {
  const newOrders = [
    {
      datum: '2020-04-02',
      typ: 'Ärende',
      beskrivning: 'Lorem Ipsum',
      tidsrymd: 'Upp till två dagar',
      telefon: '0703248591',
      email: 'ooo.ooo@ooooo.oo',
      address: 'Näs 19',
      postkod: '47173'
    },
    {
      datum: '2020-04-02',
      typ: 'Ärende',
      beskrivning: 'Lorem Ipsum',
      tidsrymd: 'Upp till två dagar',
      telefon: '0703248591',
      email: 'ooo.ooo@ooooo.oo',
      address: 'Näs 19',
      postkod: '47173'
    },
    {
      datum: '2020-04-02',
      typ: 'Ärende',
      beskrivning: 'Lorem Ipsum',
      tidsrymd: 'Upp till två dagar',
      telefon: '0703248591',
      email: 'ooo.ooo@ooooo.oo',
      address: 'Näs 19',
      postkod: '47173'
    },
    {
      datum: '2020-04-02',
      typ: 'Ärende',
      beskrivning: 'Lorem Ipsum',
      tidsrymd: 'Upp till två dagar',
      telefon: '0703248591',
      email: 'ooo.ooo@ooooo.oo',
      address: 'Näs 19',
      postkod: '47173'
    },
    {
      datum: '2020-04-02',
      typ: 'Ärende',
      beskrivning: 'Lorem Ipsum',
      tidsrymd: 'Upp till två dagar',
      telefon: '0703248591',
      email: 'ooo.ooo@ooooo.oo',
      address: 'Näs 19',
      postkod: '47173'
    },
    {
      datum: '2020-04-02',
      typ: 'Ärende',
      beskrivning: 'Lorem Ipsum',
      tidsrymd: 'Upp till två dagar',
      telefon: '0703248591',
      email: 'ooo.ooo@ooooo.oo',
      address: 'Näs 19',
      postkod: '47173'
    }
  ];

  const activeOrders = [
    {
      datum: '2020-04-02',
      typ: 'Ärende',
      beskrivning: 'Lorem Ipsum',
      tidsrymd: 'Upp till två dagar',
      telefon: '0703248591',
      email: 'ooo.ooo@ooooo.oo',
      address: 'Näs 19',
      postkod: '47173'
    },
    {
      datum: '2020-04-02',
      typ: 'Ärende',
      beskrivning: 'Lorem Ipsum',
      tidsrymd: 'Upp till två dagar',
      telefon: '0703248591',
      email: 'ooo.ooo@ooooo.oo',
      address: 'Näs 19',
      postkod: '47173'
    },
    {
      datum: '2020-04-02',
      typ: 'Ärende',
      beskrivning: 'Lorem Ipsum',
      tidsrymd: 'Upp till två dagar',
      telefon: '0703248591',
      email: 'ooo.ooo@ooooo.oo',
      address: 'Näs 19',
      postkod: '47173'
    }
  ];

  const doneOrders = [
    {
      datum: '2020-04-02',
      typ: 'Ärende',
      beskrivning: 'Lorem Ipsum',
      tidsrymd: 'Upp till två dagar',
      telefon: '0703248591',
      email: 'ooo.ooo@ooooo.oo',
      address: 'Näs 19',
      postkod: '47173'
    },
    {
      datum: '2020-04-02',
      typ: 'Ärende',
      beskrivning: 'Lorem Ipsum',
      tidsrymd: 'Upp till två dagar',
      telefon: '0703248591',
      email: 'ooo.ooo@ooooo.oo',
      address: 'Näs 19',
      postkod: '47173'
    },
    {
      datum: '2020-04-02',
      typ: 'Ärende',
      beskrivning: 'Lorem Ipsum',
      tidsrymd: 'Upp till två dagar',
      telefon: '0703248591',
      email: 'ooo.ooo@ooooo.oo',
      address: 'Näs 19',
      postkod: '47173'
    },
    {
      datum: '2020-04-02',
      typ: 'Ärende',
      beskrivning: 'Lorem Ipsum',
      tidsrymd: 'Upp till två dagar',
      telefon: '0703248591',
      email: 'ooo.ooo@ooooo.oo',
      address: 'Näs 19',
      postkod: '47173'
    },
    {
      datum: '2020-04-02',
      typ: 'Ärende',
      beskrivning: 'Lorem Ipsum',
      tidsrymd: 'Upp till två dagar',
      telefon: '0703248591',
      email: 'ooo.ooo@ooooo.oo',
      address: 'Näs 19',
      postkod: '47173'
    },
    {
      datum: '2020-04-02',
      typ: 'Ärende',
      beskrivning: 'Lorem Ipsum',
      tidsrymd: 'Upp till två dagar',
      telefon: '0703248591',
      email: 'ooo.ooo@ooooo.oo',
      address: 'Näs 19',
      postkod: '47173'
    },
    {
      datum: '2020-04-02',
      typ: 'Ärende',
      beskrivning: 'Lorem Ipsum',
      tidsrymd: 'Upp till två dagar',
      telefon: '0703248591',
      email: 'ooo.ooo@ooooo.oo',
      address: 'Näs 19',
      postkod: '47173'
    },
    {
      datum: '2020-04-02',
      typ: 'Ärende',
      beskrivning: 'Lorem Ipsum',
      tidsrymd: 'Upp till två dagar',
      telefon: '0703248591',
      email: 'ooo.ooo@ooooo.oo',
      address: 'Näs 19',
      postkod: '47173'
    },
    {
      datum: '2020-04-02',
      typ: 'Ärende',
      beskrivning: 'Lorem Ipsum',
      tidsrymd: 'Upp till två dagar',
      telefon: '0703248591',
      email: 'ooo.ooo@ooooo.oo',
      address: 'Näs 19',
      postkod: '47173'
    },
    {
      datum: '2020-04-02',
      typ: 'Ärende',
      beskrivning: 'Lorem Ipsum',
      tidsrymd: 'Upp till två dagar',
      telefon: '0703248591',
      email: 'ooo.ooo@ooooo.oo',
      address: 'Näs 19',
      postkod: '47173'
    },
    {
      datum: '2020-04-02',
      typ: 'Ärende',
      beskrivning: 'Lorem Ipsum',
      tidsrymd: 'Upp till två dagar',
      telefon: '0703248591',
      email: 'ooo.ooo@ooooo.oo',
      address: 'Näs 19',
      postkod: '47173'
    }
  ];

  return (
    <div className="page-layout">
      <h2>Beställningar</h2>
      <p>Sortera genom att trycka på titlarna</p>
      <Tabs defaultActiveKey="nya" id="0">
        <Tab
          eventKey="nya"
          title={`Nya beställningar (${
            newOrders.length ? newOrders.length : 0
          })`}
        >
          <OrdersTable ordersData={newOrders} />
        </Tab>
        <Tab
          eventKey="aktiva"
          title={`Aktiva (${activeOrders.length ? activeOrders.length : 0})`}
        >
          <OrdersTable ordersData={activeOrders} />
        </Tab>
        <Tab
          eventKey="inaktiva"
          title={`Inaktiva (${doneOrders.length ? doneOrders.length : 0})`}
        >
          <OrdersTable ordersData={doneOrders} />
        </Tab>
      </Tabs>
    </div>
  );
}
