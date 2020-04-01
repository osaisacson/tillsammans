import React, { useState } from 'react';

import FormInput from '../../components/FormInput';
import CustomButton from '../../components/CustomButton';

const SignIn = props => {
  const [loginName, setLoginName] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    const isVerified =
      loginName === process.env.REACT_APP_LOGIN_NAME &&
      loginPassword === process.env.REACT_APP_LOGIN_KEY;

    isVerified
      ? props.checkIfVerified('confirmed')
      : props.checkIfVerified('wrong credentials');
  };

  const handleChange = event => {
    const { value, name } = event.target;
    if (name === 'adminName') {
      setLoginName(value);
    }
    if (name === 'password') {
      setLoginPassword(value);
    }
  };

  return (
    <div className="sign-in page-layout">
      <h2>Logga in som admin</h2>

      <form onSubmit={handleSubmit}>
        <FormInput
          name="adminName"
          type="text"
          handleChange={handleChange}
          value={loginName}
          label="Administratörsnamn"
          required
        />
        <FormInput
          name="password"
          type="password"
          value={loginPassword}
          handleChange={handleChange}
          label="Lösenord"
          required
        />
        <div className="buttons">
          <CustomButton type="submit"> Logga in som admin </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
