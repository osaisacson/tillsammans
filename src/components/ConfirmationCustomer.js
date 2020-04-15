import React from 'react';
import Button from 'react-bootstrap/Button';
import ConfirmButtons from './ConfirmButtons';

const ConfirmationCustomer = (props) => (
  <div className="flex-column">
    <ConfirmButtons
      itemId={props.data.id}
      refreshAction={props.refreshAction}
      isConfirmed={props.isConfirmed}
      isCustomerConfirmation={props.isCustomerConfirmation}
      isConfToVol={props.isConfToVol}
      isVolToGroupConf={props.isVolToGroupConf}
    />
    {!props.isConfirmed ? (
      <>
        {props.data.email ? (
          <Button
            onClick={props.onClickAction}
            className="small-button top-margin"
          >
            Skicka bekräftelse
          </Button>
        ) : (
          <div className="confirmation-text">Kontakta {props.data.telefon}</div>
        )}
      </>
    ) : null}
  </div>
);

export default ConfirmationCustomer;
