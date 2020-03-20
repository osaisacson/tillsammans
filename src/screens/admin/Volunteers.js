import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

//Components
import VolunteersTable from '../../components/tables/VolunteersTable';

export default function Volunteers() {
  const newVolunteers = [
    {
      datum: '2020-04-02',
      förnamn: 'Karin',
      efternamn: 'Hansson',
      beskrivning: 'Jag blev frisk förra veckan och skulle vilja hjälpa till.',
      email: 'karin.hansson@gmail.com',
      telefon: '0702141538',
      address: 'Näs 22',
      postkod: '47173',
      grupp: 'Egnahemsfabriken'
    },
    {
      datum: '2020-04-02',
      förnamn: 'Karin',
      efternamn: 'Hansson',
      beskrivning: 'Jag blev frisk förra veckan och skulle vilja hjälpa till.',
      email: 'karin.hansson@gmail.com',
      telefon: '0702141538',
      address: 'Näs 22',
      postkod: '47173',
      grupp: 'Egnahemsfabriken'
    }
  ];

  const activeVolunteers = [
    {
      datum: '2020-04-02',
      förnamn: 'Karin',
      efternamn: 'Hansson',
      beskrivning: 'Jag blev frisk förra veckan och skulle vilja hjälpa till.',
      email: 'karin.hansson@gmail.com',
      telefon: '0702141538',
      address: 'Näs 22',
      postkod: '47173',
      grupp: 'Egnahemsfabriken'
    },
    {
      datum: '2020-04-02',
      förnamn: 'Karin',
      efternamn: 'Hansson',
      beskrivning: 'Jag blev frisk förra veckan och skulle vilja hjälpa till.',
      email: 'karin.hansson@gmail.com',
      telefon: '0702141538',
      address: 'Näs 22',
      postkod: '47173',
      grupp: 'Egnahemsfabriken'
    },
    {
      datum: '2020-04-02',
      förnamn: 'Karin',
      efternamn: 'Hansson',
      beskrivning: 'Jag blev frisk förra veckan och skulle vilja hjälpa till.',
      email: 'karin.hansson@gmail.com',
      telefon: '0702141538',
      address: 'Näs 22',
      postkod: '47173',
      grupp: 'Egnahemsfabriken'
    }
  ];

  const inactiveVolunteers = [
    {
      datum: '2020-04-02',
      förnamn: 'Karin',
      efternamn: 'Hansson',
      beskrivning: 'Jag blev frisk förra veckan och skulle vilja hjälpa till.',
      email: 'karin.hansson@gmail.com',
      telefon: '0702141538',
      address: 'Näs 22',
      postkod: '47173',
      grupp: 'Egnahemsfabriken'
    }
  ];

  return (
    <div className="page-layout">
      <h2>Voluntärer</h2>
      <p>Sortera genom att trycka på titlarna</p>
      <Tabs defaultActiveKey="nya" id="0">
        <Tab
          eventKey="nya"
          title={`Nya voluntärer (${
            newVolunteers.length ? newVolunteers.length : 0
          })`}
        >
          <VolunteersTable volunteerData={newVolunteers} />
        </Tab>
        <Tab
          eventKey="aktiva"
          title={`Aktiva (${
            activeVolunteers.length ? activeVolunteers.length : 0
          })`}
        >
          <VolunteersTable volunteerData={activeVolunteers} />
        </Tab>
        <Tab
          eventKey="inaktiva"
          title={`Inaktiva (${
            inactiveVolunteers.length ? inactiveVolunteers.length : 0
          })`}
        >
          <VolunteersTable volunteerData={inactiveVolunteers} />
        </Tab>
      </Tabs>
    </div>
  );
}
