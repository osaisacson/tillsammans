import React, { useState, useReducer } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import firebase from '../../firebase/firebase.utils';

import Mottaget from './Mottaget';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value, // From textChangeHandler = (inputIdentifier, text)
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const Input = ({ label, placeholder, value, onChange }) => (
  <>
    <Form.Group controlId={label}>
      <Form.Control
        name={label}
        value={value}
        onChange={onChange}
        placeholder={placeholder ? placeholder : label}
      />
    </Form.Group>
  </>
);

const GroupForm = (props) => {
  const editedGroup = false;

  //Set states
  const [redirectToThanks, setRedirectToThanks] = useState(false);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      gruppnamn: editedGroup ? editedGroup.gruppnamn : '',
      kontakt: editedGroup ? editedGroup.kontakt : '',
      kommentarer: editedGroup ? editedGroup.kommentarer : '',
      telefon: editedGroup ? editedGroup.telefon : '',
      email: editedGroup ? editedGroup.email : '',
      address: editedGroup ? editedGroup.address : '',
      postkod: editedGroup ? editedGroup.postkod : '',
    },
    inputValidities: {
      gruppnamn: editedGroup ? true : false,
      kontakt: editedGroup ? true : false,
      kommentarer: editedGroup ? true : false,
      telefon: editedGroup ? true : false,
      email: editedGroup ? true : false,
      address: editedGroup ? true : false,
      postkod: editedGroup ? true : false,
    },
    formIsValid: editedGroup ? true : false,
  });

  const addGroup = (e) => {
    e.preventDefault();
    const db = firebase.firestore();
    db.collection('groups').add({
      datum: new Date().getTime(),
      gruppnamn: formState.inputValues.gruppnamn,
      kontakt: formState.inputValues.kontakt,
      kommentarer: formState.inputValues.kommentarer,
      telefon: formState.inputValues.telefon,
      email: formState.inputValues.email,
      address: formState.inputValues.address,
      postkod: formState.inputValues.postkod,
      status: 'aktiv',
    });
    setRedirectToThanks(true);
  };

  //Manages validation of title input
  const textChangeHandler = (inputIdentifier, text) => {
    let isValid = true;

    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: text.target.value,
      isValid: isValid,
      input: inputIdentifier,
    });
  };

  if (redirectToThanks === true) {
    return <Mottaget />;
  }

  return (
    <div className="form">
      <h2>Lägg till ny grupp</h2>
      <p>Varje grupp ska vara lite och lätthanterlig, runt 4-10 personer</p>
      <br />
      <Form onSubmit={addGroup}>
        <Form.Row>
          <Col>
            <Input
              placeholder="Gruppnamn"
              label="gruppnamn"
              value={formState.inputValues.gruppnamn}
              type="text"
              onChange={textChangeHandler.bind(this, 'gruppnamn')}
              required
            />
          </Col>
          <Col>
            <Input
              placeholder="Kontaktperson"
              label="kontakt"
              value={formState.inputValues.kontakt}
              type="text"
              onChange={textChangeHandler.bind(this, 'kontakt')}
              required
            />
          </Col>
        </Form.Row>

        <h3>Kontaktpersonens uppgifter</h3>
        <Form.Row>
          <Col>
            <Input
              placeholder="Telefon"
              label="telefon"
              value={formState.inputValues.telefon}
              type="text"
              onChange={textChangeHandler.bind(this, 'telefon')}
              required
            />
          </Col>
          <Col>
            <Input
              placeholder="E-post"
              label="email"
              value={formState.inputValues.email}
              type="email"
              onChange={textChangeHandler.bind(this, 'email')}
              required
            />
          </Col>
        </Form.Row>
        <h3>Gruppens uppgifter</h3>
        <Form.Row>
          <Col>
            <Input
              placeholder="Address"
              label="address"
              value={formState.inputValues.address}
              type="text"
              onChange={textChangeHandler.bind(this, 'address')}
              required
            />
          </Col>
          <Col>
            <Input
              placeholder="Postkod"
              label="postkod"
              value={formState.inputValues.postkod}
              type="text"
              onChange={textChangeHandler.bind(this, 'postkod')}
              required
            />
          </Col>
        </Form.Row>
        <h3>Kommentarer</h3>
        <Form.Group controlId="t-1">
          <Form.Control
            as="textarea"
            rows="3"
            name="kommentarer"
            value={formState.inputValues.kommentarer}
            type="text"
            onChange={textChangeHandler.bind(this, 'kommentarer')}
            placeholder="Gruppens bakgrund, etc"
          />
        </Form.Group>
        <Button type="submit" variant="secondary" size="lg" block>
          Skicka
        </Button>
      </Form>
    </div>
  );
};

export default GroupForm;
