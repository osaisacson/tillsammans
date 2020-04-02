import React, { useEffect, useState } from 'react';
import Group from './../../models/group';
import moment from 'moment';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

import firebase from 'firebase/app';
import 'firebase/firestore';

//Components
import Table from './Table';
import AddButtonHeader from './../../components/AddButtonHeader';
import GroupForm from '../users/GroupForm';

const Groups = props => {
  const firestore = firebase.firestore();
  const [data, setData] = useState({
    newGroups: [],
    activeGroups: [],
    inactiveGroups: []
  });

  async function getGroups() {
    const groups = [];
    const querySnapshot = await firestore.collection('groups').get();
    querySnapshot.forEach(function(doc) {
      // doc.data() is never undefined for query doc snapshots
      const resData = doc.data();
      const readableDate = moment(resData.datum).format('L');

      groups.push(
        new Group(
          doc.id,
          readableDate,
          resData.gruppnamn,
          resData.kontakt,
          resData.kommentarer,
          resData.telefon,
          resData.email,
          resData.address,
          resData.postkod,
          resData.status
        )
      );
    });

    setData({
      newGroups: groups.filter(data => data.status === 'ny'),
      activeGroups: groups.filter(data => data.status === 'aktiv'),
      inactiveGroups: groups.filter(data => data.status === 'inaktiv')
    });
  }
  useEffect(() => {
    getGroups();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="page-layout">
      <AddButtonHeader
        headerText="Grupper"
        buttonText="Grupp"
        headerLink={'/ny-grupp'}
        formForModal={<GroupForm />}
      />
      <p>
        Den här sidan är till för att få överblick över grupper knutna till
        plattformen
      </p>
      <ol>
        <li>Se anknytna volontärer och beställningar under varje grupp</li>
        <li>Om du behöver kontakta gruppen, se 'kontaktperson' nedan.</li>
      </ol>

      <div className="refresh-wrapper">
        <Button onClick={getGroups}>Ladda nya grupper</Button>{' '}
      </div>

      <Tabs defaultActiveKey="ny" id="0">
        <Tab
          eventKey="ny"
          title={
            <span>
              Nya Grupper{' '}
              {data.newGroups.length ? (
                <Badge pill variant="danger">
                  {data.newGroups.length}
                </Badge>
              ) : (
                0
              )}
            </span>
          }
        >
          <Table isGroups={true} tableData={data.newGroups} />
        </Tab>
        <Tab
          eventKey="aktiva"
          title={`Aktiva grupper (${
            data.activeGroups.length ? data.activeGroups.length : 0
          })`}
        >
          <Table isGroups={true} tableData={data.activeGroups} />
        </Tab>
        <Tab
          eventKey="inaktiva"
          title={`Inaktiva grupper (${
            data.inactiveGroups.length ? data.inactiveGroups.length : 0
          })`}
        >
          <Table isGroups={true} tableData={data.inactiveGroups} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Groups;
