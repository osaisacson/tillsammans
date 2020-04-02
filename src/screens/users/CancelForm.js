import React, { useState, useReducer } from 'react';
import { useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

//Actions
import firebase from '../../firebase/firebase.utils';

//Components
import Mottaget from './Mottaget';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value // From textChangeHandler = (inputIdentifier, text)
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
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

const CancelForm = props => {
  const ordrId = null; //TODO: Get the id of the currently edited order, passed from previous screen

  //Find order
  const editedOrder = useSelector(state =>
    state.orders.availableOrders.find(ordr => ordr.id === ordrId)
  );

  //Set states
  const [redirectToThanks, setRedirectToThanks] = useState(false);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      telefon: editedOrder ? editedOrder.telefon : '',
      email: editedOrder ? editedOrder.email : '',
      address: editedOrder ? editedOrder.address : '',
      postkod: editedOrder ? editedOrder.postkod : ''
    },
    inputValidities: {
      telefon: editedOrder ? true : false,
      email: editedOrder ? true : false,
      address: editedOrder ? true : false,
      postkod: editedOrder ? true : false
    },
    formIsValid: editedOrder ? true : false
  });

  const addCancellation = e => {
    e.preventDefault();

    const db = firebase.firestore();
    db.collection('cancellations').add({
      telefon: formState.inputValues.telefon,
      email: formState.inputValues.email,
      address: formState.inputValues.address,
      postkod: formState.inputValues.postkod,
      datum: new Date().getTime(),
      status: 'avboka'
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
      input: inputIdentifier
    });
  };

  if (redirectToThanks === true) {
    return <Mottaget />;
  }

  return (
    <div className="form">
      <Form onSubmit={addCancellation}>
        <h2>Avboka en beställning här</h2>
        <br />
        <h3>Kontaktuppgifter till dig så vi kan hitta din beställning</h3>
        <Form.Row>
          <Col>
            <Input
              label="telefon"
              placeholder="Telefon"
              value={formState.inputValues.telefon}
              type="text"
              onChange={textChangeHandler.bind(this, 'telefon')}
              required
            />
          </Col>
          <Col>
            <Input
              label="email"
              placeholder="E-post (frivilligt)"
              value={formState.inputValues.email}
              type="email"
              onChange={textChangeHandler.bind(this, 'email')}
              required
            />
          </Col>
        </Form.Row>

        <Form.Row>
          <Col>
            <Input
              label="address"
              placeholder="Address"
              value={formState.inputValues.address}
              type="text"
              onChange={textChangeHandler.bind(this, 'address')}
              required
            />
          </Col>
          <Col>
            <Input
              label="postkod"
              placeholder="Postkod"
              value={formState.inputValues.postkod}
              type="text"
              onChange={textChangeHandler.bind(this, 'postkod')}
              required
            />
          </Col>
        </Form.Row>

        <Button type="submit" variant="secondary" size="lg" block>
          Skicka
        </Button>
      </Form>
    </div>
  );
};

export default CancelForm;
