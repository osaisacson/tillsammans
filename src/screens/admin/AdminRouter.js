import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import Admin from './Admin';
import GroupAdmin from '../groupAdmin/GroupAdmin';
import AccessDenied from '../../components/AccessDenied';

const AdminRouter = () => {
  // Checks the type of admin (main vs group) and renders appropriate admin page

  const [isLoadingClaims, setisLoadingClaims] = useState(true);
  const [isAdmin, setisAdmin] = useState(false);
  const [groupAdmin, setgroupAdmin] = useState('');

  useEffect(() => {
    firebase
      .auth()
      .currentUser.getIdTokenResult()
      .then((idTokenResult) => {
        // Check if user is a main admin
        if (!!idTokenResult.claims.admin) {
          setisAdmin(true);
        }

        // Check if user is a group admin and if so, retrieves the group ID
        if (idTokenResult.claims.groupAdmin) {
          setgroupAdmin(idTokenResult.claims.groupAdmin);
        }
        setisLoadingClaims(false);
      })
      .catch((error) => {
        console.log(error);
        setisLoadingClaims(false);
      });
  }, []);

  return isLoadingClaims ? (
    <LoadingMessage />
  ) : isAdmin ? (
    <Admin />
  ) : groupAdmin ? (
    <GroupAdmin groupId={groupAdmin} />
  ) : (
    <AccessDenied />
  );
};

const LoadingMessage = () => {
  return (
    <div className="page-layout centered">
      <h3>Var snäll och vänta</h3>
      <p>Adminpanelen laddas</p>
    </div>
  );
};

export default AdminRouter;
