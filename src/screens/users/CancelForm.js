// import React, { useState, useEffect, useCallback, useReducer } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useReducer } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

//Actions
import firebase from '../../firebase/firebase.utils';
// import * as ordersActions from '../../../store/actions/orders';

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
  // const ordrId = props.route.params ? props.route.params.detailId : null; //Get the id of the currently edited order, passed from previous screen
  const ordrId = null; //Get the id of the currently edited order, passed from previous screen

  //Find order
  const editedOrder = useSelector(state =>
    state.orders.availableOrders.find(ordr => ordr.id === ordrId)
  );

  //Set states
  const [redirectToThanks, setRedirectToThanks] = useState(false);

  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();

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

  const addUser = e => {
    e.preventDefault();

    const db = firebase.firestore();
    db.collection('orders').add({
      telefon: formState.inputValues.telefon,
      email: formState.inputValues.email,
      address: formState.inputValues.address,
      postkod: formState.inputValues.postkod,
      datum: new Date().getTime(),
      status: 'avboka'
    });
    setRedirectToThanks(true);
  };

  //For later use: this is the way we want to do it, not the addUser above.

  // const dispatch = useDispatch();

  // const submitHandler = useCallback(async () => {
  //   if (!formState.formIsValid) {
  //     alert(
  //       'Ojoj',
  //       'Det verkar som något saknas i formuläret, kolla om det står någonting under fälten.',
  //       [{ text: 'OK' }]
  //     );
  //     return;
  //   }
  //   setError(null);
  //   setIsLoading(true);
  //   try {
  //     if (editedOrder) {
  //       await dispatch(
  //         ordersActions.updateOrder(
  //           ordrId,
  //           formState.inputValues.typ,
  //           formState.inputValues.beskrivning,
  //           formState.inputValues.tidsrymd,
  //           formState.inputValues.telefon,
  //           formState.inputValues.förnamn,
  //           formState.inputValues.efternamn,
  //           formState.inputValues.email,
  //           formState.inputValues.address
  //         )
  //       );
  //     } else {
  //       console.log('--------CREATE PRODUCT: dispatch--------');
  //       console.log(
  //         'formstate.inputValues.beskrivning:',
  //         formState.inputValues.beskrivning
  //       );
  //       console.log('---------------------------------------');
  //       await dispatch(
  //         ordersActions.createOrder(
  //           formState.inputValues.typ,
  //           formState.inputValues.beskrivning,
  //           formState.inputValues.tidsrymd,
  //           formState.inputValues.telefon,
  //           formState.inputValues.förnamn,
  //           formState.inputValues.efternamn,
  //           formState.inputValues.email,
  //           formState.inputValues.address
  //         )
  //       );
  //     }
  //     setRedirectToThanks(true);
  //   } catch (err) {
  //     setError(err.message);
  //   }

  //   setIsLoading(false);
  // }, [formState, editedOrder, dispatch, ordrId]);

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
    return <Redirect to="/mottaget" />;
  }

  return (
    <div className="form">
      <Form onSubmit={addUser}>
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
