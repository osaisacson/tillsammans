import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import GroupsDummyData from './../../DummyData/GroupsDummyData';

//Components
import GroupTable from './GroupTable';

const Groups = props => {
  //Group subsets
  const newGroups = GroupsDummyData.filter(data => data.status === 'ny');
  const activeGroups = GroupsDummyData.filter(data => data.status === 'aktiv');
  const inactiveGroups = GroupsDummyData.filter(
    data => data.status === 'inaktiv'
  );

  return (
    <div className="page-layout">
      <h2>Grupper</h2>
      <p>Sortera genom att trycka på titlarna</p>
      <Tabs defaultActiveKey="nya" id="0">
        <Tab eventKey="nya" title={'Nya grupper'}>
          <GroupTable groupData={newGroups} />
        </Tab>
        <Tab eventKey="aktiva" title={'Aktiva'}>
          <GroupTable groupData={activeGroups} />
        </Tab>
        <Tab eventKey="inaktiva" title={'Inaktiva '}>
          <GroupTable groupData={inactiveGroups} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Groups;
