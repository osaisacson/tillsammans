import React from 'react';
import Application from './forms/application';
import MainHeader from './../../components/MainHeader';

export default function Apply() {
  return (
    <>
      <MainHeader />
      <div className="page-layout">
        <Application />
      </div>
    </>
  );
}
