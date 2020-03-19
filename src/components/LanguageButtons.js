import React from 'react';
import Button from '@bit/reactstrap.reactstrap.button';
import ButtonGroup from '@bit/reactstrap.reactstrap.button-group';
import ButtonToolbar from '@bit/reactstrap.reactstrap.button-toolbar';

export default function LanguageButtons() {
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css"
      />

      <ButtonToolbar>
        <ButtonGroup className="centered">
          <Button>Svenska</Button>
          <Button>Engelska</Button>
          <Button>Finska</Button>
          <Button>Arabiska</Button>
          <Button>Polska</Button>
          <Button>Kurdiska</Button>
          <Button>Spanska</Button>
          <Button>Fler val</Button>
        </ButtonGroup>
      </ButtonToolbar>
    </div>
  );
}
