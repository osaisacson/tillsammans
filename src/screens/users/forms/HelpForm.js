import React, { useState, useEffect, useCallback, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

//Actions
import * as ordersActions from './../../../store/actions/orders';

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

const Input = ({
  label,
  register,
  required,
  placeholder,
  errorKey,
  value,
  onChange
}) => (
  <>
    <Form.Group controlId={label}>
      <Form.Control
        name={label}
        value={value}
        onChange={onChange}
        placeholder={placeholder ? placeholder : label}
        ref={register({ required })}
      />
      {/* errors will return when field validation fails  */}
      {errorKey && <span className="error-text">{label} är inte ifyllt</span>}
    </Form.Group>
  </>
);

const HelpForm = props => {
  const { register, errors } = useForm();
  // const onSubmit = data => {
  //   console.log(data);
  // };
  // console.log(watch('example')); // watch input value by passing the name of it

  //TODO: for admin: pass the id of the order when clicking 'edit order'
  const orderId = props.selectedOrderId ? props.selectedOrderId : null; //Get the id of the currently edited order, passed from previous screen

  //Find order
  const editedOrder = useSelector(state =>
    state.orders.availableOrders.find(ordr => ordr.id === orderId)
  );

  //Set states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      typ: editedOrder ? editedOrder.typ : '',
      beskrivning: editedOrder ? editedOrder.beskrivning : '',
      tidsrymd: editedOrder ? editedOrder.tidsrymd : '',
      telefon: editedOrder ? editedOrder.telefon : '',
      förnamn: editedOrder ? editedOrder.förnamn : '',
      efternamn: editedOrder ? editedOrder.efternamn : '',
      email: editedOrder ? editedOrder.email : '',
      address: editedOrder ? editedOrder.address : '',
      postkod: editedOrder ? editedOrder.postkod : ''
    },
    inputValidities: {
      typ: editedOrder ? true : false,
      beskrivning: editedOrder ? true : false,
      tidsrymd: editedOrder ? true : false,
      telefon: editedOrder ? true : false,
      förnamn: editedOrder ? true : false,
      efternamn: editedOrder ? true : false,
      email: editedOrder ? true : false,
      address: editedOrder ? true : false,
      postkod: editedOrder ? true : false
    },
    formIsValid: editedOrder ? true : false
  });

  useEffect(() => {
    if (error) {
      console.log('error: ', error);
    }
  }, [error]);

  const submitHandler = event => {
    const templateId = 'template_9ZdHsvIt';

    sendFeedback(templateId, {
      typ: formState.inputValues.typ,
      beskrivning: formState.inputValues.beskrivning,
      tidsrymd: formState.inputValues.tidsrymd,
      telefon: +formState.inputValues.telefon,
      förnamn: formState.inputValues.förnamn,
      efternamn: formState.inputValues.efternamn,
      email: formState.inputValues.email,
      address: formState.inputValues.address,
      postkod: +formState.inputValues.postkod
    });
  };

  const sendFeedback = (templateId, variables) => {
    window.emailjs
      .send('gmail', templateId, variables)
      .then(res => {
        console.log('Email successfully sent!');
      })
      // Handle errors here however you like, or use a React error boundary
      .catch(err =>
        console.error(
          'Oh well, you failed. Here some thoughts on the error that occured:',
          err
        )
      );
  };

  // const submitHandler = useCallback(async () => {
  //   if (!formState.formIsValid) {
  //     //TODO: make alert when user tries to submit form when something is missing
  //     console.log('error: ', error);
  //     return;
  //   }
  //   setError(null);
  //   setIsLoading(true);
  //   try {
  //     if (editedOrder) {
  //       console.log('--------EDIT ORDER: dispatch--------');
  //       console.log('formState.inputValues:', formState.inputValues);
  //       console.log('---------------------------------------');
  //       await dispatch(
  //         ordersActions.updateOrder(
  //           orderId,
  //           formState.inputValues.typ,
  //           formState.inputValues.beskrivning,
  //           formState.inputValues.tidsrymd,
  //           +formState.inputValues.telefon,
  //           formState.inputValues.förnamn,
  //           formState.inputValues.efternamn,
  //           formState.inputValues.email,
  //           formState.inputValues.address,
  //           +formState.inputValues.postkod,
  //           formState.inputValues.grupp,
  //           formState.inputValues.status
  //         )
  //       );
  //     } else {
  //       console.log('--------CREATE ORDER: dispatch--------');
  //       console.log('formState.inputValues:', formState.inputValues);
  //       console.log('---------------------------------------');
  //       await dispatch(
  //         ordersActions.createOrder(
  //           formState.inputValues.typ,
  //           formState.inputValues.beskrivning,
  //           formState.inputValues.tidsrymd,
  //           +formState.inputValues.telefon,
  //           formState.inputValues.förnamn,
  //           formState.inputValues.efternamn,
  //           formState.inputValues.email,
  //           formState.inputValues.address,
  //           +formState.inputValues.postkod
  //         )
  //       );
  //     }
  //     props.navigation.goBack();
  //   } catch (err) {
  //     setError(err.message);
  //   }
  //   setIsLoading(false);
  // }, [
  //   formState.formIsValid,
  //   formState.inputValues,
  //   error,
  //   editedOrder,
  //   props.navigation,
  //   dispatch,
  //   orderId
  // ]);

  //Manages validation of title input

  const textChangeHandler = event => {
    let inputIdentifier = event.target.name;
    let text = event.target.value;
    //inputIdentifier and text will act as key:value in the form reducer
    console.log('-------TEXTCHANGEHANDLER, received values-------');
    console.log('inputIdentifier:', inputIdentifier);
    console.log('text:', text);
    console.log('------------------------------------------------');
    let isValid = true;

    // //If we haven't entered any value (its empty) set form validity to false
    // if (text.trim().length === 0) {
    //   isValid = false;
    // }

    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: text,
      isValid: isValid,
      input: inputIdentifier
    });
  };

  return (
    <div className="form">
      <Form onSubmit={submitHandler}>
        <h3>Vad behöver du hjälp med</h3>
        <Form.Group controlId={'typ'}>
          <Form.Control
            as="select"
            name={'typ'}
            value={formState.inputValues.typ}
            onChange={textChangeHandler.bind(this)}
            ref={register}
            required
          >
            <option value="inget val">Välj typ</option>
            <option value="Ett ärende">Ett ärende</option>
            <option value="Övrigt">Övrigt</option>
          </Form.Control>
        </Form.Group>

        <h3>Beskriv så väl du kan</h3>
        <Form.Group controlId="t-1">
          <Form.Control
            as="textarea"
            rows="3"
            name="beskrivning"
            value={formState.inputValues.beskrivning}
            onChange={textChangeHandler.bind(this)}
            // defaultValue={'tidigare värde'} Såhär fixar vi edit form senare
            placeholder="Inköpslista, övrig information..."
            ref={register}
          />
        </Form.Group>

        <h3>Hur länge kan du vänta?</h3>
        <Form.Group controlId={'tidsrymd'}>
          <Form.Control
            as="select"
            name={'tidsrymd'}
            value={formState.inputValues.tidsrymd}
            onChange={textChangeHandler.bind(this)}
            ref={register}
            required
          >
            <option value="tvådagar">Upp till två dagar</option>
            <option value="vecka">Upp till en vecka</option>
            <option value="fort">Så snabbt som möjligt</option>
          </Form.Control>
        </Form.Group>

        <h3>Var når vi dig?</h3>
        <Form.Row>
          <Col>
            <Input
              label="telefon"
              value={formState.inputValues.telefon.toString()}
              onChange={textChangeHandler.bind(this)}
              register={register}
              errorKey={errors.telefon}
              required
            />
          </Col>
          <Col>
            <Input
              label="email"
              value={formState.inputValues.email}
              onChange={textChangeHandler.bind(this)}
              placeholder="e-post"
              type="email"
              register={register}
              errorKey={errors.email}
              required
            />
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <Input
              label="förnamn"
              value={formState.inputValues.förnamn}
              onChange={textChangeHandler.bind(this)}
              register={register}
              errorKey={errors.förnamn}
              required
            />
          </Col>
          <Col>
            <Input
              label="efternamn"
              value={formState.inputValues.efternamn}
              onChange={textChangeHandler.bind(this)}
              register={register}
              errorKey={errors.efternamn}
              required
            />
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <Input
              label="address"
              value={formState.inputValues.address}
              onChange={textChangeHandler.bind(this)}
              register={register}
              errorKey={errors.address}
              required
            />
          </Col>
          <Col>
            <Input
              label="postkod"
              value={formState.inputValues.postkod.toString()}
              onChange={textChangeHandler.bind(this)}
              register={register}
              errorKey={errors.postkod}
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

// const EditOrderScreen = props => {

//   return (
//     <FormWrapper
//       submitButtonText="Spara Återbruk"
//       handlerForButtonSubmit={submitHandler}
//       isLoading={isLoading}
//     >
//       <FormFieldWrapper
//         showPromptIf={!formState.inputValues.image}
//         prompt="Välj en bild av återbruket"
//       >
//         <View style={styles.imagePicker}>
//           <View style={styles.imagePreview}>
//             {!placeholderPic ? (
//               <Text>Lägg upp en bild</Text>
//             ) : (
//               <Image style={styles.image} source={{ uri: placeholderPic }} /> //Originally uses the locally stored image as a placeholder
//             )}
//           </View>
//           <Button icon="camera" mode="contained" onPress={takeImageHandler}>
//             Välj en bild
//           </Button>
//         </View>
//       </FormFieldWrapper>
//       <FormFieldWrapper
//         showPromptIf={!formState.inputValues.title}
//         prompt="Skriv in en titel"
//       >
//         <TextInput
//           placeholder="Titel"
//           style={formStyles.input}
//           value={formState.inputValues.title}
//           onChange={textChangeHandler.bind(this, 'title')}
//           keyboardType="default"
//           autoCapitalize="sentences"
//           autoCorrect={false}
//           returnKeyType="next"
//         />
//       </FormFieldWrapper>
//       <FormFieldWrapper
//         showPromptIf={!formState.inputValues.price}
//         prompt="Lägg in ett pris (det kan vara 0)"
//       >
//         <TextInput
//           placeholder="Pris - Om du lägger upp som företag, ange pris inklusive moms"
//           style={formStyles.input}
//           value={formState.inputValues.price.toString()}
//           onChange={textChangeHandler.bind(this, 'price')}
//           keyboardType="number-pad"
//           autoCorrect={false}
//           returnKeyType="next"
//         />
//       </FormFieldWrapper>
//       <FormFieldWrapper
//         showPromptIf={!formState.inputValues.description}
//         prompt="Skriv in en kort beskrivning"
//       >
//         <TextInput
//           placeholder="Beskrivning"
//           style={formStyles.input}
//           value={formState.inputValues.description}
//           multiline
//           numberOfLines={4}
//           onChange={textChangeHandler.bind(this, 'description')}
//           autoCorrect={false}
//           returnKeyType="next"
//         />
//       </FormFieldWrapper>
//       {/* Part of the building */}
//       <FormFieldWrapper
//         label="Kategori"
//         showPromptIf={!selectedCategory}
//         prompt="Välj en kategori"
//       >

//       </FormFieldWrapper>

//       {/* Condition of the item */}
//       <HorizontalScrollContainer scrollHeight={90}>
//         {CONDITION.map(item => (
//           <IconItem
//             itemData={item}
//             key={item.id}
//             isHorizontal={true}
//             onSelect={() => {}}
//           />
//         ))}
//       </HorizontalScrollContainer>
//       {/* Something else of the item */}
//       <HorizontalScrollContainer scrollHeight={90}>
//         {OTHER.map(item => (
//           <IconItem
//             itemData={item}
//             key={item.id}
//             isHorizontal={true}
//             onSelect={() => {}}
//           />
//         ))}
//       </HorizontalScrollContainer>
//       {/* <FormFieldWrapper
//         label="Kategori"
//         showPromptIf={!formState.inputValues.categoryName}
//         prompt="Välj en kategori"
//       >
//         <Picker
//           selectedValue={formState.inputValues.categoryName}
//           onValueChange={textChangeHandler.bind(this, 'categoryName')}
//         >
//           <Picker.Item key={'tak'} label={'tak'} value={'tak'.toLowerCase()} />
//           <Picker.Item
//             key={'golv'}
//             label={'golv'}
//             value={'golv'.toLowerCase()}
//           />
//           <Picker.Item
//             key={'dörr'}
//             label={'dörr'}
//             value={'dörr'.toLowerCase()}
//           />
//         </Picker>
//       </FormFieldWrapper> */}

//       <FormFieldWrapper
//         showPromptIf={!formState.inputValues.address}
//         prompt="Den address återbruket kan hämtas på"
//       >
//         <TextInput
//           placeholder="Address"
//           style={formStyles.input}
//           value={formState.inputValues.address}
//           onChange={textChangeHandler.bind(this, 'address')}
//           keyboardType="default"
//           autoCorrect={false}
//           returnKeyType="next"
//         />
//       </FormFieldWrapper>
//       <FormFieldWrapper
//         showPromptIf={!formState.inputValues.phone}
//         prompt="Det telefonnummer man bäst kan kontakta dig på "
//       >
//         <TextInput
//           placeholder="Telefon"
//           style={formStyles.input}
//           value={formState.inputValues.phone.toString()}
//           onChange={textChangeHandler.bind(this, 'phone')}
//           keyboardType="number-pad"
//           autoCorrect={false}
//           returnKeyType="done"
//         />
//       </FormFieldWrapper>
//     </FormWrapper>
//   );
// };

// export const screenOptions = navData => {
//   const routeParams = navData.route.params ? navData.route.params : {};
//   return {
//     headerTitle: routeParams.detailId
//       ? 'Redigera återbruk'
//       : 'Lägg till återbruk'
//   };
// };

// export default EditOrderScreen;
