import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import GroupsDummyData from './../../DummyData/GroupsDummyData';

//Components
import GroupTable from '../../components/tables/GroupTable';

const newGroups = GroupsDummyData.filter(data => data.status === 'ny');

const activeGroups = GroupsDummyData.filter(data => data.status === 'aktiv');

const inactiveGroups = GroupsDummyData.filter(
  data => data.status === 'inaktiv'
);

export default function Groups() {
  return (
    <div className="page-layout">
      <h2>Grupper</h2>
      <p>Sortera genom att trycka på titlarna</p>
      <Tabs defaultActiveKey="nya" id="0">
        <Tab
          eventKey="nya"
          title={`Nya grupper (${newGroups.length ? newGroups.length : 0})`}
        >
          <GroupTable groupData={newGroups} />
        </Tab>
        <Tab
          eventKey="aktiva"
          title={`Aktiva (${activeGroups.length ? activeGroups.length : 0})`}
        >
          <GroupTable groupData={activeGroups} />
        </Tab>
        <Tab
          eventKey="inaktiva"
          title={`Inaktiva (${
            inactiveGroups.length ? inactiveGroups.length : 0
          })`}
        >
          <GroupTable groupData={inactiveGroups} />
        </Tab>
      </Tabs>
    </div>
  );
}
