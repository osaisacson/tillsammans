import React, { useState } from "react";

import Button from "react-bootstrap/Button";

import firebase from "firebase/app";
import "firebase/firestore";

import Modal from "react-bootstrap/Modal";

const ButtonToAction = (props) => {
  let fieldsToUpdate;
  let statusCopy = "";
  let currentGroup = "";
  let modalTitle;
  let modalContent;

  const db = firebase.firestore();

  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [groupID, setGroupID] = useState(props.groupId);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function dbUpdate() {
    setIsLoading(true);
    handleClose();
    db.collection("orders")
      .doc(props.orderId)
      .update(fieldsToUpdate)
      .then(() => {
        props.refreshAction().then(() => {
          setIsLoading(false);
        });
      });
  }

  const handleChange = (e) => {
    setGroupID(e.target.value);
    console.log("groupID: ", groupID);
  };

  //Actions if the button action is to set/change a group
  if (props.isSetGroups && props.groupId) {
    if (props.groupData) {
      currentGroup = props.groupData.find((data) => data.id === groupID);
      statusCopy =
        currentGroup && currentGroup.gruppnamn
          ? currentGroup.gruppnamn
          : "Ingen grupp ännu";
    }
    modalTitle = "Fördela till grupp";
    modalContent = (
      <>
        <div className="form-check" key={"0"}>
          <label>
            <input
              type="radio"
              name={"groupID"}
              value={"0"}
              checked={!groupID || groupID === "0"}
              className="form-check-input"
              onChange={handleChange}
            />
            Ingen grupp
          </label>
        </div>
        {props.groupData.map((item) => {
          return (
            <div className="form-check" key={item.id}>
              <label>
                <input
                  type="radio"
                  name={"groupID"}
                  value={item.id}
                  checked={groupID === item.id}
                  className="form-check-input"
                  onChange={handleChange}
                />
                {item.gruppnamn}
              </label>
            </div>
          );
        })}
      </>
    );
    fieldsToUpdate = {
      skickadGrupp: true,
      status: !groupID || groupID === "0" ? "1" : "2",
      groupId: groupID,
    };
  }

  //Actions if the button action is to set the order status as ready
  if (props.isSetConfirmed) {
    modalTitle = "Markera beställningen som bekräftad";
    modalContent =
      "Har du kontaktat beställaren för att bekräfta att vi mottagit beställningen och att en volontär är på väg?";
    fieldsToUpdate = {
      skickadBeställare: true,
      status: "3",
    };
  }

  //Actions if the button action is to set the order status as ready
  if (props.isSetReady) {
    modalTitle = "Markera beställningen som klar";
    modalContent =
      "Har du bekräftat att beställningen är utförd och vill markera den som klar i systemet? Du kan inte ångra det efteråt.";
    fieldsToUpdate = {
      status: "4",
    };
  }

  return (
    <div className="status-field">
      {isLoading ? (
        <div>...sparar</div>
      ) : (
        <>
          <div>{props.statusCopy ? props.statusCopy : statusCopy}</div>
          <Button
            disabled={props.conditionForDisabled}
            className={`form-to-email-button ${
              props.conditionForGreen ? "green" : "red"
            }`}
            onClick={handleShow}
          >
            {props.buttonCopy}
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>{modalTitle}</Modal.Header>
            <Modal.Body>{modalContent}</Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={dbUpdate}>
                Ja, spara
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Stäng
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </div>
  );
};

export default ButtonToAction;
