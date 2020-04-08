// import React, { useState, useEffect, useCallback, useReducer } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useReducer } from 'react';
import { useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

//Actions
import firebase from '../../firebase/firebase.utils';
// import * as ordersActions from '../../../store/actions/orders';

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

const HelpForm = props => {
  // const ordrId = props.route.params ? props.route.params.detailId : null; //Get the id of the currently edited order, passed from previous screen
  const ordrId = null; //Get the id of the currently edited order, passed from previous screen

  //Find order
  const editedOrder = useSelector(state =>
    state.orders.availableOrders.find(ordr => ordr.id === ordrId)
  );

  //Set states
  const [useSwish, setUseSwish] = useState(false);
  const [useCash, setUseCash] = useState(false);
  const [useInvoice, setUseInvoice] = useState(false);
  const [redirectToThanks, setRedirectToThanks] = useState(false);
  const [approvedConditions, setApprovedConditions] = useState(false);

  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      typ: editedOrder ? editedOrder.typ : '',
      beskrivning: editedOrder ? editedOrder.beskrivning : '',
      swish: editedOrder ? editedOrder.swish : '',
      kontant: editedOrder ? editedOrder.kontant : '',
      faktura: editedOrder ? editedOrder.faktura : '',
      tidsrymd: editedOrder ? editedOrder.tidsrymd : '',
      telefon: editedOrder ? editedOrder.telefon : '',
      förnamn: editedOrder ? editedOrder.förnamn : '',
      efternamn: editedOrder ? editedOrder.efternamn : '',
      email: editedOrder ? editedOrder.email : '',
      address: editedOrder ? editedOrder.address : '',
      postkod: editedOrder ? editedOrder.postkod : '',
      conditions: editedOrder ? editedOrder.conditions : ''
    },
    inputValidities: {
      typ: editedOrder ? true : false,
      beskrivning: editedOrder ? true : false,
      swish: editedOrder ? true : false,
      kontant: editedOrder ? true : false,
      faktura: editedOrder ? true : false,
      tidsrymd: editedOrder ? true : false,
      telefon: editedOrder ? true : false,
      förnamn: editedOrder ? true : false,
      efternamn: editedOrder ? true : false,
      email: editedOrder ? true : false,
      address: editedOrder ? true : false,
      postkod: editedOrder ? true : false,
      conditions: approvedConditions
    },
    formIsValid: editedOrder ? true : false
  });

  const addUser = e => {
    e.preventDefault();
    if (!approvedConditions) {
      alert('Det verkar som du inte läst och godkänt våra villkor');
      return;
    }
    console.log('ADD USER TRIGGERED');
    const db = firebase.firestore();
    db.collection('orders').add({
      gruppId: '',
      volontärId: '',
      datum: new Date().getTime(),
      typ: formState.inputValues.typ,
      beskrivning: formState.inputValues.beskrivning,
      swish: useSwish,
      kontant: useCash,
      faktura: useInvoice,
      tidsrymd: formState.inputValues.tidsrymd,
      telefon: formState.inputValues.telefon,
      förnamn: formState.inputValues.förnamn,
      efternamn: formState.inputValues.efternamn,
      email: formState.inputValues.email,
      address: formState.inputValues.address,
      postkod: formState.inputValues.postkod,
      status: '1'
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

  const toggleCheckBox = () => {
    setApprovedConditions(!approvedConditions);
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
      <Form onSubmit={addUser}>
        <h2>Beställning</h2>
        <p>
          Vill du inte använda formuläret kan du även beställa genom att ringa{' '}
          <span>073-3230571</span> eller maila{' '}
          <span>tjorn@allatillsammans.se</span>
        </p>
        <br />

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
            <option value="Handla/Hämta mat">Handla / Hämta matvaror</option>
            <option value="Handla/Hämta annat">
              Handla / Hämta annat (exempelvis paket, post, mediciner...)
            </option>
            <option value="Rådgivning för att komma igång med digital teknik">
              Rådgivning för att komma igång med digital teknik
            </option>
            <option value="Prata">
              Prata med någon (vi kan ta en telefonfika)
            </option>
            <option value="Annat ärende">
              Utföra annat ärende (exempelvis rasta hund)
            </option>
            <option value="Övrigt">Övrigt / Annat</option>
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
            placeholder="Inköpslista eller annan information om din beställning."
          />
        </Form.Group>
        <h3>
          Om min beställning innebär kostnader (exempelvis inköp) så ersätter
          jag volontärens utlägg via:
        </h3>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            onClick={() => {
              setUseSwish(!useSwish);
            }}
            label="Swish"
          />
          <Form.Check
            type="checkbox"
            onClick={() => {
              setUseCash(!useCash);
            }}
            label="Kontanter"
          />
          <Form.Check
            type="checkbox"
            onClick={() => {
              setUseInvoice(!useInvoice);
            }}
            label="Faktura"
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
            <option value="Upp till tre dagar">Upp till tre dagar</option>
            <option value="Upp till fyra dagar">Upp till fyra dagar</option>
            <option value="Ta det när det går">Ta det när det går</option>
          </Form.Control>
        </Form.Group>

        <h3>Var når vi dig?</h3>
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
              placeholder="E-post"
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
              label="förnamn"
              placeholder="Förnamn (frivilligt)"
              value={formState.inputValues.förnamn}
              type="text"
              onChange={textChangeHandler.bind(this, 'förnamn')}
              required
            />
          </Col>
          <Col>
            <Input
              label="efternamn"
              placeholder="Efternamn (frivilligt)"
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
              placeholder="Postkod (frivilligt)"
              value={formState.inputValues.postkod}
              type="text"
              onChange={textChangeHandler.bind(this, 'postkod')}
              required
            />
          </Col>
        </Form.Row>
        <Form.Group controlId="formBasicCheckbox">
          <p>
            <span>INFORMATION FÖR DIN TRYGGHET:</span> I och med att du skickar
            oss din beställning så godkänner du att vi tillfälligt sparar dina
            kontaktuppgifter. Vi säljer naturligtvis aldrig dina uppgifter och
            vi lämnar dom inte vidare till annan part. Innehållet i din
            beställning är endast synlig för vår samordnare och för den
            volontärgruppledare som ansvarar för att hantera den.
          </p>
          <Form.Check
            type="checkbox"
            onClick={toggleCheckBox}
            label="Jag har läst ovan och godkänner att mina uppgifter lagras och att min information är synlig för volontärplattformens samordnare samt en gruppledare under tiden som min beställning hanteras."
          />
        </Form.Group>
        <Button type="submit" variant="secondary" size="lg" block>
          Skicka
        </Button>
        <br />
        <h4>Du kommer bli kontaktad av en samordnare så snart som möjligt</h4>
      </Form>
    </div>
  );
};

export default HelpForm;
