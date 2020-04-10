import React, { useState } from 'react';

//Components
import GroupAdmin from '../groupAdmin/GroupAdmin';
import GroupSignIn from '../groupAdmin/GroupSignIn';

const CheckGroupAdmin = ({ match }) => {
  //Get id of group as passed via params in Table.js
  const {
    params: { groupId }
  } = match;

  //Set state
  const [isVerified, setIsVerified] = useState('');

  const checkIfVerified = value => {
    setIsVerified(value);
  };

  if (isVerified === 'confirmed') {
    return <GroupAdmin groupId={groupId} />;
  }

  if (isVerified === 'wrong credentials') {
    return (
      <div className="page-layout centered">
        <h3>Fel admindetaljer</h3>
        <p>
          Kontakta tjorn@allatillsammans.se om du glömt ditt användarnamn och
          lösenord
        </p>
      </div>
    );
  }

  return <GroupSignIn groupId={groupId} checkIfVerified={checkIfVerified} />;
};

export default CheckGroupAdmin;
