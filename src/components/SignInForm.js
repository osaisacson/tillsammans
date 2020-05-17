import React from 'react';

import FormInput from '../components/FormInput';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const SignInForm = props => {
  return (
    <div className="sign-in page-layout">
      {props.topHeader ? <h6>{props.topHeader}</h6> : null}
      <h2>{props.header}</h2>

      <form onSubmit={props.handleSubmit}>
        <p>{props.loginError ? props.errorMessage : ""}</p>
        <FormInput
          name="email"
          type="text"
          handleChange={props.handleChange}
          value={props.loginName}
          label="E-mail"
          required
        />
        <FormInput
          name="password"
          type="password"
          value={props.loginPassword}
          handleChange={props.handleChange}
          label="Lösenord"
          required
        />
        <Button type="submit" block>
          Logga in
        </Button>
        <br />
        <Link to="/resetpassword">
          <Button block>Glömde mitt lösenord</Button>
        </Link>
      </form>
    </div>
  );
};

export default SignInForm;
