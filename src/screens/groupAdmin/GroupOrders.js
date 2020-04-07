import React, { useEffect, useState } from 'react';
import moment from 'moment-with-locales-es6';

//Models
import Order from '../../models/order';

//Bootstrap
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Badge from 'react-bootstrap/Badge';

//Firebase
import firebase from 'firebase/app';
import 'firebase/firestore';

//Components
import Table from '../tables/Table';
import HelpForm from '../users/HelpForm';
import AddButtonHeader from '../../components/AddButtonHeader';
import RefreshButton from '../../components/RefreshButton';

const GroupOrders = props => {
  const firestore = firebase.firestore();

  //Set constants
  const [data, setData] = useState({
    distributedGroupOrders: [],
    distributedVolunteerOrders: [],
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

    //Only get the orders which match our current group id
    const currentGroupOrders = orders.filter(
      data => data.gruppId === props.groupId
    );
    setData({
      distributedGroupOrders: currentGroupOrders.filter(
        data => data.status === 'fördelad-grupp'
      ),
      distributedVolunteerOrders: currentGroupOrders.filter(
        data => data.status === 'fördelad-volontär'
      ),
      doneOrders: currentGroupOrders.filter(data => data.status === 'klar'),
      pausedOrders: currentGroupOrders.filter(data => data.status === 'pausad'),
      cancelledOrders: currentGroupOrders.filter(
        data => data.status === 'avbokad'
      )
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

      <RefreshButton refreshAction={getOrders} />

      <Tabs defaultActiveKey="nya" id="0">
        <Tab
          eventKey="nya"
          title={
            <span>
              Att bli fördelade till volontärer{' '}
              {data.distributedGroupOrders.length ? (
                <Badge pill variant="danger">
                  {data.distributedGroupOrders.length}
                </Badge>
              ) : (
                0
              )}
            </span>
          }
        >
          <Table
            groupId={props.groupId}
            isOrders={true}
            tableData={data.distributedGroupOrders}
          />
        </Tab>
        <Tab
          eventKey="aktiva"
          title={`Fördelade (${
            data.distributedVolunteerOrders.length
              ? data.distributedVolunteerOrders.length
              : 0
          })`}
        >
          <Table
            groupId={props.groupId}
            isOrders={true}
            tableData={data.distributedVolunteerOrders}
          />
        </Tab>
        <Tab
          eventKey="klara"
          title={`Levererade (${
            data.doneOrders.length ? data.doneOrders.length : 0
          })`}
        >
          <Table
            groupId={props.groupId}
            isOrders={true}
            tableData={data.doneOrders}
          />
        </Tab>
        <Tab
          eventKey="pausad"
          title={`Pausade (${
            data.pausedOrders.length ? data.pausedOrders.length : 0
          })`}
        >
          <Table
            groupId={props.groupId}
            isOrders={true}
            tableData={data.pausedOrders}
          />
        </Tab>
        <Tab
          eventKey="avbokade"
          title={`Avbokade (${
            data.cancelledOrders.length ? data.cancelledOrders.length : 0
          })`}
        >
          <Table
            groupId={props.groupId}
            isOrders={true}
            tableData={data.cancelledOrders}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default GroupOrders;
