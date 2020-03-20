import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
export default function LanguageButtons() {
  return (
    <>
      <ButtonGroup toggle>
        <Button type="radio" name="radio" defaultChecked value="1">
          Svenska
        </Button>
        <Button type="radio" name="radio" value="2">
          Engelska
        </Button>
        <Button type="radio" name="radio" value="3">
          Finska
        </Button>
        <Button type="radio" name="radio" value="4">
          Arabiska
        </Button>
        <Button type="radio" name="radio" value="5">
          Polska
        </Button>
        <Button type="radio" name="radio" value="6">
          Kurdiska
        </Button>
        <Button type="radio" name="radio" value="7">
          Spanska
        </Button>
        <Button type="radio" name="radio" value="8">
          Fler val
        </Button>
      </ButtonGroup>
    </>
  );
}
