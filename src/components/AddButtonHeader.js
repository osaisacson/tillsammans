import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const AddButtonHeader = props => (
  <div className="flex-spread">
    <h2>{props.headerText}</h2>
    <Link to={props.headerLink}>
      <Button className="add-button">+ {props.buttonText}</Button>
    </Link>
  </div>
);

export default AddButtonHeader;
