import React from 'react';

//Components
import HelpForm from './forms/HelpForm';
import MainHeader from './../../components/MainHeader';

export default function Apply() {
  return (
    <>
      <MainHeader />
      <div className="page-layout dark-page">
        <HelpForm />
      </div>
    </>
  );
}
