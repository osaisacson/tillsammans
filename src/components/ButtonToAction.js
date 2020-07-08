import React, { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";

import firebase from "firebase/app";
import "firebase/firestore";

const ButtonToAction = (props) => {
  const db = firebase.firestore();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState("");

  async function updateGroup() {
    setIsLoading(true);
    db.collection("orders")
      .doc(props.orderId)
      .update({
        groupId: selectedGroupId,
      })
      .then(() => {
        props.refreshAction().then(() => {
          setIsLoading(false);
        });
      });
  }

  let actionInForm;
  let statusCopy = "";
  let currentGroup = "";

  if (props.groupId) {
    if (props.groupData) {
      currentGroup = props.groupData.find((data) => data.id === props.groupId);
      statusCopy =
        currentGroup && currentGroup.gruppnamn
          ? currentGroup.gruppnamn
          : "Ingen grupp ännu";
      console.log("currentGroup: ", currentGroup);
    }
    actionInForm = updateGroup;
  }

  return (
    <div className="status-field">
      {isLoading ? (
        <div>...laddar</div>
      ) : (
        <>
          <div>{props.statusCopy ? props.statusCopy : statusCopy}</div>
          <Button
            disabled={props.conditionForDisabled}
            className={`form-to-email-button ${
              props.conditionForGreen ? "green" : "red"
            }`}
            onClick={actionInForm}
          >
            {props.buttonCopy}
          </Button>
        </>
      )}
    </div>
  );
};

export default ButtonToAction;
