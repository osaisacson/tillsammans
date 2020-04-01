import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

//Components
import Volunteers from './Volunteers';
import Orders from './Orders';
import Groups from './Groups';

const Admin = props => {
  return (
    <div className="page-layout">
      <Tabs variant="pills" defaultActiveKey="first" id="0">
        <Tab title="Beställningar" eventKey="first">
          <Orders />
        </Tab>
        <Tab title="Volontärer" eventKey="second">
          <Volunteers />
        </Tab>
        <Tab title="Grupper" eventKey="third">
          <Groups />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Admin;
