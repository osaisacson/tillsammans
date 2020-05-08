import React from 'react';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';

const AddButtonHeader = props => {
  return (
    <div className="refresh-wrapper">
      <Button onClick={props.refreshAction}>
        <FontAwesomeIcon icon={faSync} />
      </Button>{' '}
    </div>
  );
};

export default AddButtonHeader;
