import React from 'react';
import Button from 'react-bootstrap/Button';
import ConfirmButtons from './ConfirmButtons';

const ConfirmationInternal = (props) => (
  <div className="flex-column">
    <ConfirmButtons
      itemId={props.itemId}
      refreshAction={props.refreshAction}
      isConfirmed={props.isConfirmed}
      isGroupConfirmation={props.isGroupConfirmation}
      isVolToGroupConf={props.isVolToGroupConf}
      isOrderInfoToVolunteer={props.isOrderInfoToVolunteer}
    />
    {!props.isConfirmed ? (
      <Button onClick={props.onClickAction} className="small-button top-margin">
        Skicka detaljer
      </Button>
    ) : null}
  </div>
);

export default ConfirmationInternal;
