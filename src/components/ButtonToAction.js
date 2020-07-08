import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import firebase from "firebase/app";
import "firebase/firestore";

import FormToEmail from "./FormToEmail";

const ButtonToAction = (props) => {
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
    </div>
  );
};

export default ButtonToAction;
