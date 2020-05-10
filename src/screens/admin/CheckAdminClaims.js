import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import Admin from './Admin';
import AccessDenied from './AccessDenied';

const CheckAdminClaims = () => {

    const [isAdmin, setisAdmin] = useState(false);

    useEffect(() => {
        firebase.auth().currentUser.getIdTokenResult()
            .then((idTokenResult) => {
                // Confirm the user is an Admin.
                if (!!idTokenResult.claims.admin) {
                    setisAdmin(true);
                } else {
                    setisAdmin(false);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    });

    return(
         isAdmin ? <Admin /> : <AccessDenied />
    )

}

export default CheckAdminClaims;