import React from 'react';
import { Button } from 'react-bootstrap';
import FormInput from './FormInput';

const ChangePasswordForm = (props) => {
  return (
    <div className="sign-in page-layout">
      {props.topHeader ? <h6>{props.topHeader}</h6> : null}
      <h2>{props.header}</h2>
      <p>{props.message}</p>

      <form onSubmit={props.handleSubmit}>
        <FormInput
          name="newPassword"
          type="password"
          handleChange={props.handleChange}
          value={props.newPassword}
          label="nytt lösenord"
          required
        />
        <FormInput
          name="confirmPassword"
          type="password"
          value={props.confirmPassword}
          handleChange={props.handleChange}
          label="bekräfta lösenord"
          required
        />
        <Button type="submit" block>
          ändra
                </Button>
      </form>
    </div>
  )
}

export default ChangePasswordForm;