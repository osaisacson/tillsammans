import React, { useEffect, useState } from 'react';
import Volunteer from './../../models/volunteer';
import moment from 'moment';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import firebase from 'firebase/app';
import 'firebase/firestore';

//Components
import Table from './Table';

const Volunteers = props => {
  const firestore = firebase.firestore();
  const [data, setData] = useState({
    newVolunteers: [],
    distributedVolunteers: [],
    activeVolunteers: [],
    inactiveVolunteers: []
  });

  //Attempt to NOT use redux
  useEffect(() => {
    // Create an scoped async function in the hook
    async function getVolunteers() {
      const volunteers = [];
      const querySnapshot = await firestore.collection('volunteers').get();
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        const resData = doc.data();
        const readableDate = moment(resData.datum).format('L');

        volunteers.push(
          new Volunteer(
            doc.id,
            resData.förnamn,
            resData.efternamn,
            resData.telefon,
            resData.email,
            resData.address,
            resData.postkod,
            resData.beskrivning,
            resData.körkort,
            resData.bil,
            resData.mat,
            resData.varor,
            resData.ärenden,
            resData.djur,
            resData.prata,
            resData.myndigheter,
            resData.teknik,
            resData.grupp,
            readableDate,
            resData.status
          )
        );
      });

      setData({
        newVolunteers: volunteers.filter(data => data.status === 'ny'),
        distributedVolunteers: volunteers.filter(
          data => data.status === 'hanterad'
        ),
        activeVolunteers: volunteers.filter(data => data.status === 'aktiv'),
        inactiveVolunteers: volunteers.filter(data => data.status === 'pausad')
      });
    }

    getVolunteers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="page-layout">
      <h2>Volontärer</h2>
      <p>Sortera genom att trycka på titlarna</p>
      <Tabs defaultActiveKey="nya" id="0">
        <Tab
          eventKey="nya"
          title={`Nya anmälningar (${
            data.newVolunteers.length ? data.newVolunteers.length : 0
          })`}
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
          eventKey="aktiva"
          title={`Aktiva i grupper (${
            data.activeVolunteers.length ? data.activeVolunteers.length : 0
          })`}
        >
          <Table isVolunteers={true} tableData={data.activeVolunteers} />
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
