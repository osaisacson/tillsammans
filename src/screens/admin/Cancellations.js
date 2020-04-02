import React, { useEffect, useState } from 'react';
import Cancellation from './../../models/cancellation';
import moment from 'moment';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import firebase from 'firebase/app';
import 'firebase/firestore';

//Components
import Table from './Table';

const Cancellations = props => {
  const firestore = firebase.firestore();
  const [data, setData] = useState({
    toCancel: [],
    cancelled: []
  });

  //Attempt to NOT use redux
  useEffect(() => {
    // Create an scoped async function in the hook
    async function getCancellations() {
      const cancellations = [];
      const querySnapshot = await firestore.collection('cancellations').get();
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        const resData = doc.data();
        const readableDate = moment(resData.datum).format('L');

        cancellations.push(
          new Cancellation(
            doc.id,
            readableDate,
            resData.telefon,
            resData.email,
            resData.address,
            resData.postkod,
            resData.status
          )
        );
      });

      setData({
        toCancel: cancellations.filter(data => data.status === 'avboka'),
        cancelled: cancellations.filter(data => data.status === 'avbokad')
      });
    }

    getCancellations();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="page-layout">
      <h2>Avbokningar</h2>
      <ol>
        <li>Hitta den avbeställda bokningen under 'beställningar'</li>
        <li>
          Kontakta relevant grupp för att meddela att beställningen ska bli
          avbokad.
        </li>
        <li>
          Påminn gruppledaren att kommunicera avbokningen till beställaren
        </li>
        <li>Radera beställningen</li>
        <li>
          Kom sen tillbaka hit och markera avbokningen som 'avbokad' under
          'status'.
        </li>
      </ol>
      <Tabs defaultActiveKey="nya" id="0">
        <Tab
          eventKey="avboka"
          title={`Att avboka (${
            data.toCancel.length ? data.toCancel.length : 0
          })`}
        >
          <Table isCancelled={true} tableData={data.toCancel} />
        </Tab>
        <Tab
          eventKey="avbokade"
          title={`Avbokade (${
            data.cancelled.length ? data.cancelled.length : 0
          })`}
        >
          <Table isCancelled={true} tableData={data.cancelled} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Cancellations;
