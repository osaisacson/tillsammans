import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import VolunteersDummyData from './../../DummyData/VolunteersDummyData';

//Components
import VolunteersTable from '../../components/tables/VolunteersTable';

export default function Volunteers() {
  const newVolunteers = VolunteersDummyData.filter(
    data => data.status === 'ny'
  );

  const contactedVolunteers = VolunteersDummyData.filter(
    data => data.status === 'kontaktad'
  );

  const activeVolunteers = VolunteersDummyData.filter(
    data => data.status === 'aktiv'
  );

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
