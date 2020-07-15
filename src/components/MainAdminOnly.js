import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import AccessDenied from "./AccessDenied";

const MainAdminOnly = ({ component: Component }) => {
  // Higher order component that ensures the user trying to access a given component
  // is a main admin.

  const [isAdmin, setIsAdmin] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    firebase
      .auth()
      .currentUser.getIdTokenResult()
      .then((idTokenResult) => {
        // Confirm the user is an main admin.
        if (!!idTokenResult.claims.admin) {
          setIsAdmin(true);
        }
        setIsChecking(false);
      })
      .catch((error) => {
        console.log(error);
        setIsChecking(false);
      });
  }, []);

  return isChecking ? (
    <LoadingMessage />
  ) : isAdmin ? (
    <Component />
  ) : (
    <AccessDenied />
  );
};

const LoadingMessage = () => {
  return (
    <div className="page-layout centered">
      <h3>Var vänlig vänta</h3>
      <p>Sidan laddas...</p>
    </div>
  );
};

export default MainAdminOnly;
