import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import FormToEmail from "./FormToEmail";

const ButtonToFormEmail = (props) => {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { id, status, telefon, email, skickadBeställare } = props.formData;

  console.log("formData: ", props.formData);

  let actionInForm;

  if (status === "1") {
    actionInForm = "sendToGroup";
  }

  if (status === "2" && email) {
    actionInForm = "sendReceipt"; //this should in when sending the form update 'skickadBeställare' to true
  }

  if (status === "2" && telefon) {
    actionInForm = "sendToVolunteer";
  }

  if (status === "2" && skickadBeställare) {
    actionInForm = "sendToVolunteer";
  }

  return (
    <div className="status-field">
      {isLoading ? (
        <div>...laddar</div>
      ) : (
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
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <FormToEmail actionInForm={actionInForm} formData={props.formData} />
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
