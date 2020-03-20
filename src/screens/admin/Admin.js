import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

//Components
import Volunteers from './Volunteers';
import Orders from './Orders';
import Groups from './Groups';

export default function Admin() {
  return (
    <div className="page-layout">
      <Tabs variant="pills" defaultActiveKey="first" id="0">
        <Tab title="Beställningar" eventKey="first">
          <Orders />
        </Tab>
        <Tab title="Voluntärer" eventKey="second">
          <Volunteers />
        </Tab>
        <Tab title="Grupper" eventKey="third">
          <Groups />
        </Tab>
      </Tabs>
    </div>
  );
}
