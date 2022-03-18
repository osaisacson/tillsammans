import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ButtonToFormEmail = (props) => {
  const {
    isSendGroup,
    isSendToRecipient,
    isSendToVolunteer,
    actionInForm,
    formData,
    successKey,
  } = props;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let statusCopy = "";
  let buttonCopy = "";

  const isDone = formData.status === "4";
  const hasNoGroup = !formData.gruppId || formData.gruppId === "0";
  const conditionForGreen = successKey || isDone;
  const conditionForDisabled = hasNoGroup || isDone;

  const statusColor = hasNoGroup ? "red" : conditionForGreen ? `green` : `red`;

  if (isSendGroup) {
    statusCopy = hasNoGroup
      ? "Välj grupp först"
      : conditionForGreen
      ? `Skickad till grupp!`
      : `Inte skickad till grupp ännu`;
    buttonCopy = conditionForGreen ? "Skickad!" : `Skicka till grupp`;
  }

  if (isSendToRecipient) {
    statusCopy = hasNoGroup
      ? "Välj grupp först"
      : conditionForGreen
      ? actionInForm === "sendVolunteerWelcome"
        ? "Volontär välkomnad!"
        : `Bekräftelse skickad!`
      : actionInForm === "sendVolunteerWelcome"
      ? "Voluntär inte välkomnad ännu"
      : `Ingen bekräftelse skickad`;
    buttonCopy = conditionForGreen ? "Skickad!" : `Skicka bekräftelse`;
  }

  if (isSendToVolunteer) {
    statusCopy = hasNoGroup
      ? "Välj grupp först"
      : conditionForGreen
      ? `Skickad till volontär!`
      : `Ingen volontär ännu`;
    buttonCopy = conditionForGreen ? "Skickad!" : `Skicka till volontär`;
  }

  return (
    <div className="status-field">
      <>
        <div className={`status-copy ${statusColor}`}>{statusCopy}</div>
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
