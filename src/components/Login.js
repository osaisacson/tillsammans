
import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { loginUser } from "../store/actions";

import SignInForm from './SignInForm';

function Login(props) {

  let history = useHistory();
  let location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (event) => {
    event.preventDefault();
    const { value, name } = event.target;
    if (name === 'email') {
      setEmail(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { dispatch } = props;

    dispatch(loginUser(email, password));
  };

  const { loginError, isAuthenticated } = props;

  if (isAuthenticated) {
    // if successfully logged in, send user back to the route they want to access
    let { from } = location.state || { from: { pathname: "/" }};
    return <Redirect to={from} />
  } else {
    return (
      // render sign in form if not logged in
      <SignInForm
        header={'Logga in som admin'}
        loginName={email}
        loginPassword={password}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
    );
  }

}

function mapStateToProps(state) {
  return {
    isLoggingIn: state.auth.isLoggingIn,
    loginError: state.auth.loginError,
    isAuthenticated: state.auth.isAuthenticated
  };
}

export default connect(mapStateToProps)(Login);