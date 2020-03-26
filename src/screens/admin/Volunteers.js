import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import * as volunteersActions from '../../store/actions/volunteers';

//Components
import VolunteersTable from '../../components/tables/VolunteersTable';

export default function Volunteers() {
  const volunteers = useSelector(state => state.volunteers.availableVolunteers);

  const newVolunteers = volunteers.filter(data => data.status === 'ohanterad');
  const activeVolunteers = volunteers.filter(
    data => data.status === 'hanterad'
  );
  const doneVolunteers = volunteers.filter(data => data.status === 'klar');
  const inactiveVolunteers = volunteers.filter(
    data => data.status === 'inaktiv'
  );

  const dispatch = useDispatch();

  const loadVolunteers = useCallback(async () => {
    try {
      await dispatch(volunteersActions.fetchVolunteers());
    } catch (err) {
      console.log(err.message);
    }
  }, [dispatch]);

  useEffect(() => {
    loadVolunteers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="page-layout">
      <h2>Volontärer</h2>
      <p>Sortera genom att trycka på titlarna</p>
      <Tabs defaultActiveKey="nya" id="0">
        <Tab
          eventKey="nya"
          title={`Nya (${newVolunteers.length ? newVolunteers.length : 0})`}
        >
          <VolunteersTable volunteerData={newVolunteers} />
        </Tab>
        <Tab
          eventKey="kontaktada"
          title={`Kontaktade (${
            contactedVolunteers.length ? contactedVolunteers.length : 0
          })`}
        >
          <VolunteersTable volunteerData={contactedVolunteers} />
        </Tab>
        <Tab
          eventKey="aktiva"
          title={`Aktiva (${
            activeVolunteers.length ? activeVolunteers.length : 0
          })`}
        >
          <VolunteersTable volunteerData={activeVolunteers} />
        </Tab>
      </Tabs>
    </div>
  );
}
