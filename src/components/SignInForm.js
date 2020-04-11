import React from 'react';

import FormInput from '../components/FormInput';
import Button from 'react-bootstrap/Button';

const SignInForm = props => {
  return (
    <div className="sign-in page-layout">
      {props.topHeader ? <h6>{props.topHeader}</h6> : null}
      <h2>{props.header}</h2>

      <form onSubmit={props.handleSubmit}>
        <FormInput
          name="adminNamn"
          type="text"
          handleChange={props.handleChange}
          value={props.loginName}
          label="Administratörsnamn"
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
      </form>
    </div>
  );
};

export default SignInForm;
