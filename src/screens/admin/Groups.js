import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import GroupsDummyData from './../../DummyData/GroupsDummyData';

//Components
import Table from './Table';

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
          <Table isGroups={true} tableData={newGroups} />
        </Tab>
        <Tab eventKey="aktiva" title={'Aktiva'}>
          <Table isGroups={true} tableData={activeGroups} />
        </Tab>
        <Tab eventKey="inaktiva" title={'Inaktiva '}>
          <Table isGroups={true} tableData={inactiveGroups} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Groups;
