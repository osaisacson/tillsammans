// import React, { useState, useEffect, useCallback, useReducer } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useReducer } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

//Actions
import firebase from '../../../firebase/firebase.utils';
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

const HelpForm = props => {
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
      typ: editedOrder ? editedOrder.typ : '',
      beskrivning: editedOrder ? editedOrder.beskrivning : '',
      tidsrymd: editedOrder ? editedOrder.tidsrymd : '',
      telefon: editedOrder ? editedOrder.telefon : '',
      förnamn: editedOrder ? editedOrder.förnamn : '',
      efternamn: editedOrder ? editedOrder.efternamn : '',
      email: editedOrder ? editedOrder.email : '',
      address: editedOrder ? editedOrder.address : ''
    },
    inputValidities: {
      typ: editedOrder ? true : false,
      beskrivning: editedOrder ? true : false,
      tidsrymd: editedOrder ? true : false,
      telefon: editedOrder ? true : false,
      förnamn: editedOrder ? true : false,
      efternamn: editedOrder ? true : false,
      email: editedOrder ? true : false,
      address: editedOrder ? true : false
    },
    formIsValid: editedOrder ? true : false
  });

  const addUser = e => {
    e.preventDefault();
    console.log('ADD USER TRIGGERED');
    const db = firebase.firestore();
    db.collection('orders').add({
      typ: formState.inputValues.typ,
      beskrivning: formState.inputValues.beskrivning,
      tidsrymd: formState.inputValues.tidsrymd,
      telefon: formState.inputValues.telefon,
      förnamn: formState.inputValues.förnamn,
      efternamn: formState.inputValues.efternamn,
      email: formState.inputValues.email,
      address: formState.inputValues.address,
      grupp: 'ingen',
      datum: new Date().getTime(),
      status: 'ohanterad'
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
    //inputIdentifier and text will act as key:value in the form reducer
    // console.log('-------TEXTCHANGEHANDLER, received values-------');
    // console.log('inputIdentifier:', inputIdentifier);
    // console.log('text:', text.target.value);
    // console.log('------------------------------------------------');

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
        <h3>Vad behöver du hjälp med?</h3>
        <Form.Group controlId={'typ'}>
          <Form.Control
            as="select"
            name={'typ'}
            value={formState.inputValues.typ}
            type="text"
            onChange={textChangeHandler.bind(this, 'typ')}
            required
          >
            <option value="inget val">Välj typ</option>
            <option value="Handla/Hämta mat">Handla/Hämta mat</option>
            <option value="Handla/Hämta annat">Handla/Hämta annat</option>
            <option value="Prata">Prata</option>
            <option value="Annat ärende">Utföra annat ärende</option>
          </Form.Control>
        </Form.Group>

        <h3>Beskriv (så väl du kan) vad beställningen innebär</h3>
        <Form.Group controlId="t-1">
          <Form.Control
            as="textarea"
            rows="3"
            name="beskrivning"
            value={formState.inputValues.beskrivning}
            type="text"
            onChange={textChangeHandler.bind(this, 'beskrivning')}
            // defaultValue={'tidigare värde'} Såhär fixar vi edit form senare
            placeholder="Inköpslista, önskad butik eller annan information om din beställning."
          />
        </Form.Group>

        <h3>Hur länge kan du vänta?</h3>
        <Form.Group controlId={'tidsrymd'}>
          <Form.Control
            as="select"
            name={'tidsrymd'}
            value={formState.inputValues.tidsrymd}
            type="text"
            onChange={textChangeHandler.bind(this, 'tidsrymd')}
            required
          >
            <option value="Inget val">Välj</option>
            <option value="Max en dag">Max en dag</option>
            <option value="Upp till två dagar">Upp till två dagar</option>
            <option value="Upp till två dagar">Upp till tre dagar</option>
            <option value="Upp till tre dagar">Upp till tre dagar</option>
            <option value="Ta det när det går">Ta det när det går</option>
          </Form.Control>
        </Form.Group>

        <h3>Var når vi dig?</h3>
        <Form.Row>
          <Col>
            <Input
              label="telefon"
              value={formState.inputValues.telefon}
              type="text"
              onChange={textChangeHandler.bind(this, 'telefon')}
              required
            />
          </Col>
          <Col>
            <Input
              label="email"
              value={formState.inputValues.email}
              type="email"
              onChange={textChangeHandler.bind(this, 'email')}
              placeholder="E-post (frivilligt)"
              required
            />
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <Input
              label="förnamn"
              value={formState.inputValues.förnamn}
              type="text"
              onChange={textChangeHandler.bind(this, 'förnamn')}
              required
            />
          </Col>
          <Col>
            <Input
              label="efternamn"
              value={formState.inputValues.efternamn}
              type="text"
              onChange={textChangeHandler.bind(this, 'efternamn')}
              required
            />
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <Input
              label="address"
              value={formState.inputValues.address}
              type="text"
              onChange={textChangeHandler.bind(this, 'address')}
              required
            />
          </Col>
        </Form.Row>
        <Button type="submit" variant="secondary" size="lg" block>
          Skicka
        </Button>

        <h4>
          Du kommer bli kontaktad av en stödsamordnare så snart som möjligt
        </h4>
      </Form>
    </div>
  );
};

export default HelpForm;
