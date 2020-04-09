import React, { useEffect, useState } from 'react';
import moment from 'moment';

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

    setData({
      newOrders: orders.filter(data => data.status === '1'),
      assignedToGroup: orders.filter(data => data.status === '2'),
      doneOrders: orders.filter(data => data.status === '4'),
      pausedOrders: orders.filter(data => data.status === '5'),
      cancelledOrders: orders.filter(data => data.status === '6')
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
        buttonText="beställning"
        formForModal={<HelpForm />}
      />
      <Accordion
        title="Hur vi hanterar beställningar"
        content="<ol>
        <li>Öppna redigering genom att klicka på pennan till vänster om beställningen</li>
        <li>Välj grupp</li>
        <li>Ändra status till 'Fördelad till grupp'.</li>
      
        <li>
          Klicka på spara symbolen för att spara ändringar
        </li>
      <li>Om inte ändringarna syns direkt, klicka refresh-knappen till höger</li>
      <li>VIKTIGT: Skicka ut ett email till den valda gruppens kontaktperson om att de fått in en ny beställning</li>
      </ol>
      
     
</br>
      -----------------------------------------------------------------------
      </br>
<p>Hej!</p>

            <p>Ni har fått in en ny beställning till er volontärgrupp från Alla Tillsammans.</p>

            <p>Nästa steg:</p>
            
            <p>1. Gå in på er sida (kontakta asaisacson@gmail.com om ni behöver addressen/login)</p>
            
            <p>2. Hitta alla detaljer om beställningen där</p>
           
            <p>3. Kontakta beställaren och låt dom veta beställningen är mottagen och på gång.</p>

            <p>4. Uppdatera beställningen via er gruppsida. </p>

            <br />

            <p>Låt mig veta om ni har några frågor!</p>
            <p>Vänliga hälsningar,</p>

      -----------------------------------------------------------------------
      </br>
      </br>"
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
          <Table
            isOrders={true}
            tableData={data.newOrders}
            refreshAction={getOrders}
          />
        </Tab>
        <Tab
          eventKey="gruppfördelade"
          title={`Fördelade till grupp (${
            data.assignedToGroup.length ? data.assignedToGroup.length : 0
          })`}
        >
          <Table
            isOrders={true}
            tableData={data.assignedToGroup}
            refreshAction={getOrders}
          />
        </Tab>
        <Tab
          eventKey="klara"
          title={`Klara (${
            data.doneOrders.length ? data.doneOrders.length : 0
          })`}
        >
          <Table
            isOrders={true}
            tableData={data.doneOrders}
            refreshAction={getOrders}
          />
        </Tab>
        <Tab
          eventKey="pausad"
          title={`Pausade (${
            data.pausedOrders.length ? data.pausedOrders.length : 0
          })`}
        >
          <Table
            isOrders={true}
            tableData={data.pausedOrders}
            refreshAction={getOrders}
          />
        </Tab>
        <Tab
          eventKey="avbokad"
          title={`Avbokade (${
            data.cancelledOrders.length ? data.cancelledOrders.length : 0
          })`}
        >
          <Table
            isOrders={true}
            tableData={data.cancelledOrders}
            refreshAction={getOrders}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Orders;
