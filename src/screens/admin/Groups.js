import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

//Components
import GroupTable from '../../components/tables/GroupTable';

export default function Groups() {
  const newGroups = [
    {
      title: 'XGruppen',
      contact: 'Xavier Mes',
      phone: '070334591',
      email: 'xavier.mes@yahoo.se'
    }
  ];

  const activeGroups = [
    {
      title: 'Egnahemsfabriken',
      contact: 'Anna Berglund',
      phone: '0703248591',
      email: 'anna.berglund@egnahemsfabriken.se'
    },
    {
      title: 'Svenska Kyrkan Tjörn',
      contact: 'Björn Borg',
      phone: '0739029381',
      email: 'bjorn.borg@svenskakyrkan.se'
    },
    {
      title: 'Almö gård',
      contact: 'Annika Lantz',
      phone: '0702455627',
      email: 'annika.lantz@almogard.se'
    }
  ];

  const inactiveGroups = [
    {
      title: 'Näsgruppen',
      contact: 'Åsa Isacson',
      phone: '0701438591',
      email: 'asa@gmail.com'
    }
  ];

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
