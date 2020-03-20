import React from 'react';

//Components
import VolunteerForm from './forms/VolunteerForm';
import MainHeader from './../../components/MainHeader';

export default function Volunteer() {
  return (
    <>
      <MainHeader />
      <h6 className="form-title">BLI VOLUNTÄR</h6>
      <div className="page-layout">
        <VolunteerForm />
      </div>
    </>
  );
}
