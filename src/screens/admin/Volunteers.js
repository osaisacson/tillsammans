import React, { useEffect, useState } from 'react';
import Volunteer from './../../models/volunteer';
import moment from 'moment';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Badge from 'react-bootstrap/Badge';

import firebase from 'firebase/app';
import 'firebase/firestore';

//Components
import Table from '../tables/Table';
import AddButtonHeader from './../../components/AddButtonHeader';
import RefreshButton from './../../components/RefreshButton';
import VolunteerForm from './../users/VolunteerForm';
import Accordion from './../../components/Accordion';

const Volunteers = props => {
  const firestore = firebase.firestore();
  const [data, setData] = useState({
    newVolunteers: [],
    distributedVolunteers: [],
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
          resData.status
        )
      );
    });

    setData({
      newVolunteers: volunteers.filter(data => data.status === '1'),
      distributedVolunteers: volunteers.filter(data => data.status === '2'),
      welcomedVolunteers: volunteers.filter(data => data.status === '3'),
      activeVolunteers: volunteers.filter(data => data.status === '4'),
      pausedVolunteers: volunteers.filter(data => data.status === '5'),
      notSuitableVolunteers: volunteers.filter(data => data.status === '6')
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
      <Accordion
        title="Hur vi hanterar Volontärer"
        content="<ol>
        <li>Öppna redigering genom att klicka på pennan till vänster om volontären</li>
        <li>Välj grupp</li>
        <li>Ändra status till 'Fördelad till grupp'.</li>
      
        <li>
          Klicka på spara symbolen för att spara ändringar
        </li>
      <li>Om inte ändringarna syns direkt, klicka refresh-knappen till höger</li>
      <li>VIKTIGT: Skicka ut ett email till den valda gruppens kontaktperson om att de fått in en ny volontär</li>
      </ol>
      
     
</br>
      -----------------------------------------------------------------------
      </br>
<p>Hej!</p>

            <p>Ni har fått in en ny volontär till er volontärgrupp från Alla Tillsammans.</p>

            <p>Nästa steg:</p>
            
            <p>1. Gå in på er sida (kontakta asaisacson@gmail.com om ni behöver addressen/login)</p>
            
            <p>2. Hitta alla detaljer om volontären där</p>
           
            <p>3. Kontakta volontären och låt dom veta att de snart kommer bli välkomnade.</p>

            <p>4. Uppdatera volontärens status via er gruppsida när de blivit välkomnade. </p>

            <br />

            <p>Låt mig veta om ni har några frågor!</p>
            <p>Vänliga hälsningar,</p>

      -----------------------------------------------------------------------
      </br>
      </br>"
      />

      <RefreshButton refreshAction={getVolunteers} />

      <Tabs defaultActiveKey="nya" id="0">
        <Tab
          eventKey="nya"
          title={
            <span>
              Nya {''}
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
            refreshAction={getVolunteers}
          />
        </Tab>
        <Tab
          eventKey="fördelade"
          title={`Fördelade till grupper (${
            data.distributedVolunteers.length
              ? data.distributedVolunteers.length
              : 0
          })`}
        >
          <Table
            groupId={props.groupId}
            isVolunteers={true}
            tableData={data.distributedVolunteers}
            refreshAction={getVolunteers}
          />
        </Tab>
        <Tab
          eventKey="välkomnade"
          title={`Välkomnade (${
            data.welcomedVolunteers.length ? data.welcomedVolunteers.length : 0
          })`}
        >
          <Table
            groupId={props.groupId}
            isVolunteers={true}
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
            isVolunteers={true}
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
            isVolunteers={true}
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
            isVolunteers={true}
            tableData={data.notSuitableVolunteers}
            refreshAction={getVolunteers}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Volunteers;
