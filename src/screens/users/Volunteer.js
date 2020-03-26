import React from 'react';

//Components
import VolunteerForm from './forms/VolunteerForm';

export default function Volunteer() {
  return (
    <>
      <div className="page-layout dark-page">
        <h6 className="form-title">BLI VOLONTÄR</h6>
        <VolunteerForm />
      </div>
    </>
  );
}
