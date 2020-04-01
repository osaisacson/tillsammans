import React, { useState } from 'react';

//Components
import Admin from './Admin';
import SignIn from './SignIn';

const CheckAdmin = props => {
  const [isVerified, setIsVerified] = useState('');

  const checkIfVerified = value => {
    setIsVerified(value);
  };

  if (isVerified === 'confirmed') {
    return <Admin />;
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

  return <SignIn checkIfVerified={checkIfVerified} />;
};

export default CheckAdmin;
