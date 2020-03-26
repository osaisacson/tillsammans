import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import firebase from '../../../firebase/firebase.utils';
import { Redirect } from 'react-router';

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

class HelpForm extends React.Component {
  constructor() {
    super();
    this.state = {
      typ: '',
      beskrivning: '',
      tidsrymd: '',
      telefon: '',
      förnamn: '',
      efternamn: '',
      email: '',
      address: '',
      redirectToReferrer: false
    };
  }

  updateInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  addUser = e => {
    e.preventDefault();
    const db = firebase.firestore();
    db.collection('orders').add({
      typ: this.state.typ,
      beskrivning: this.state.beskrivning,
      tidsrymd: this.state.tidsrymd,
      telefon: this.state.telefon,
      förnamn: this.state.förnamn,
      efternamn: this.state.efternamn,
      email: this.state.email,
      address: this.state.address,
      grupp: 'ingen',
      datum: new Date().getTime(),
      status: 'ohanterad'
    });
    this.setState({
      typ: '',
      beskrivning: '',
      tidsrymd: '',
      telefon: '',
      förnamn: '',
      efternamn: '',
      email: '',
      address: '',
      redirectToReferrer: true
    });
  };

  render() {
    const redirectToReferrer = this.state.redirectToReferrer;
    //Redirect to thank you page if form has been submitted
    if (redirectToReferrer === true) {
      return <Redirect to="/mottaget" />;
    }

    return (
      <div className="form">
        <Form onSubmit={this.addUser}>
          <h3>Vad behöver du hjälp med?</h3>
          <Form.Group controlId={'typ'}>
            <Form.Control
              as="select"
              name={'typ'}
              value={this.state.typ}
              onChange={this.updateInput}
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
              value={this.state.beskrivning}
              onChange={this.updateInput}
              // defaultValue={'tidigare värde'} Såhär fixar vi edit form senare
              placeholder="Inköpslista, önskad butik eller annan information om din beställning."
            />
          </Form.Group>

          <h3>Hur länge kan du vänta?</h3>
          <Form.Group controlId={'tidsrymd'}>
            <Form.Control
              as="select"
              name={'tidsrymd'}
              value={this.state.tidsrymd}
              onChange={this.updateInput}
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
                value={this.state.telefon}
                onChange={this.updateInput}
                required
              />
            </Col>
            <Col>
              <Input
                label="email"
                value={this.state.email}
                onChange={this.updateInput}
                placeholder="E-post (frivilligt)"
                type="email"
                required
              />
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <Input
                label="förnamn"
                value={this.state.förnamn}
                onChange={this.updateInput}
                required
              />
            </Col>
            <Col>
              <Input
                label="efternamn"
                value={this.state.efternamn}
                onChange={this.updateInput}
                required
              />
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <Input
                label="address"
                value={this.state.address}
                onChange={this.updateInput}
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
  }
}

export default HelpForm;

// import React, { useState, useEffect, useCallback, useReducer } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import Form from 'react-bootstrap/Form';
// import Col from 'react-bootstrap/Col';
// import Button from 'react-bootstrap/Button';

// //Actions
// import * as ordersActions from './../../../store/actions/orders';

// const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

// const formReducer = (state, action) => {
//   if (action.type === FORM_INPUT_UPDATE) {
//     const updatedValues = {
//       ...state.inputValues,
//       [action.input]: action.value // From textChangeHandler = (inputIdentifier, text)
//     };
//     const updatedValidities = {
//       ...state.inputValidities,
//       [action.input]: action.isValid
//     };
//     let updatedFormIsValid = true;
//     for (const key in updatedValidities) {
//       updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
//     }
//     return {
//       formIsValid: updatedFormIsValid,
//       inputValidities: updatedValidities,
//       inputValues: updatedValues
//     };
//   }
//   return state;
// };

// const Input = ({ label, placeholder, value, onChange }) => (
//   <>
//     <Form.Group controlId={label}>
//       <Form.Control
//         name={label}
//         value={value}
//         onChange={onChange}
//         placeholder={placeholder ? placeholder : label}
//       />
//     </Form.Group>
//   </>
// );

// const HelpForm = props => {
//   //TODO: for admin: pass the id of the order when clicking 'edit order'
//   const orderId = props.selectedOrderId ? props.selectedOrderId : null; //Get the id of the currently edited order, passed from previous screen

//   //Find order
//   const editedOrder = useSelector(state =>
//     state.orders.availableOrders.find(ordr => ordr.id === orderId)
//   );

//   //Set states
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState();

//   const dispatch = useDispatch();

//   const [formState, dispatchFormState] = useReducer(formReducer, {
//     inputValues: {
//       typ: editedOrder ? editedOrder.typ : '',
//       beskrivning: editedOrder ? editedOrder.beskrivning : '',
//       tidsrymd: editedOrder ? editedOrder.tidsrymd : '',
//       telefon: editedOrder ? editedOrder.telefon : '',
//       förnamn: editedOrder ? editedOrder.förnamn : '',
//       efternamn: editedOrder ? editedOrder.efternamn : '',
//       email: editedOrder ? editedOrder.email : '',
//       address: editedOrder ? editedOrder.address : '',
//       postkod: editedOrder ? editedOrder.postkod : ''
//     },
//     inputValidities: {
//       typ: editedOrder ? true : false,
//       beskrivning: editedOrder ? true : false,
//       tidsrymd: editedOrder ? true : false,
//       telefon: editedOrder ? true : false,
//       förnamn: editedOrder ? true : false,
//       efternamn: editedOrder ? true : false,
//       email: editedOrder ? true : false,
//       address: editedOrder ? true : false,
//       postkod: editedOrder ? true : false
//     },
//     formIsValid: editedOrder ? true : false
//   });

//   useEffect(() => {
//     if (error) {
//       console.log('error: ', error);
//     }
//   }, [error]);

//   // const submitHandler = event => {
//   //   alert(`submitHandler triggered!
//   //   data: ${formState.inputValues}`);

//   //   const templateId = 'template_9ZdHsvIt';

//   //   const variables = {
//   //     typ: formState.inputValues.typ,
//   //     beskrivning: formState.inputValues.beskrivning,
//   //     tidsrymd: formState.inputValues.tidsrymd,
//   //     telefon: +formState.inputValues.telefon,
//   //     förnamn: formState.inputValues.förnamn,
//   //     efternamn: formState.inputValues.efternamn,
//   //     email: formState.inputValues.email,
//   //     address: formState.inputValues.address,
//   //     postkod: +formState.inputValues.postkod
//   //   };

//   //   const sendFeedback = (templateId, variables) => {
//   //     console.log('------sending to email-----');
//   //     window.emailjs
//   //       .send('gmail', templateId, variables)
//   //       .then(res => {
//   //         console.log('Email successfully sent!');
//   //       })
//   //       .catch(err =>
//   //         console.error(
//   //           'Oh well, you failed. Here some thoughts on the error that occured:',
//   //           err
//   //         )
//   //       );
//   //   };

//   //   sendFeedback(templateId, variables);
//   // };

//   const submitHandler = useCallback(async () => {
//     if (!formState.formIsValid) {
//       //TODO: make alert when user tries to submit form when something is missing
//       console.log('error, !formState.formIsValid: ', error);
//       return;
//     }
//     setError(null);
//     setIsLoading(true);
//     alert(`submitHandler triggered!
//     beskrivning: ${formState.inputValues.beskrivning}`);
//     try {
//       if (editedOrder) {
//         console.log('--------EDIT ORDER: dispatch--------');
//         console.log('formState.inputValues:', formState.inputValues);
//         console.log('---------------------------------------');
//         await dispatch(
//           ordersActions.updateOrder(
//             orderId,
//             formState.inputValues.typ,
//             formState.inputValues.beskrivning,
//             formState.inputValues.tidsrymd,
//             +formState.inputValues.telefon,
//             formState.inputValues.förnamn,
//             formState.inputValues.efternamn,
//             formState.inputValues.email,
//             formState.inputValues.address,
//             +formState.inputValues.postkod,
//             formState.inputValues.grupp,
//             formState.inputValues.status
//           )
//         );
//       } else {
//         console.log('--------CREATE ORDER: dispatch--------');
//         console.log('formState.inputValues:', formState.inputValues);
//         console.log('---------------------------------------');
//         await dispatch(
//           ordersActions.createOrder(
//             formState.inputValues.typ,
//             formState.inputValues.beskrivning,
//             formState.inputValues.tidsrymd,
//             +formState.inputValues.telefon,
//             formState.inputValues.förnamn,
//             formState.inputValues.efternamn,
//             formState.inputValues.email,
//             formState.inputValues.address,
//             +formState.inputValues.postkod
//           )
//         );
//       }
//       // props.navigation.goBack();
//     } catch (err) {
//       setError(err.message);
//     }
//     setIsLoading(false);
//   }, [
//     formState.formIsValid,
//     formState.inputValues,
//     error,
//     editedOrder,
//     dispatch,
//     orderId
//   ]);

//   //Manages validation of title input

//   const textChangeHandler = event => {
//     let inputIdentifier = event.target.name;
//     let text = event.target.value;
//     //inputIdentifier and text will act as key:value in the form reducer
//     console.log('-------TEXTCHANGEHANDLER, received values-------');
//     console.log('inputIdentifier:', inputIdentifier);
//     console.log('text:', text);
//     console.log('------------------------------------------------');
//     let isValid = true;

//     // //If we haven't entered any value (its empty) set form validity to false
//     // if (text.trim().length === 0) {
//     //   isValid = false;
//     // }

//     dispatchFormState({
//       type: FORM_INPUT_UPDATE,
//       value: text,
//       isValid: isValid,
//       input: inputIdentifier
//     });
//   };

//   return (
//     <div className="form">
//       <Form onSubmit={submitHandler}>
//         <h3>Vad behöver du hjälp med</h3>
//         <Form.Group controlId={'typ'}>
//           <Form.Control
//             as="select"
//             name={'typ'}
//             value={formState.inputValues.typ}
//             onChange={textChangeHandler.bind(this)}
//             required
//           >
//             <option value="inget val">Välj typ</option>
//             <option value="Ett ärende">Ett ärende</option>
//             <option value="Övrigt">Övrigt</option>
//           </Form.Control>
//         </Form.Group>

//         <h3>Beskriv så väl du kan</h3>
//         <Form.Group controlId="t-1">
//           <Form.Control
//             as="textarea"
//             rows="3"
//             name="beskrivning"
//             value={formState.inputValues.beskrivning}
//             onChange={textChangeHandler.bind(this)}
//             // defaultValue={'tidigare värde'} Såhär fixar vi edit form senare
//             placeholder="Inköpslista, övrig information..."
//           />
//         </Form.Group>

//         <h3>Hur länge kan du vänta?</h3>
//         <Form.Group controlId={'tidsrymd'}>
//           <Form.Control
//             as="select"
//             name={'tidsrymd'}
//             value={formState.inputValues.tidsrymd}
//             onChange={textChangeHandler.bind(this)}
//             required
//           >
//             <option value="tvådagar">Upp till två dagar</option>
//             <option value="vecka">Upp till en vecka</option>
//             <option value="fort">Så snabbt som möjligt</option>
//           </Form.Control>
//         </Form.Group>

//         <h3>Var når vi dig?</h3>
//         <Form.Row>
//           <Col>
//             <Input
//               label="telefon"
//               value={formState.inputValues.telefon.toString()}
//               onChange={textChangeHandler.bind(this)}
//               required
//             />
//           </Col>
//           <Col>
//             <Input
//               label="email"
//               value={formState.inputValues.email}
//               onChange={textChangeHandler.bind(this)}
//               placeholder="e-post"
//               type="email"
//               required
//             />
//           </Col>
//         </Form.Row>
//         <Form.Row>
//           <Col>
//             <Input
//               label="förnamn"
//               value={formState.inputValues.förnamn}
//               onChange={textChangeHandler.bind(this)}
//               required
//             />
//           </Col>
//           <Col>
//             <Input
//               label="efternamn"
//               value={formState.inputValues.efternamn}
//               onChange={textChangeHandler.bind(this)}
//               required
//             />
//           </Col>
//         </Form.Row>
//         <Form.Row>
//           <Col>
//             <Input
//               label="address"
//               value={formState.inputValues.address}
//               onChange={textChangeHandler.bind(this)}
//               required
//             />
//           </Col>
//           <Col>
//             <Input
//               label="postkod"
//               value={formState.inputValues.postkod.toString()}
//               onChange={textChangeHandler.bind(this)}
//               required
//             />
//           </Col>
//         </Form.Row>
//         <Button type="submit" variant="secondary" size="lg" block>
//           Skicka
//         </Button>

//         <h4>
//           Du kommer bli kontaktad av en stödsamordnare så snart som möjligt
//         </h4>
//       </Form>
//     </div>
//   );
// };

// export default HelpForm;
