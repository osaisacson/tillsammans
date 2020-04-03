import React, { useEffect, useState } from 'react';
import moment from 'moment';

import Cancellation from './../../models/cancellation';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Badge from 'react-bootstrap/Badge';

import firebase from 'firebase/app';
import 'firebase/firestore';

//Components
import Table from './Table';
import AddButtonHeader from './../../components/AddButtonHeader';
import RefreshButton from './../../components/RefreshButton';
import CancelForm from './../users/CancelForm';
import Accordion from './../../components/Accordion';

const Cancellations = props => {
  const firestore = firebase.firestore();
  const [data, setData] = useState({
    toCancel: [],
    cancelled: []
  });

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

  useEffect(() => {
    getCancellations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="page-layout">
      <AddButtonHeader
        headerText="Avbokningar"
        buttonText="Avbokning"
        formForModal={<CancelForm />}
      />
      <Accordion
        title="Hur vi hanterar avbokningar"
        content="<ol>
        <li>Hitta den avbokade beställningen under 'beställningar'</li>
        <li>
          Kontakta relevant grupp för att meddela att beställningen ska bli
          avbokad.
        </li>
        <li>
          Påminn gruppledaren att kommunicera avbokningen till beställaren
        </li>
        <li>Radera beställningen via 'radera beställning' under beställningar/aktioner</li>
        <li>
          Kom sen tillbaka hit och markera avbokningen som 'avbokad' under
          'status'.
        </li>
      </ol>"
      />

      <RefreshButton refreshAction={getCancellations} />

      <Tabs defaultActiveKey="avboka" id="0">
        <Tab
          eventKey="avboka"
          title={
            <span>
              Att avboka{' '}
              {data.toCancel.length ? (
                <Badge pill variant="danger">
                  {data.toCancel.length}
                </Badge>
              ) : (
                0
              )}
            </span>
          }
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
