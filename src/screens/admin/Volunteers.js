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
        buttonText="Volontär"
        formForModal={<VolunteerForm />}
      />
      <Accordion
        title="Hur vi hanterar volontärer"
        content="  <ol>
        <li>
          Läs igenom volontärsinformationen och avgör om den är klar för en
          grupp.
        </li>
        <ul>
          <li>
            Om inte, klicka 'pausa' under aktionerna nedan och följ upp via
            email/telefon till volontären, och redigera nedan tills
            informationen är redo.
          </li>
          <li>
            Om redo, se vilken grupp volontären bäst verkar passa. Hitta
            information om grupper under 'Grupper' ovan.
          </li>
        </ul>
        <li>
          När du avgjort vilken grupp volontären ska till, tilldela volontären en
          grupp nedan under aktioner. NOTERA: Snart kommer detta skicka ett
          automatiskt email till gruppen, men tills det är klart får vi skicka
          detaljerna om volontären manuellt via ett mail.
        </li>
        <li>
          När du valt grupp för volontären så flyttas denna till 'Fördelade i grupper'
          tabben, och läggs dessutom till under respektive grupp under
          'grupper'.
        </li>
        <li>
          Om du behöver ångra något gör detta via aktionerna nedan. Men glöm
          inte att kontakta respektive grupp om ändringar.
        </li>
      </ol>"
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
          <Table isVolunteers={true} tableData={data.newVolunteers} />
        </Tab>
        <Tab
          eventKey="fördelade"
          title={`Fördelade till grupper (${
            data.distributedVolunteers.length
              ? data.distributedVolunteers.length
              : 0
          })`}
        >
          <Table isVolunteers={true} tableData={data.distributedVolunteers} />
        </Tab>
        <Tab
          eventKey="pausade"
          title={`Pausade (${
            data.inactiveVolunteers.length ? data.inactiveVolunteers.length : 0
          })`}
        >
          <Table isVolunteers={true} tableData={data.inactiveVolunteers} />
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
