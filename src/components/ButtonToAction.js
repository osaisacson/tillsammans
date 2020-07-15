import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import FormInput from "./FormInput";
import ReactHtmlParser from "react-html-parser";

import moment from "moment";

import firebase from "firebase/app";
import "firebase/firestore";

import Modal from "react-bootstrap/Modal";

const ButtonToAction = (props) => {
  let conditionForGreen;
  let conditionForDisabled;
  let fieldsToUpdate;
  let localStatusCopy = "";
  let currentGroup = "";
  let buttonCopy = "";
  let statusCopy = "";
  let statusColor;
  let modalTitle;
  let modalContent;

  const {
    isOrder,
    isVolunteer,
    isFiker,
    isGroup,
    isSetGroups,
    isSetConfirmed,
    isSetReady,
    isEditComments,
    isToggleActive,
    groupData,
    refreshAction,
    successKey,
  } = props;

  const { status, email, telefon, gruppId, id, kommentarer } = props.formData;

  const db = firebase.firestore();

  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [groupID, setGroupID] = useState(gruppId ? gruppId : "");
  const [signature, setSignature] = useState("");
  const [comments, setComments] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (event) => {
    const { value, name } = event.target;
    if (name === "groupID") {
      setGroupID(value);
    }
    if (name === "comments") {
      setComments(value);
    }
    if (name === "signature") {
      setSignature(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setComments("");
    dbUpdate();
  };

  const collectionToUpdate = isOrder
    ? "orders"
    : isVolunteer
    ? "volunteers"
    : isFiker
    ? "fika"
    : isGroup
    ? "groups"
    : null;

  async function dbUpdate() {
    setIsLoading(true);
    handleClose();
    db.collection(collectionToUpdate)
      .doc(id)
      .update(fieldsToUpdate)
      .then(() => {
        refreshAction().then(() => {
          setIsLoading(false);
        });
      });
  }

  //Actions if the button action is to set/change a group
  if (isSetGroups && gruppId) {
    if (groupData) {
      currentGroup = groupData.find((data) => data.id === groupID);
      localStatusCopy =
        currentGroup && currentGroup.gruppnamn
          ? currentGroup.gruppnamn
          : "Ingen grupp ännu";
    }
    conditionForGreen = groupData && groupData !== "0";
    buttonCopy = gruppId && gruppId !== "0" ? "Välj annan grupp" : "Välj grupp";
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
        {groupData.map((item) => {
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
      gruppId: groupID,
    };
  }

  //Actions if the button action is to set the order status as ready
  if (isSetConfirmed) {
    conditionForGreen = successKey;
    conditionForDisabled =
      !gruppId || gruppId === "0" || status === "1" || successKey;
    statusCopy =
      !gruppId || gruppId === "0"
        ? "Välj grupp först"
        : status === "1"
        ? "Skicka till grupp först"
        : successKey
        ? "Beställning bekräftad"
        : !email && telefon
        ? `Bekräfta via ${telefon}`
        : "Ingen email eller telefon";
    statusColor =
      !gruppId || gruppId === "0"
        ? "red"
        : status === "1"
        ? "red"
        : successKey
        ? "green"
        : !email && telefon
        ? "red"
        : "Ingen email eller telefon";
    buttonCopy = successKey ? "Beställare uppringd" : "Klicka när kontaktad";
    modalTitle = "Markera beställningen som bekräftad";
    modalContent =
      "Har du kontaktat beställaren för att bekräfta att vi mottagit beställningen och att en volontär är på väg?";
    fieldsToUpdate = {
      skickadBeställare: true,
    };
  }

  //Actions if the button action is to set the order status as ready
  if (isSetReady) {
    conditionForGreen = status === "4";
    conditionForDisabled = !gruppId || gruppId === "0" || status === "4";
    statusCopy =
      !gruppId || gruppId === "0"
        ? "Välj grupp först"
        : status === "4"
        ? "Beställningen utförd"
        : "Inte utförd ännu";

    statusColor =
      !gruppId || gruppId === "0" ? "red" : status === "4" ? "green" : "red";

    buttonCopy = status === "4" ? "Klar!" : "Klicka när klar";
    modalTitle = "Markera beställningen som klar";
    modalContent =
      "Har du bekräftat att beställningen är utförd och vill markera den som klar i systemet? Du kan inte ångra det efteråt.";
    fieldsToUpdate = {
      status: "4",
    };
  }

  if (isToggleActive) {
    conditionForGreen = status === "4";
    conditionForDisabled = !gruppId || gruppId === "0";
    statusCopy =
      !gruppId || gruppId === "0"
        ? "Välj grupp först"
        : status === "4"
        ? "Satt som aktiv"
        : "Klicka för att ändra till aktiv";
    statusColor =
      !gruppId || gruppId === "0" ? "red" : status === "4" ? "green" : "red";

    buttonCopy = status === "4" ? "Aktiv" : "Inte aktiv";
    modalTitle = "Sätt volontären som 'aktiv'";
    modalContent =
      status === "4"
        ? "Vill du sätta volontären som 'inte aktiv' i systemet?"
        : "Har du bekräftat att volontären har blivit välkomnad och tränad och är redo att bli satt som 'aktiv' i systemet?";
    fieldsToUpdate = {
      status: status === "4" ? "5" : "4",
    };
  }

  if (isEditComments) {
    buttonCopy = "Kommentera";
    modalTitle = "Kommentarer";
    modalContent = (
      <>
        <form onSubmit={handleSubmit}>
          <div>{ReactHtmlParser(kommentarer)}</div>
          <FormInput
            autoComplete="off"
            name="comments"
            type="textarea"
            handleChange={handleChange}
            value={comments}
            label="Kommentar"
            required
          />
          <FormInput
            autoComplete="off"
            name="signature"
            type="text"
            handleChange={handleChange}
            value={signature}
            label="Ditt namn"
            required
          />
          <Button type="submit" block>
            Spara kommentarer
          </Button>
        </form>
      </>
    );
    fieldsToUpdate = {
      kommentarer: `${kommentarer}
          ${moment(new Date())
            .locale("sv")
            .format("YYYY-MM-DD HH:MM")}: <i>${comments}
          /${signature}</i> <br/><br/>`,
    };
  }

  return (
    <div className={isEditComments ? "flex-spread" : "status-field"}>
      {isLoading ? (
        <div>...sparar</div>
      ) : (
        <>
          <div className={`status-copy ${statusColor}`}>
            {statusCopy ? statusCopy : localStatusCopy}
          </div>
          <Button
            disabled={conditionForDisabled}
            className={`form-to-email-button ${
              conditionForGreen ? "green" : "red"
            }`}
            onClick={handleShow}
          >
            {buttonCopy}
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>{modalTitle}</Modal.Header>
            <Modal.Body>{modalContent}</Modal.Body>
            {isEditComments ? null : (
              <Modal.Footer>
                <Button variant="primary" onClick={dbUpdate}>
                  Ja, spara
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                  Stäng
                </Button>
              </Modal.Footer>
            )}
          </Modal>
        </>
      )}
    </div>
  );
};

export default ButtonToAction;
