import React, { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";

import firebase from "firebase/app";
import "firebase/firestore";

import Modal from "react-bootstrap/Modal";

const ButtonToAction = (props) => {
  const db = firebase.firestore();

  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [groupID, setGroupID] = useState(props.groupId);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function updateGroup() {
    setIsLoading(true);
    handleClose();
    db.collection("orders")
      .doc(props.orderId)
      .update({
        status: !groupID || groupID === "0" ? "1" : "2",
        groupId: groupID,
      })
      .then(() => {
        props.refreshAction().then(() => {
          setIsLoading(false);
        });
      });
  }

  let actionInForm = () => {
    alert("Något gick fel, försök igen!");
  };
  let statusCopy = "";
  let currentGroup = "";

  if (props.isSetGroups && props.groupId) {
    if (props.groupData) {
      currentGroup = props.groupData.find((data) => data.id === groupID);
      statusCopy =
        currentGroup && currentGroup.gruppnamn
          ? currentGroup.gruppnamn
          : "Ingen grupp ännu";
    }
    actionInForm = updateGroup;
  }

  const handleChange = (e) => {
    setGroupID(e.target.value);
    console.log("groupID: ", groupID);
  };

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
            <Modal.Header closeButton>Fördela till grupp</Modal.Header>
            <Modal.Body>
              {props.isSetGroups ? (
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
              ) : null}
              {props.isSetConfirmed ? (
                <div>
                  Har du kontaktat beställaren för att bekräfta att vi mottagit
                  beställningen och att en volontär är på väg?
                </div>
              ) : null}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={actionInForm}>
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
