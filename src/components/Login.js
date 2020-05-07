
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { loginUser } from "../store/actions";

import SignInForm from './SignInForm';

class Login extends Component {
  state = { email: "", password: "" };

  handleChange = (event) => {
    event.preventDefault();
    const { value, name } = event.target;
    if (name === 'adminNamn') {
      this.setState({ email: value});
    }
    if (name === 'password') {
      this.setState({ password: value})
    }
  };

  handleSubmit = (event) => {
      event.preventDefault();
    const { dispatch } = this.props;
    const { email, password } = this.state;

    dispatch(loginUser(email, password));
  };

  render() {
    const { loginError, isAuthenticated } = this.props;

    if (isAuthenticated) {
      return <Redirect to="/admin" />;
    } else {
      return (
        <SignInForm
        header={'Logga in som admin'}
        loginName={this.state.email}
        loginPassword={this.state.password}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
      />
      );
    }
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