import React, { useState, useEffect } from 'react';

//Components
import SignInForm from '../../components/SignInForm';

//Models
import AdminGroup from '../../models/adminGroup';

//Firebase
import firebase from 'firebase/app';
import 'firebase/firestore';

const GroupSignIn = props => {
  const firestore = firebase.firestore();

  //Set up hooks
  const [loginName, setLoginName] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [data, setData] = useState({
    finalAdminData: []
  });

  useEffect(() => {
    async function getAdminData() {
      const loadedAdminData = [];
      const querySnapshot = await firestore.collection('groups').get();
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        const resData = doc.data();

        loadedAdminData.push(
          new AdminGroup(
            doc.id,
            resData.gruppnamn,
            resData.adminNamn,
            resData.adminPwd
          )
        );
      });

      //Only get the admin data which match our current group id
      const currAdminGroupData = loadedAdminData.filter(
        data => data.id === props.groupId
      );
      setData({
        finalAdminData: currAdminGroupData[0]
      });
    }
    getAdminData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    const isVerified =
      loginName === data.finalAdminData.adminNamn &&
      loginPassword === data.finalAdminData.adminPwd;
    isVerified
      ? props.checkIfVerified('confirmed')
      : props.checkIfVerified('wrong credentials');
  };

  const handleChange = event => {
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
      topHeader={data.finalAdminData.gruppnamn}
      header={'Gruppsida - admin'}
      loginName={loginName}
      loginPassword={loginPassword}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
    />
  );
};

export default GroupSignIn;
