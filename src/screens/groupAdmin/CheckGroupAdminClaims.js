import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import firebase from 'firebase/app';
import GroupAdmin from '../groupAdmin/GroupAdmin';
import AccessDenied from './AccessDenied';

const CheckGroupAdminClaims = () => {
    
    const { groupId } = useParams();
    const [isLoadingClaims, setisLoadingClaims] = useState(true);
    const [isAdmin, setisAdmin] = useState(false);
    const [groupAdmin, setgroupAdmin] = useState("");

    useEffect(() => {
        firebase.auth().currentUser.getIdTokenResult()
            .then((idTokenResult) => {
                // Confirm the user is an Admin.
                if (!!idTokenResult.claims.admin) {
                    setisAdmin(true);
                } 
                if(idTokenResult.claims.groupAdmin) {
                    setgroupAdmin(idTokenResult.claims.groupAdmin)
                } 
                setisLoadingClaims(false);
            })
            .catch((error) => {
                console.log(error);
                setisLoadingClaims(false);
            });
    });

    return(
         isLoadingClaims ? <LoadingMessage /> :
            (isAdmin ? 
                <GroupAdmin groupId={groupId} /> : 
                    ((groupAdmin && (groupAdmin === groupId)) ?  <GroupAdmin groupId={groupAdmin} /> : <AccessDenied />))
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

export default CheckGroupAdminClaims;