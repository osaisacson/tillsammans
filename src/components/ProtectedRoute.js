import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import MainAdminOnly from './MainAdminOnly';

const ProtectedRoute = ({
  component: Component,
  isAuthenticated,
  isVerifying,
  mainAdminOnly,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      isVerifying ? (
        <div />
      ) : isAuthenticated ? (
        mainAdminOnly ?
        <MainAdminOnly {...props} component={Component} /> : <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      )
    }
  />
);
export default ProtectedRoute;
