import React, { useState, useEffect } from 'react';

import FormInput from '../../components/FormInput';
import CustomButton from '../../components/CustomButton';

import firebase from 'firebase/app';
import 'firebase/firestore';

const SignIn = props => {
  const firestore = firebase.firestore();

  const [adminData, setAdminData] = useState();
  const [loginName, setLoginName] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  useEffect(() => {
    firestore
      .collection('admin')
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          const resData = doc.data();
          setAdminData(resData);
        });
      });
  }, [firestore]);

  const handleSubmit = event => {
    event.preventDefault();
    const isVerified =
      loginName === adminData.adminName && loginPassword === adminData.adminPwd;
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
