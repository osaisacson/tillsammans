import React from "react";
import { Button } from "react-bootstrap";
import FormInput from "./FormInput";

const ChangePasswordForm = ({
  topHeader,
  header,
  message,
  handleSubmit,
  handleChange,
  newPassword,
  confirmPassword,
}) => {
  return (
    <div className="sign-in page-layout">
      {topHeader ? <h6>{topHeader}</h6> : null}
      <h2>{header}</h2>
      <p>{message}</p>

      <form onSubmit={handleSubmit}>
        <FormInput
          name="newPassword"
          type="password"
          handleChange={handleChange}
          value={newPassword}
          label="nytt lösenord"
          required
        />
        <FormInput
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          handleChange={handleChange}
          label="bekräfta lösenord"
          required
        />
        <Button type="submit" block>
          ändra
        </Button>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
