import React, { useEffect, useState } from 'react';
import Volunteer from '../../models/volunteer';
import moment from 'moment';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Badge from 'react-bootstrap/Badge';

import firebase from 'firebase/app';
import 'firebase/firestore';

//Components
import Table from '../tables/Table';
import AddButtonHeader from '../../components/AddButtonHeader';
import RefreshButton from '../../components/RefreshButton';
import VolunteerForm from '../users/VolunteerForm';

const GroupVolunteers = props => {
  const firestore = firebase.firestore();
  const [data, setData] = useState({
    newVolunteers: [],
    activeVolunteers: [],
    inactiveVolunteers: []
  });

  async function getVolunteers() {
    const volunteers = [];
    const querySnapshot = await firestore.collection('volunteers').get();
    querySnapshot.forEach(function(doc) {
      // doc.data() is never undefined for query doc snapshots
      const resData = doc.data();
      const readableDate = moment(resData.datum).format('lll');

      volunteers.push(
        new Volunteer(
          doc.id,
          resData.gruppId,
          resData.förnamn,
          resData.efternamn,
          resData.telefon,
          resData.email,
          resData.address,
          resData.postkod,
          resData.beskrivning,
          resData.språk,
          resData.födelseår,
          resData.körkort,
          resData.bil,
          resData.mat,
          resData.varor,
          resData.ärenden,
          resData.djur,
          resData.prata,
          resData.myndigheter,
          resData.teknik,
          readableDate,
          resData.status
        )
      );
    });

    //Only get the orders which match our current group id
    const currentGroupVolunteers = volunteers.filter(
      data => data.gruppId === props.groupId
    );

    setData({
      newVolunteers: currentGroupVolunteers.filter(data => data.status === '2'),
      activeVolunteers: currentGroupVolunteers.filter(
        data => data.status === '3'
      ),
      inactiveVolunteers: currentGroupVolunteers.filter(
        data => data.status === '4'
      )
    });
  }

  useEffect(() => {
    getVolunteers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="page-layout">
      <AddButtonHeader
        headerText="Volontärer"
        buttonText="Volontär"
        formForModal={<VolunteerForm />}
      />

      <RefreshButton refreshAction={getVolunteers} />

      <Tabs defaultActiveKey="nya" id="0">
        <Tab
          eventKey="nya"
          title={
            <span>
              Nya Volontärer - att bli välkomnade{' '}
              {data.newVolunteers.length ? (
                <Badge pill variant="danger">
                  {data.newVolunteers.length}
                </Badge>
              ) : (
                0
              )}
            </span>
          }
        >
          <Table
            groupId={props.groupId}
            isVolunteers={true}
            tableData={data.newVolunteers}
          />
        </Tab>
        <Tab
          eventKey="aktiva"
          title={`Aktiva(${
            data.activeVolunteers.length ? data.activeVolunteers.length : 0
          })`}
        >
          <Table
            groupId={props.groupId}
            isVolunteers={true}
            tableData={data.activeVolunteers}
          />
        </Tab>
        <Tab
          eventKey="pausade"
          title={`Pausade (${
            data.inactiveVolunteers.length ? data.inactiveVolunteers.length : 0
          })`}
        >
          <Table
            groupId={props.groupId}
            isVolunteers={true}
            tableData={data.inactiveVolunteers}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default GroupVolunteers;
