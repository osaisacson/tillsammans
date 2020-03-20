import React from 'react';

//Components
import VolunteerForm from './forms/VolunteerForm';
import MainHeader from './../../components/MainHeader';

export default function Volunteer() {
  return (
    <>
      <MainHeader />
      <div className="page-layout">
        <h5 className="centered">Bli Voluntär</h5>

        <VolunteerForm />
      </div>
    </>
  );
}
