import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

//Components
import GroupTable from './../../components/items/GroupTable';

export default function Groups() {
  return (
    <div className="page-layout">
      <h2>Grupper</h2>
      <p>Här ska det vara en lista på grupper</p>
      <Tabs defaultActiveKey="nya" id="0">
        <Tab eventKey="nya" title="Nya grupper">
          <GroupTable />
        </Tab>
        <Tab eventKey="aktiva" title="Aktiva">
          <p>Aktiva grupper</p>
        </Tab>
        <Tab eventKey="inaktiva" title="Inaktiva">
          <p>Inaktiva grupper</p>
        </Tab>
      </Tabs>
    </div>
  );
}
