import React, { useState, useEffect } from 'react';

import SignInForm from '../../components/SignInForm';

import firebase from 'firebase/app';
import 'firebase/firestore';

const SignIn = (props) => {
  const firestore = firebase.firestore();

  //Set up hooks
  const [adminData, setAdminData] = useState();
  const [loginName, setLoginName] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  useEffect(() => {
    firestore
      .collection('admin')
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          const resData = doc.data();
          setAdminData(resData);
        });
      });
  }, [firestore]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const isVerified =
      loginName === adminData.adminNamn && loginPassword === adminData.adminPwd;
    isVerified
      ? props.checkIfVerified('confirmed')
      : props.checkIfVerified('wrong credentials');
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    if (name === 'adminNamn') {
      setLoginName(value);
    }
    if (name === 'password') {
      setLoginPassword(value);
    }
  };

  return (
    <SignInForm
      header={'Logga in som admin'}
      loginName={loginName}
      loginPassword={loginPassword}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
    />
  );
};

export default SignIn;
