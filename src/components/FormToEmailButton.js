import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import firebase from "firebase/app";
import "firebase/firestore";

import FormToEmail from "../components/FormToEmail";

const FormToEmailButton = (props) => {
  const db = firebase.firestore();

  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { id, status, telefon, email, skickadBeställare } = props.formData;

  async function hasCalled() {
    setIsLoading(true);
    db.collection("orders")
      .doc(id)
      .update({
        status: "3",
      })
      .then(() => {
        props.refreshAction().then(() => {
          setIsLoading(false);
        });
      });
  }

  console.log("formData: ", props.formData);

  let statusCopy = "";
  let actionInForm;

  if (status === "1") {
    actionInForm = "sendToGroup";
  }

  if (status === "2" && email) {
    actionInForm = "sendReceipt"; //this should in when sending the form update 'skickadBeställare' to true
  }

  if (status === "2" && telefon) {
    statusCopy = `Fördelad till grupp.`; //Add name of group
    actionInForm = "sendToVolunteer";
  }

  if (status === "2" && skickadBeställare) {
    statusCopy = "Fördelad till grupp"; //Add name of group
    actionInForm = "sendToVolunteer";
  }

  if (status === "3") {
    statusCopy = "Fördelad till volontär"; //Add name of group
  }

  return (
    <div className="flex-spread">
      {isLoading ? (
        <div>...laddar</div>
      ) : (
        <>
          <div>{statusCopy}</div>
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

export default FormToEmailButton;
