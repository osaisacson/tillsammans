import React from 'react';
// reactstrap components
import { Button } from 'reactstrap';

export default function IconButton(props) {
  return (
    <Button
      className="large-icon-button"
      color="secondary"
      outline
      type="button"
    >
      {props.text}
    </Button>
  );
}
