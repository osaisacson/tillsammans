import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Spinner from 'react-bootstrap/Spinner';

import firebase from 'firebase/app';
import 'firebase/firestore';

const db = firebase.firestore();

const ConfirmButtons = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  async function updateSent(itemId, fieldsToUpdate) {
    setIsLoading(true);
    db.collection('orders')
      .doc(itemId)
      .update(fieldsToUpdate)
      .then(() => {
        props.refreshAction().then(() => {
          setIsLoading(false);
        });
      });
  }

  let fieldToUpdateTrue = props.isCustomerConfirmation
    ? {
        skickadBeställare: true,
      }
    : props.isGroupConfirmation
    ? {
        skickadGrupp: true,
      }
    : props.isVolunteerConfirmation
    ? {
        skickadVolontär: true,
      }
    : null;

  let fieldToUpdateFalse = props.isCustomerConfirmation
    ? {
        skickadBeställare: false,
      }
    : props.isGroupConfirmation
    ? {
        skickadGrupp: false,
      }
    : props.isVolunteerConfirmation
    ? {
        skickadVolontär: false,
      }
    : null;

  return (
    <ButtonToolbar aria-label="Toolbar with button groups">
      {isLoading ? (
        <div className="loader">Ändrar...</div>
      ) : (
        <ButtonGroup className="mr-2" aria-label="confirmation">
          <Button
            onClick={updateSent.bind(this, props.itemId, fieldToUpdateTrue)}
            className={
              props.isConfirmed ? 'confirm-button-active yes' : 'confirm-button'
            }
          >
            {props.isCustomerConfirmation ? 'Kontaktad' : 'Skickad'}
          </Button>
          <Button
            onClick={updateSent.bind(this, props.itemId, fieldToUpdateFalse)}
            className={
              !props.isConfirmed ? 'confirm-button-active no' : 'confirm-button'
            }
          >
            {props.isCustomerConfirmation ? 'Inte kontaktad' : 'inte Skickad'}
          </Button>
        </ButtonGroup>
      )}
    </ButtonToolbar>
  );
};

export default ConfirmButtons;
