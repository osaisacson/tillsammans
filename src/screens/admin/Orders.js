import React, { useEffect, useState } from 'react';
import moment from 'moment-with-locales-es6';

//Models
import Order from './../../models/order';

//Bootstrap
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Badge from 'react-bootstrap/Badge';

//Firebase
import firebase from 'firebase/app';
import 'firebase/firestore';

//Components
import Table from '../tables/Table';
import HelpForm from './../users/HelpForm';
import AddButtonHeader from './../../components/AddButtonHeader';
import RefreshButton from './../../components/RefreshButton';
import Accordion from './../../components/Accordion';

const Orders = props => {
  const firestore = firebase.firestore();

  //Set constants
  const [data, setData] = useState({
    newOrders: [],
    assignedToGroup: [],
    doneOrders: [],
    pausedOrders: [],
    cancelledOrders: []
  });

  async function getOrders() {
    const orders = [];
    const querySnapshot = await firestore.collection('orders').get();
    querySnapshot.forEach(function(doc) {
      // doc.data() is never undefined for query doc snapshots
      const resData = doc.data();
      const readableDate = moment(resData.datum).format('lll');

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
          resData.status
        )
      );
    });

    setData({
      newOrders: orders.filter(data => data.status === 'ohanterad'),
      assignedToGroup: orders.filter(data => data.status === 'fördelad-grupp'),
      doneOrders: orders.filter(data => data.status === 'klar'),
      pausedOrders: orders.filter(data => data.status === 'pausad'),
      cancelledOrders: orders.filter(data => data.status === 'avbokad')
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
      <Accordion
        title="Hur vi hanterar beställningar"
        content="<ol>
        <li>
          Läs igenom beställningen och avgör om den är klar att skicka vidare
          till en grupp.
        </li>
        <ul>
          <li>
            Om inte, klicka 'pausa' under aktionerna nedan och följ upp via
            email/telefon till beställaren och redigera nedan tills
            informationen är redo.
          </li>
          <li>
            Om redo, se vilken grupp som verkar mest lämplig för beställningen.
            Hitta information om grupper under 'Grupper' ovan.
          </li>
        </ul>
        <li>
          När du avgjort vilken grupp beställningen ska skickas till, tilldela
          beställningen en grupp nedan under aktioner. NOTERA: Snart kommer
          detta skicka ett automatiskt email till gruppen, men tills det är
          klart får vi skicka detaljerna om beställningen manuellt via ett mail.
        </li>
        <li>
          När du valt grupp för beställningen så flyttas denna till 'fördelad'
          tabben, och läggs dessutom till under respektive grupp under
          'grupper'.
        </li>
        <li>
        När gruppen kommunicerat att beställningen är genomförd, markera denna som 'levererad' nedan. Detta kommer automatiseras snart :)
        </li>
        <li>
          Om du behöver ångra något gör detta via 'aktioner' nedan. Men glöm
          inte att kontakta respektive grupp om ändringar.
        </li>
      </ol>"
      />

      <RefreshButton refreshAction={getOrders} />

      <Tabs defaultActiveKey="nya" id="0">
        <Tab
          eventKey="nya"
          title={
            <span>
              Ej fördelade Beställningar{' '}
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
          eventKey="gruppfördelade"
          title={`Fördelade till grupp (${
            data.assignedToGroup.length ? data.assignedToGroup.length : 0
          })`}
        >
          <Table isOrders={true} tableData={data.assignedToGroup} />
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
          eventKey="pausad"
          title={`Pausade (${
            data.pausedOrders.length ? data.pausedOrders.length : 0
          })`}
        >
          <Table isOrders={true} tableData={data.pausedOrders} />
        </Tab>
        <Tab
          eventKey="avbokad"
          title={`Avbokade (${
            data.cancelledOrders.length ? data.cancelledOrders.length : 0
          })`}
        >
          <Table isOrders={true} tableData={data.cancelledOrders} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Orders;
