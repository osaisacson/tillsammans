// import React, { useState, useEffect, useCallback, useReducer } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useReducer } from 'react';
// import { useSelector } from 'react-redux';
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

  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();
  const [redirectToThanks, setRedirectToThanks] = useState(false);
  const [hasLicence, setHasLicence] = useState(false);
  const [hasCar, setHasCar] = useState(false);
  const [shopFood, setShopFood] = useState(false);
  const [shopSupplies, setShopSupplies] = useState(false);
  const [runErrands, setRunErrands] = useState(false);
  const [doAnimals, setDoAnimals] = useState(false);
  const [doTalking, setDoTalking] = useState(false);
  const [doAuthorities, setDoAuthorities] = useState(false);
  const [doTech, setDoTech] = useState(false);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      förnamn: editedVolunteer ? editedVolunteer.förnamn : '',
      efternamn: editedVolunteer ? editedVolunteer.efternamn : '',
      telefon: editedVolunteer ? editedVolunteer.telefon : '',
      email: editedVolunteer ? editedVolunteer.email : '',
      address: editedVolunteer ? editedVolunteer.address : '',
      postkod: editedVolunteer ? editedVolunteer.postkod : '',
      beskrivning: editedVolunteer ? editedVolunteer.beskrivning : '',
      språk: editedVolunteer ? editedVolunteer.språk : '',
      födelseår: editedVolunteer ? editedVolunteer.födelseår : '',
      körkort: editedVolunteer ? editedVolunteer.körkort : '',
      bil: editedVolunteer ? editedVolunteer.bil : '',
      mat: editedVolunteer ? editedVolunteer.mat : '',
      varor: editedVolunteer ? editedVolunteer.varor : '',
      ärenden: editedVolunteer ? editedVolunteer.ärenden : '',
      djur: editedVolunteer ? editedVolunteer.djur : '',
      prata: editedVolunteer ? editedVolunteer.prata : '',
      myndigheter: editedVolunteer ? editedVolunteer.myndigheter : '',
      teknik: editedVolunteer ? editedVolunteer.teknik : ''
    },
    inputValidities: {
      förnamn: editedVolunteer ? true : false,
      efternamn: editedVolunteer ? true : false,
      telefon: editedVolunteer ? true : false,
      email: editedVolunteer ? true : false,
      address: editedVolunteer ? true : false,
      postkod: editedVolunteer ? true : false,
      beskrivning: editedVolunteer ? true : false,
      språk: editedVolunteer ? true : false,
      födelseår: editedVolunteer ? true : false,
      körkort: editedVolunteer ? true : false,
      bil: editedVolunteer ? true : false,
      mat: editedVolunteer ? true : false,
      varor: editedVolunteer ? true : false,
      ärenden: editedVolunteer ? true : false,
      djur: editedVolunteer ? true : false,
      prata: editedVolunteer ? true : false,
      myndigheter: editedVolunteer ? true : false,
      teknik: editedVolunteer ? true : false
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
      postkod: formState.inputValues.postkod,
      beskrivning: formState.inputValues.beskrivning,
      språk: formState.inputValues.språk,
      födelseår: formState.inputValues.födelseår,
      körkort: hasLicence,
      bil: hasCar,
      mat: shopFood,
      varor: shopSupplies,
      ärenden: runErrands,
      djur: doAnimals,
      prata: doTalking,
      myndigheter: doAuthorities,
      teknik: doTech,
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
        <p>
          Tillsammans kan vi begränsa smittspridningen av Covid – 19 och skydda
          utsatta grupper. Men vi behöver hjälpas åt! Kan du tänka dig att
          hjälpa till som volontär på Tjörn? Du behövs! Anmäl dig genom det här
          formuläret så kommer du snart att bli kontaktad av en av våra
          gruppledare!
        </p>
        <Form.Row>
          <Col>
            <Input
              placeholder="Förnamn"
              label="förnamn"
              value={formState.inputValues.förnamn}
              type="text"
              onChange={textChangeHandler.bind(this, 'förnamn')}
              required
            />
          </Col>
          <Col>
            <Input
              placeholder="Efternamn"
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
              placeholder="e-post (frivilligt)"
              label="email"
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
        <h3>Beskriv dig själv</h3>
        <Form.Group controlId="t-1">
          <Form.Control
            as="textarea"
            rows="3"
            placeholder="Jag åker till affären en gång i veckan, kan hämta upp något när jag ändå är där"
            name="beskrivning"
            value={formState.inputValues.beskrivning}
            type="text"
            onChange={textChangeHandler.bind(this, 'beskrivning')}
          />
        </Form.Group>
        <Form.Row>
          <Col>
            <Input
              placeholder="Jag talar/förstår följande språk"
              label="språk"
              value={formState.inputValues.språk}
              type="text"
              onChange={textChangeHandler.bind(this, 'språk')}
              required
            />
          </Col>
          <Col>
            <Input
              placeholder="Födelseår"
              label="födelseår"
              value={formState.inputValues.födelseår}
              type="text"
              onChange={textChangeHandler.bind(this, 'födelseår')}
              required
            />
          </Col>
        </Form.Row>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            onClick={() => {
              setHasLicence(!hasLicence);
            }}
            label="Jag har körkort"
          />
          <Form.Check
            type="checkbox"
            onClick={() => {
              setHasCar(!hasCar);
            }}
            label="Jag har egen bil"
          />
        </Form.Group>

        <h3>Exempel på uppgifter jag kan utföra:</h3>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            onClick={() => {
              setShopFood(!shopFood);
            }}
            label="Handla matvaror och djurmat"
          />
          <Form.Check
            type="checkbox"
            onClick={() => {
              setShopSupplies(!shopSupplies);
            }}
            label="Hämta och lämna paket, post, mediciner"
          />
          <Form.Check
            type="checkbox"
            onClick={() => {
              setRunErrands(!runErrands);
            }}
            label="Göra andra ärenden"
          />
          <Form.Check
            type="checkbox"
            onClick={() => {
              setDoAnimals(!doAnimals);
            }}
            label="Rasta djur"
          />
          <Form.Check
            type="checkbox"
            onClick={() => {
              setDoTalking(!doTalking);
            }}
            label="Vara tillgänglig för att prata"
          />
          <Form.Check
            type="checkbox"
            onClick={() => {
              setDoAuthorities(!doAuthorities);
            }}
            label="Hjälpa till med vård/myndighetskontakter och rådgivning"
          />
          <Form.Check
            type="checkbox"
            onClick={() => {
              setDoTech(!doTech);
            }}
            label="Hjälpa till att sätta upp teknologi (beställa online, etc)"
          />
        </Form.Group>

        <p>
          INFORMATION FÖR DIN INTEGRITET: I och med att du skickar oss din
          beställning så godkänner du att vi tillfälligt sparar dina
          kontaktuppgifter. Vi säljer naturligtvis aldrig dina uppgifter och vi
          lämnar dom inte vidare till annan part. Jag godkänner att mina
          uppgifter lagras tillfälligt och att min information är tillgänglig
          för volontärplattformens samordnare samt en gruppledare.
        </p>
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
