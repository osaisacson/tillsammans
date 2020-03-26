import React from 'react';

//Components
import VolunteerForm from './forms/VolunteerForm';

export default function Volunteer() {
  return (
    <>
      <h6 className="form-title">BLI VOLONTÄR</h6>
      <div className="page-layout dark-page">
        <VolunteerForm />
      </div>
    </>
  );
}
