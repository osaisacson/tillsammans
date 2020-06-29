import React, { useState, useReducer } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import firebase from "../../firebase/firebase.utils";

import Mottaget from "./Mottaget";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

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

const FikaForm = (props) => {
  const [approvedConditions, setApprovedConditions] = useState(false);

  const editedFika = false;

  //Set states

  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();
  const [redirectToThanks, setRedirectToThanks] = useState(false);
  const [hasLicence, setHasLicence] = useState(false);
  const [hasCar, setHasCar] = useState(false);
  const [books, setBooks] = useState(false);
  const [gardening, setGardening] = useState(false);
  const [localPolitics, setLocalPolitics] = useState(false);
  const [globalPolitics, setGlobalPolitics] = useState(false);
  const [localCulture, setLocalCulture] = useState(false);
  const [newTech, setNewTech] = useState(false);
  const [lectures, setLectures] = useState(false);
  const [lecturer, setLecturer] = useState(false);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      förnamn: editedFika ? editedFika.förnamn : "",
      efternamn: editedFika ? editedFika.efternamn : "",
      telefon: editedFika ? editedFika.telefon : "",
      email: editedFika ? editedFika.email : "",
      interests: editedFika ? editedFika.interests : "",
      språk: editedFika ? editedFika.språk : "",
      books: editedFika ? editedFika.books : "",
      gardening: editedFika ? editedFika.gardening : "",
      localPolitics: editedFika ? editedFika.localPolitics : "",
      globalPolitics: editedFika ? editedFika.globalPolitics : "",
      localCulture: editedFika ? editedFika.localCulture : "",
      newTech: editedFika ? editedFika.newTech : "",
      lectures: editedFika ? editedFika.lectures : "",
      lecturer: editedFika ? editedFika.lecturer : "",
      lecture: editedFika ? editedFika.lecturer : "",
    },
    inputValidities: {
      förnamn: editedFika ? true : false,
      efternamn: editedFika ? true : false,
      telefon: editedFika ? true : false,
      email: editedFika ? true : false,
      interests: editedFika ? true : false,
      språk: editedFika ? true : false,
      books: editedFika ? true : false,
      gardening: editedFika ? true : false,
      localPolitics: editedFika ? true : false,
      globalPolitics: editedFika ? true : false,
      localCulture: editedFika ? true : false,
      lectures: editedFika ? true : false,
      lecturer: editedFika ? true : false,
      lecture: editedFika ? true : false,
    },
    formIsValid: editedFika ? true : false,
  });

  const addFika = (e) => {
    e.preventDefault();
    if (!approvedConditions) {
      alert("Det verkar som du inte läst och godkänt våra villkor");
      return;
    }
    const db = firebase.firestore();
    db.collection("fika").add({
      förnamn: formState.inputValues.förnamn,
      efternamn: formState.inputValues.efternamn,
      telefon: formState.inputValues.telefon,
      email: formState.inputValues.email,
      interests: formState.inputValues.interests,
      språk: formState.inputValues.språk,
      gruppId: "0",
      datum: new Date().getTime(),
      status: "1",
      skickadVolontärTillGrupp: false,
      skickadBekräftelseTillVolontär: false,
    });
    setRedirectToThanks(true);
  };

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
      input: inputIdentifier,
    });
  };

  if (redirectToThanks === true) {
    return <Mottaget />;
  }

  return (
    <div className="form">
      <Form onSubmit={addFika}>
        <h2>Jag är intresserad av att delta i en coronafikagrupp</h2>
        <p>
          Tänk om coronapandemin kunde ge oss nya bekantskaper istället för
          isolering? Det är idén bakom Coronafikagrupperna på Tjörn som
          arrangeras i samarbete mellan Alla Tillsammans och SPF Seniorerna
          Tjörnveteranerna.
        </p>
        <p>
          Anmäl dig här till en av Tjörns regelbundna distansfikagrupper. Du kan
          delta antingen via en vanlig telefon eller via videosamtal (om du har
          dator, surfplatta eller smartphone).
        </p>
        <p>
          Såhär går det till: När vi samlat ihop runt 5-10 intressenter med
          liknande intressen sätter vi ihop en fikagrupp med en samordnare.
          Samordnaren kontaktar sen alla i gruppen med tema för distansfikat och
          föreslagen dag/tid. På utsatt tid ringer du in via detaljerna
          samordnaren förmedlat, antingen på vanlig telefon eller via
          dator/surfplatta eller smartphone.
        </p>
        <p>
          Nya fikagrupper bildas allteftersom, utifrån intresse. Anmäl dig nedan
          så blir du kontaktad så snart som möjligt!
        </p>
        <br />
        <Form.Row>
          <Col>
            <Input
              placeholder="Förnamn"
              label="förnamn"
              value={formState.inputValues.förnamn}
              type="text"
              onChange={textChangeHandler.bind(this, "förnamn")}
              required
            />
          </Col>
          <Col>
            <Input
              placeholder="Efternamn"
              label="efternamn"
              value={formState.inputValues.efternamn}
              type="text"
              onChange={textChangeHandler.bind(this, "efternamn")}
              required
            />
          </Col>
        </Form.Row>

        <Form.Row>
          <Col>
            <Input
              placeholder="Telefon"
              label="telefon"
              value={formState.inputValues.telefon}
              type="text"
              onChange={textChangeHandler.bind(this, "telefon")}
              required
            />
          </Col>
          <Col>
            <Input
              placeholder="e-post (frivilligt)"
              label="email"
              value={formState.inputValues.email}
              type="email"
              onChange={textChangeHandler.bind(this, "email")}
              required
            />
          </Col>
        </Form.Row>
        <h3>Berätta gärna kort om dig själv (frivilligt)</h3>
        <Form.Group controlId="t-1">
          <Form.Control
            as="textarea"
            rows="3"
            placeholder="Jag är en glad kille på 79 jordsnurr..."
            name="interests"
            value={formState.inputValues.interests}
            type="text"
            onChange={textChangeHandler.bind(this, "interests")}
          />
        </Form.Group>
        <Form.Row>
          <Col>
            <Input
              placeholder="Särskilda språkönskemål (om annat än svenska)"
              label="språk"
              value={formState.inputValues.språk}
              type="text"
              onChange={textChangeHandler.bind(this, "språk")}
              required
            />
          </Col>
        </Form.Row>
        <br />

        <h2>
          Vilka möjliga ämnen är du intresserad av som teman i fikagruppen?
        </h2>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            onClick={() => {
              setBooks(!books);
            }}
            label="Bokklubb"
          />
          <Form.Check
            type="checkbox"
            onClick={() => {
              setGardening(!gardening);
            }}
            label="Trädgård och odling"
          />
          <Form.Check
            type="checkbox"
            onClick={() => {
              setLocalPolitics(!localPolitics);
            }}
            label="Lokalpolitik"
          />
          <Form.Check
            type="checkbox"
            onClick={() => {
              setGlobalPolitics(!globalPolitics);
            }}
            label="Världsläget"
          />
          <Form.Check
            type="checkbox"
            onClick={() => {
              setLocalCulture(!localCulture);
            }}
            label="Lokalkultur, dialekter, minnen"
          />
          <Form.Check
            type="checkbox"
            onClick={() => {
              setNewTech(!newTech);
            }}
            label="Vi går tillsammans igenom ny teknik (beställa online, kommunikationsappar etc)"
          />
          <Form.Check
            type="checkbox"
            onClick={() => {
              setLectures(!lectures);
            }}
            label="Föreläsningar från lokala föreläsare, med efterföljande diskussion"
          />
        </Form.Group>
        <p>
          Andra intressen (används för att sätta upp ytterligare
          fikagruppsteman)
        </p>
        <Form.Group controlId="t-0">
          <Form.Control
            as="textarea"
            rows="1"
            placeholder="Kriminalromaner, bakning, filosofi..."
            name="interests"
            value={formState.inputValues.interests}
            type="text"
            onChange={textChangeHandler.bind(this, "interests")}
          />
        </Form.Group>
        <br />

        <Form.Group>
          <h3>
            Skulle du kunna tänka dig att vara en föreläsare på en fikagrupp?
          </h3>
          <p>
            I så fall skriv in förslaget till tema på din föreläsning nedan.
            Notera att den max får vara 15 minuter lång (eftersom vi är på
            telefon).
          </p>

          <Form.Control
            as="textarea"
            rows="3"
            placeholder="Titel: 'Mina lärdomar om hur man bäst odlar pioner'. Kort paragraf om innehållet: 'Med mer än 30 års erfarenhet av hur man odlar pioner och med flera priser bakom bältet skulle jag nu vilja dela med mig av denna kunskap till intresserade andra pionodlare.'"
            name="lecture"
            value={formState.inputValues.lecture}
            type="text"
            onChange={textChangeHandler.bind(this, "lecture")}
          />
        </Form.Group>
        <br />

        <Form.Group>
          <p>
            <span>INFORMATION FÖR DIN TRYGGHET:</span> I och med att du skickar
            oss din anmälan så godkänner du att vi sparar dina kontaktuppgifter.
            Vi säljer naturligtvis aldrig dina uppgifter och vi lämnar dom inte
            vidare till annan part. Alla Tillsammans är ett gratisinitiativ för
            att underlätta livet under Covid-19 epidemin, skapat av lokala
            ideella krafter.
          </p>
          <Form.Check
            type="checkbox"
            onClick={toggleCheckBox}
            label="Jag godkänner att mina
            uppgifter lagras och att min information är tillgänglig för
            fikagruppens samordnare."
          />
          <br />
        </Form.Group>
        <Button type="submit" variant="secondary" size="lg" block>
          Skicka
        </Button>
        <br />
        <h4>
          Du kommer bli kontaktad av en fikasamordnare så snart som möjligt
        </h4>
      </Form>
    </div>
  );
};

export default FikaForm;
