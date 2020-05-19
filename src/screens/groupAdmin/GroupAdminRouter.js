import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import firebase from 'firebase/app';
import GroupAdmin from './GroupAdmin';
import AccessDenied from '../../components/AccessDenied';

const GroupAdminRouter = () => {

  // Checks the type of admin that is logged in and allows main admins to access any group admin page
  // and group admins to only access their own group's page.

  const { groupId } = useParams();
  const [isLoadingClaims, setisLoadingClaims] = useState(true);
  const [isAdmin, setisAdmin] = useState(false);
  const [groupAdmin, setgroupAdmin] = useState("");

  useEffect(() => {
    firebase.auth().currentUser.getIdTokenResult()
      .then((idTokenResult) => {
        // Check if user is a main admin
        if (!!idTokenResult.claims.admin) {
          setisAdmin(true);
        }

        // Check if user is a group admin
        if (idTokenResult.claims.groupAdmin) {
          setgroupAdmin(idTokenResult.claims.groupAdmin)
        }
        setisLoadingClaims(false);
      })
      .catch((error) => {
        console.log(error);
        setisLoadingClaims(false);
      });
  }, []);

  return (
    isLoadingClaims ? <LoadingMessage /> :
      (isAdmin ?
        <GroupAdmin groupId={groupId} /> :
        ((groupAdmin && (groupAdmin === groupId)) ? <GroupAdmin groupId={groupAdmin} /> : <AccessDenied />))
  )

}

const LoadingMessage = () => {
  return (
    <div className="page-layout centered">
      <h3>Please wait</h3>
      <p>
        We are loading your admin panel.
        </p>
    </div>
  )
}

export default GroupAdminRouter;