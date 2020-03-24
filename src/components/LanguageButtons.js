import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
export default function LanguageButtons() {
  return (
    <div className="centered language-buttons">
      <ButtonGroup toggle>
        <Button
          size="sm"
          variant="dark"
          type="radio"
          name="radio"
          defaultChecked
          value="1"
        >
          Svenska
        </Button>
        <Button
          size="sm"
          variant="outline-dark"
          type="radio"
          name="radio"
          value="2"
        >
          Engelska
        </Button>
        <Button
          size="sm"
          variant="outline-dark"
          type="radio"
          name="radio"
          value="3"
        >
          Finska
        </Button>
        <Button
          size="sm"
          variant="outline-dark"
          type="radio"
          name="radio"
          value="4"
        >
          Arabiska
        </Button>
        <Button
          size="sm"
          variant="outline-dark"
          type="radio"
          name="radio"
          value="5"
        >
          Polska
        </Button>
        <Button
          size="sm"
          variant="outline-dark"
          type="radio"
          name="radio"
          value="6"
        >
          Kurdiska
        </Button>
        <Button
          size="sm"
          variant="outline-dark"
          type="radio"
          name="radio"
          value="7"
        >
          Spanska
        </Button>
        <Button
          size="sm"
          variant="outline-secondary"
          type="radio"
          name="radio"
          value="8"
        >
          Fler val
        </Button>
      </ButtonGroup>
    </div>
  );
}