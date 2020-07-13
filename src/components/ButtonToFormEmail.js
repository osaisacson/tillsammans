import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import FormToEmail from "./FormToEmail";

const ButtonToFormEmail = (props) => {
  const {
    isSendGroup,
    isSendToRecipient,
    isSendToVolunteer,
    actionInForm,
    formData,
    groupData,
    refreshAction,
    successKey,
  } = props;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let statusCopy = "";
  let buttonCopy = "";

  const conditionForGreen = successKey;
  const hasNoGroup = !formData.gruppId || formData.gruppId === "0";
  const conditionForDisabled = hasNoGroup;

  if (isSendGroup) {
    statusCopy = hasNoGroup
      ? "Välj grupp först"
      : successKey
      ? `Skickad till grupp`
      : `Inte skickad till grupp ännu`;
    buttonCopy = successKey ? "Skicka igen" : `Skicka till grupp`;
  }

  if (isSendToRecipient) {
    statusCopy = hasNoGroup
      ? "Välj grupp först"
      : successKey
      ? `Bekräftelse skickad`
      : `Ingen bekräftelse skickad`;
    buttonCopy = successKey ? "Skicka igen" : `Skicka bekräftelse`;
  }

  if (isSendToVolunteer) {
    statusCopy = hasNoGroup
      ? "Välj grupp först"
      : successKey
      ? `Skickad till volontär`
      : `Ingen volontär ännu`;
    buttonCopy = successKey ? "Skicka igen" : `Skicka till volontär`;
  }

  return (
    <div className="status-field">
      <>
        <div>{statusCopy}</div>
        <Button
          disabled={conditionForDisabled}
          className={`form-to-email-button ${
            conditionForGreen ? "green" : "red"
          }`}
          onClick={handleShow}
        >
          {buttonCopy}
        </Button>
      </>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <FormToEmail
            actionInForm={actionInForm}
            formData={formData}
            groupData={groupData}
            refreshAction={refreshAction}
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
