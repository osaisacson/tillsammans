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
    welcomedVolunteers: [],
    activeVolunteers: [],
    pausedVolunteers: [],
    notSuitableVolunteers: []
  });

  async function getVolunteers() {
    const volunteers = [];
    const querySnapshot = await firestore.collection('volunteers').get();
    querySnapshot.forEach(function(doc) {
      // doc.data() is never undefined for query doc snapshots
      const resData = doc.data();
      const readableDate = moment(new Date(resData.datum)).format('lll');

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
          resData.status,
          resData.kommentarer
        )
      );
    });

    //Only get the orders which match our current group id
    const currentGroupVolunteers = volunteers.filter(
      data => data.gruppId === props.groupId
    );

    setData({
      newVolunteers: currentGroupVolunteers.filter(data => data.status === '2'),
      welcomedVolunteers: currentGroupVolunteers.filter(
        data => data.status === '3'
      ),
      activeVolunteers: currentGroupVolunteers.filter(
        data => data.status === '4'
      ),
      pausedVolunteers: currentGroupVolunteers.filter(
        data => data.status === '5'
      ),
      notSuitableVolunteers: currentGroupVolunteers.filter(
        data => data.status === '6'
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
        buttonText="volontär"
        formForModal={<VolunteerForm />}
      />
      <br />
      <h4>Hur vi hanterar volontärer</h4>
      <ol>
        <li>
          Öppna redigering genom att klicka på pennan till vänster om volontären
        </li>
        <li>
          Ändra status till det som passar. (Du kan också uppdatera annan
          information om du vill - till exempel 'kommentarer' - men 'status' är
          viktigast)
        </li>
        <li>
          Klicka på bock-ikonen till vänster om volontären för att spara
          ändringar
        </li>
        <li>
          Om inte ändringarna syns direkt, klicka den lila refresh-knappen nere
          till höger
        </li>
        <li>Klart! Ändringarna här syns nu också för samordnaren.</li>
      </ol>
      <p>
        För frågor, kontakta asaisacson@gmail.com. Vi uppdaterar hela tiden
        systemet och tar gärna emot tips om hur det kan bli bättre!
      </p>
      <br />
      <h5>Mer information här</h5>
      <a href="https://docs.google.com/document/d/1lLxe5x-4yJ1qPHfGkBkfle2EIp7tVjUU4aMhYuRQQ5Y/edit?usp=sharing">
        Gemensamma procedurer för beställningar och volontärer
      </a>
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
            isGroupVolunteers={true}
            tableData={data.newVolunteers}
            refreshAction={getVolunteers}
          />
        </Tab>
        <Tab
          eventKey="välkomnade"
          title={`Välkomnade - att tränas (${
            data.welcomedVolunteers.length ? data.welcomedVolunteers.length : 0
          })`}
        >
          <Table
            groupId={props.groupId}
            isGroupVolunteers={true}
            tableData={data.welcomedVolunteers}
            refreshAction={getVolunteers}
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
            isGroupVolunteers={true}
            tableData={data.activeVolunteers}
            refreshAction={getVolunteers}
          />
        </Tab>
        <Tab
          eventKey="pausade"
          title={`Pausade (${
            data.pausedVolunteers.length ? data.pausedVolunteers.length : 0
          })`}
        >
          <Table
            groupId={props.groupId}
            isGroupVolunteers={true}
            tableData={data.pausedVolunteers}
            refreshAction={getVolunteers}
          />
        </Tab>
        <Tab
          eventKey="olämpliga"
          title={`Olämpliga (${
            data.notSuitableVolunteers.length
              ? data.notSuitableVolunteers.length
              : 0
          })`}
        >
          <Table
            groupId={props.groupId}
            isGroupVolunteers={true}
            tableData={data.notSuitableVolunteers}
            refreshAction={getVolunteers}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default GroupVolunteers;
