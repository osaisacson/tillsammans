import React from 'react';
// reactstrap components
import { Button } from 'reactstrap';

const IconButton = props => {
  return (
    <Button className="large-icon-button" color="dark" outline type="button">
      <img src={props.icon} className="icon" alt="" />
      {props.text}
    </Button>
  );
};

export default IconButton;
