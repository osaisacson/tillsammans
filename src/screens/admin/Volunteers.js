// import React, { useEffect, useCallback } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import volunteersDummyData from './../../DummyData/VolunteersDummyData';

// import * as volunteersActions from '../../store/actions/volunteers';

//Components
import VolunteersTable from '../../components/tables/VolunteersTable';

export default function Volunteers() {
  const volunteers = volunteersDummyData;

  // const volunteers = useSelector(state => state.volunteers.availableVolunteers);

  const aVolunteers = volunteers.filter(data => data.status === 'ny');
  const bVolunteers = volunteers.filter(data => data.status === 'fördelad');
  const cVolunteers = volunteers.filter(data => data.status === 'kontaktad');
  const dVolunteers = volunteers.filter(data => data.status === 'pausad');

  // const dispatch = useDispatch();

  // const loadVolunteers = useCallback(async () => {
  //   try {
  //     await dispatch(volunteersActions.fetchVolunteers());
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // }, [dispatch]);

  // useEffect(() => {
  //   loadVolunteers();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <div className="page-layout">
      <h2>Volontärer</h2>
      <p>Sortera genom att trycka på titlarna</p>
      <Tabs defaultActiveKey="nya" id="0">
        <Tab
          eventKey="nya"
          title={`Nya anmälningar`}
          // title={`Nya anmälningar (${aVolunteers.length ? aVolunteers.length : 0})`}
        >
          <VolunteersTable volunteerData={aVolunteers} />
        </Tab>
        <Tab eventKey="fördelade" title={'Fördelade för att kontaktas'}>
          <VolunteersTable volunteerData={bVolunteers} />
        </Tab>
        <Tab eventKey="aktiva" title={'Aktiva i grupper'}>
          <VolunteersTable volunteerData={cVolunteers} />
        </Tab>
        <Tab eventKey="pausade" title={'Pausade'}>
          <VolunteersTable volunteerData={dVolunteers} />
        </Tab>
      </Tabs>
    </div>
  );
}
