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
// import * as volunteersActions from '../../../store/actions/volunteers';

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

const VolunteerForm = props => {
  // const voluntrId = props.route.params ? props.route.params.detailId : null; //Get the id of the currently edited Volunteer, passed from previous screen

  //Find Volunteer
  // const editedVolunteer = useSelector(state =>
  //   state.volunteers.availableVolunteers.find(
  //     voluntr => voluntr.id === voluntrId
  //   )
  // );
  const editedVolunteer = false;

  //Set states
  const [redirectToThanks, setRedirectToThanks] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      förnamn: editedVolunteer ? editedVolunteer.förnamn : '',
      efternamn: editedVolunteer ? editedVolunteer.efternamn : '',
      telefon: editedVolunteer ? editedVolunteer.telefon : '',
      email: editedVolunteer ? editedVolunteer.email : '',
      address: editedVolunteer ? editedVolunteer.address : '',
      beskrivning: editedVolunteer ? editedVolunteer.beskrivning : ''
    },
    inputValidities: {
      förnamn: editedVolunteer ? true : false,
      efternamn: editedVolunteer ? true : false,
      telefon: editedVolunteer ? true : false,
      email: editedVolunteer ? true : false,
      address: editedVolunteer ? true : false,
      beskrivning: editedVolunteer ? true : false
    },
    formIsValid: editedVolunteer ? true : false
  });

  const addVolunteer = e => {
    e.preventDefault();
    const db = firebase.firestore();
    db.collection('volunteers').add({
      förnamn: formState.inputValues.förnamn,
      efternamn: formState.inputValues.efternamn,
      telefon: formState.inputValues.telefon,
      email: formState.inputValues.email,
      address: formState.inputValues.address,
      beskrivning: formState.inputValues.beskrivning,
      grupp: 'ingen',
      datum: new Date().getTime(),
      status: 'ny'
    });
    setRedirectToThanks(true);
  };

  //For later use: this is the way we want to do it, not the addVolunteer above.

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
  //     if (editedVolunteer) {
  //       await dispatch(
  //         volunteersActions.updateVolunteer(
  //           voluntrId,
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
  //         volunteersActions.createVolunteer(
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
  // }, [formState, editedVolunteer, dispatch, voluntrId]);

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
      <Form onSubmit={addVolunteer}>
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
              placeholder="e-post (frivilligt)"
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
        <h3>Beskriv dig själv</h3>
        <Form.Group controlId="t-1">
          <Form.Control
            as="textarea"
            rows="3"
            name="beskrivning"
            value={formState.inputValues.beskrivning}
            type="text"
            onChange={textChangeHandler.bind(this, 'beskrivning')}
            placeholder="Jag har ingen bil men en bra cykel"
          />
        </Form.Group>
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

export default VolunteerForm;
