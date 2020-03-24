import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Link } from 'react-router-dom';

//Components
import Volunteers from './Volunteers';
import Orders from './Orders';
import Groups from './Groups';

export default function Admin() {
  return (
    <>
      <div className="nav-pill">
        <Link to="/">Startsida</Link>
      </div>
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
    </>
  );
}
