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
    activeVolunteers: [],
    inactiveVolunteers: []
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
      activeVolunteers: volunteers.filter(data => data.status === '3'),
      inactiveVolunteers: volunteers.filter(data => data.status === '4')
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
              Nya Anmälningar{' '}
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
            isVolunteers={true}
            tableData={data.newVolunteers}
            refreshAction={getVolunteers}
          />
        </Tab>
        <Tab
          eventKey="fördelade"
          title={`Fördelade till grupper - att välkomnas (${
            data.distributedVolunteers.length
              ? data.distributedVolunteers.length
              : 0
          })`}
        >
          <Table
            isVolunteers={true}
            tableData={data.distributedVolunteers}
            refreshAction={getVolunteers}
          />
        </Tab>
        <Tab
          eventKey="aktiva"
          title={`Aktiva (${
            data.activeVolunteers.length ? data.activeVolunteers.length : 0
          })`}
        >
          <Table
            isVolunteers={true}
            tableData={data.activeVolunteers}
            refreshAction={getVolunteers}
          />
        </Tab>
        <Tab
          eventKey="pausade"
          title={`Pausade (${
            data.inactiveVolunteers.length ? data.inactiveVolunteers.length : 0
          })`}
        >
          <Table
            isVolunteers={true}
            tableData={data.inactiveVolunteers}
            refreshAction={getVolunteers}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Volunteers;

// import React, { useEffect, useCallback } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import Tabs from 'react-bootstrap/Tabs';
// import Tab from 'react-bootstrap/Tab';

// import * as volunteersActions from '../../store/actions/volunteers';

// //Components
// import VolunteersTable from './VolunteersTable';

// const Volunteers = props => {
//   const volunteers = useSelector(state => state.volunteers.availableVolunteers);

//   const aVolunteers = volunteers.filter(data => data.status === 'ny');
//   const bVolunteers = volunteers.filter(data => data.status === 'fördelad');
//   const cVolunteers = volunteers.filter(data => data.status === 'kontaktad');
//   const dVolunteers = volunteers.filter(data => data.status === 'pausad');

//   const dispatch = useDispatch();

//   const loadVolunteers = useCallback(async () => {
//     try {
//       await dispatch(volunteersActions.fetchVolunteers());
//     } catch (err) {
//       console.log(err.message);
//     }
//   }, [dispatch]);

//   useEffect(() => {
//     loadVolunteers();
//     console.log('---------screens/admin/Volunteers.js---------');
//     console.log(
//       'Attempting to filter data. Loading main data does not work, and neither does filtering'
//     );
//     console.log(
//       'line:37 getting volunteers slice from redux state, DOES NOT WORK: ',
//       volunteers
//     );
//     console.log(
//       'line:41 this should show a subset of the slice, DOES NOT WORK: ',
//       aVolunteers
//     );
//     console.log('--------------------------------------------------');
//     console.log('****** END. REDUX APPROACH ******');
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return (
//     <div className="page-layout">
//       <h2>Volontärer</h2>
//       <p>Sortera genom att trycka på titlarna</p>
//       <Tabs defaultActiveKey="nya" id="0">
//         <Tab
//           eventKey="nya"
//           title={`Nya anmälningar`}
//           // title={`Nya anmälningar (${aVolunteers.length ? aVolunteers.length : 0})`}
//         >
//           <VolunteersTable tableData={aVolunteers} />
//         </Tab>
//         <Tab eventKey="fördelade" title={'Fördelade för att kontaktas'}>
//           <VolunteersTable tableData={bVolunteers} />
//         </Tab>
//         <Tab eventKey="aktiva" title={'Aktiva i grupper'}>
//           <VolunteersTable tableData={cVolunteers} />
//         </Tab>
//         <Tab eventKey="pausade" title={'Pausade'}>
//           <VolunteersTable tableData={dVolunteers} />
//         </Tab>
//       </Tabs>
//     </div>
//   );
// };

// export default Volunteers;
