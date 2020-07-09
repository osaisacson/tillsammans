import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import FormToEmail from "./FormToEmail";

const ButtonToFormEmail = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="status-field">
      <>
        <div>{props.statusCopy}</div>
        <Button
          disabled={props.conditionForDisabled}
          className={`form-to-email-button ${
            props.conditionForGreen ? "green" : "red"
          }`}
          onClick={handleShow}
        >
          {props.buttonCopy}
        </Button>
      </>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <FormToEmail
            actionInForm={props.actionInForm}
            formData={props.formData}
            groupData={props.groupData}
            refreshAction={props.refreshAction}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Stäng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ButtonToFormEmail;
