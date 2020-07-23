import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import FormInput from "./FormInput";
import ReactHtmlParser from "react-html-parser";

import moment from "moment";

import firebase from "firebase/app";
import "firebase/firestore";

import Modal from "react-bootstrap/Modal";

const ButtonToAction = ({
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
  formData,
  refreshAction,
  successKey,
}) => {
  const { status, email, telefon, gruppId, id, kommentarer } = formData;

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

  const isDone = status === "4";
  const hasNoGroup = !gruppId || gruppId === "0";

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
      statusColor = currentGroup && currentGroup.gruppnamn ? "green" : "red";
    }
    conditionForGreen = (groupData && groupData !== "0") || isDone;
    conditionForDisabled = isDone;
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
    const isNew = status === "1";
    conditionForDisabled = hasNoGroup || isNew || successKey || isDone;
    conditionForGreen = successKey || isDone;

    statusCopy = hasNoGroup
      ? "Välj grupp först"
      : isNew
      ? "Skicka till grupp först"
      : conditionForGreen
      ? isVolunteer
        ? "Volontär välkomnad!"
        : "Beställning bekräftad!"
      : !email && telefon
      ? `Bekräfta via ${telefon}`
      : "Ingen email eller telefon";
    statusColor = hasNoGroup
      ? "red"
      : isNew
      ? "red"
      : conditionForGreen
      ? "green"
      : !email && telefon
      ? "red"
      : "Ingen email eller telefon";
    buttonCopy = conditionForGreen
      ? isVolunteer
        ? "Volontär uppringd"
        : "Beställare uppringd"
      : "Klicka när kontaktad";
    modalTitle = "Markera beställningen som bekräftad";
    modalContent =
      "Har du kontaktat beställaren för att bekräfta att vi mottagit beställningen och att en volontär är på väg?";
    fieldsToUpdate = {
      skickadBeställare: true,
    };
  }

  //Actions if the button action is to set the order status as ready
  if (isSetReady) {
    const isReady = status === "4";
    conditionForGreen = isReady;
    conditionForDisabled = hasNoGroup || isReady;
    statusCopy = hasNoGroup
      ? "Välj grupp först"
      : isReady
      ? "Beställningen utförd!"
      : "Inte utförd ännu";

    statusColor = hasNoGroup ? "red" : isReady ? "green" : "red";
    buttonCopy = isReady ? "Klar!" : "Klicka när klar";
    modalTitle = "Markera beställningen som klar";
    modalContent =
      "Har du bekräftat att beställningen är utförd och vill markera den som klar i systemet? Du kan inte ångra det efteråt. Detta kommer sätta alla fält som klara.";
    fieldsToUpdate = {
      skickadVolontär: true,
      skickadBeställare: true,
      status: "4",
    };
  }

  if (isToggleActive) {
    const isActive = status === "4";
    const isPaused = status === "5";
    conditionForGreen = isActive;
    conditionForDisabled = !gruppId || gruppId === "0";
    statusCopy = conditionForDisabled
      ? "Välj grupp först"
      : isActive
      ? isFiker
        ? "Välkomnad och redo för fika!"
        : "Tränad och redo för uppdrag!"
      : isPaused
      ? isFiker
        ? "Välkomnad, men pausad"
        : "Tränad, men pausad"
      : isFiker
      ? "Inte välkomnad av gruppledare ännu"
      : "Inte tränad ännu";
    statusColor = conditionForDisabled ? "red" : isActive ? "green" : "red";
    buttonCopy = isActive
      ? "Pausa"
      : isPaused
      ? "Pausad. Ändra till aktiv"
      : isFiker
      ? "Klicka här när välkomnad"
      : "Klicka här när tränad";
    modalTitle = isFiker
      ? "Sätt fikaintressenten som 'aktiv'"
      : "Sätt volontären som 'aktiv'";
    modalContent = isActive
      ? "Vill du sätta personen som 'pausad' i systemet? Du kan ändra tillbaka till aktiv efteråt i 'Pausade' tabben."
      : isPaused
      ? "Vill du sätta personen som aktiv igen i systemet?"
      : isFiker
      ? "Har du bekräftat att fikaintressenten har blivit välkomnad och är redo att bli satt som 'aktiv' i systemet?"
      : "Har du bekräftat att volontären har blivit tränad och är redo att bli satt som 'aktiv' i systemet?";
    fieldsToUpdate = {
      status: isActive ? "5" : "4",
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
          ${moment(new Date()).format("YYYY-MM-DD HH:MM")}: <i>${comments}
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
