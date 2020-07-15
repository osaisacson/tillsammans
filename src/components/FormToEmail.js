import React, { useState } from "react";

import firebase from "firebase/app";
import "firebase/firestore";

import { Editor } from "@tinymce/tinymce-react";
import Button from "react-bootstrap/Button";

import FormInput from "./FormInput";

import {
  sendOrderToGroup,
  sendConfirmationToRecipientEmail,
  sendOrderInfoToVolonteerEmail,
  sendVolunteerInfoToGroupEmail,
  sendWelcomeToVolunteerEmail,
  sendFikerInfoToGroupEmail,
  sendWelcomeToFikerEmail,
} from "./../screens/tables/Emails";

const FormToEmail = ({ actionInForm, groupData, formData, refreshAction }) => {
  let collectionToUpdate;
  let fieldsToUpdate = {};
  let defaultEmail = "";
  let defaultSubject = "";
  let defaultTemplate = "";
  let title;

  const currentGroup = groupData.find((data) => data.id === formData.gruppId);

  if (actionInForm === "sendAndUpdateGroup") {
    collectionToUpdate = "orders";
    fieldsToUpdate = {
      status: !formData.gruppId || formData.gruppId === "0" ? "1" : "2",
      skickadGrupp: true,
    };
    title = `Skicka information om beställningen till gruppledare och reserv för ${currentGroup.gruppnamn}`;
    defaultEmail = `${currentGroup.email}, ${currentGroup.reservEmail}`;
    defaultSubject = `Ny beställning mottagen från ${formData.förnamn} ${formData.efternamn}`;
    defaultTemplate = sendOrderToGroup(formData); //Template for sending order to a group
  }

  if (actionInForm === "sendAndUpdateToConfirmed") {
    collectionToUpdate = "orders";
    fieldsToUpdate = {
      skickadBeställare: true,
    };
    title = `Skicka bekräftelse till ${formData.förnamn} ${formData.efternamn} att vi mottagit deras beställning`;
    defaultEmail = formData.email;
    defaultSubject = `Tack för din beställning!`;
    defaultTemplate = sendConfirmationToRecipientEmail(formData, currentGroup); //Template for sending a confirmation of receipt to the ordering individual
  }

  if (actionInForm === "sendAndUpdateVolunteer") {
    collectionToUpdate = "orders";
    fieldsToUpdate = {
      skickadVolontär: true,
    };
    title = `Skicka information om beställningen till den volontär som du fördelar ärendet till`;
    defaultSubject = `Ny beställning att utföra från ${formData.förnamn} ${formData.efternamn}`;
    defaultTemplate = sendOrderInfoToVolonteerEmail(formData, currentGroup); //Template for sending a confirmation of receipt to the ordering individual
  }

  if (actionInForm === "sendVolunteerInfoToGroup") {
    collectionToUpdate = "volunteers";
    fieldsToUpdate = {
      skickadVolontärTillGrupp: true,
      status: "2",
    };
    title = `Skicka information om volontären till gruppledare och reserv för ${currentGroup.gruppnamn}`;
    defaultEmail = `${currentGroup.email}, ${currentGroup.reservEmail}`;
    defaultSubject = `Ny volontär mottagen: ${formData.förnamn} ${formData.efternamn}`;
    defaultTemplate = sendVolunteerInfoToGroupEmail(formData); //Template for sending volunteer to a group
  }

  if (actionInForm === "sendVolunteerWelcome") {
    collectionToUpdate = "volunteers";
    fieldsToUpdate = {
      skickadBekräftelseTillVolontär: true,
      status: "3",
    };
    title = `Skicka bekräftelse till ${formData.förnamn} ${formData.efternamn} att vi registrerat deras intresse att bli volontär`;
    defaultEmail = formData.email;
    defaultSubject = `Tack för ditt intresse att bli volontär!`;
    defaultTemplate = sendWelcomeToVolunteerEmail(formData, currentGroup); //Template for sending a welcome email to the volunteer
  }

  if (actionInForm === "sendFikerInfoToGroup") {
    collectionToUpdate = "fika";
    fieldsToUpdate = {
      skickadFikapersonTillGrupp: true,
      status: "2",
    };
    title = `Skicka information om personen som är intresserad av att vara med på fika till gruppledare och reserv för ${currentGroup.gruppnamn}`;
    defaultEmail = `${currentGroup.email}, ${currentGroup.reservEmail}`;
    defaultSubject = `Ny intressent till fikagrupp mottagen: ${formData.förnamn} ${formData.efternamn}`;
    defaultTemplate = sendFikerInfoToGroupEmail(formData); //Template for sending person interested in a fika to a fika group
  }

  if (actionInForm === "sendFikerWelcome") {
    collectionToUpdate = "fika";
    fieldsToUpdate = {
      skickadBekräftelseTillFikaperson: true,
    };
    title = `Skicka bekräftelse till ${formData.förnamn} ${formData.efternamn} att vi registrerat deras intresse för fika`;
    defaultEmail = formData.email;
    defaultSubject = `Tack för ditt intresse att vara med på fika!`;
    defaultTemplate = sendWelcomeToFikerEmail(formData, currentGroup); //Template for sending a welcome email to the volunteer
  }

  const [email, setEmail] = useState(defaultEmail);
  const [subject, setSubject] = useState(defaultSubject);
  const [html, setHtml] = useState(defaultTemplate);
  const [resultMessage, setResultMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const db = firebase.firestore();

  async function dbUpdate() {
    setIsLoading(true);
    db.collection(collectionToUpdate)
      .doc(formData.id)
      .update(fieldsToUpdate)
      .then(() => {
        refreshAction().then(() => {
          setIsLoading(false);
        });
      });
  }

  const handleChange = (event) => {
    const { value, name } = event.target;
    if (name === "email") {
      setEmail(value);
    }
    if (name === "subject") {
      setSubject(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendEmail();
    dbUpdate();
  };

  const sendEmail = () => {
    var sendEmailFromForm = firebase
      .functions()
      .httpsCallable("sendEmailFromForm");
    sendEmailFromForm({ email: email, subject: subject, html: html })
      .then(function (result) {
        var resultMessage = result.data.result;
        setResultMessage(resultMessage);
      })
      .catch(function (error) {
        var code = error.code;
        var errorMessage = error.message;
        var details = error.details;
        setErrorMessage(`${code}: ${errorMessage} - ${details}`);
      });
  };

  const handleEditorChange = (content, editor) => {
    setHtml(content);
  };

  return (
    <>
      <div className="page-layout">
        {isLoading ? (
          <p>...skickar mailet och uppdaterar databasen...</p>
        ) : resultMessage || errorMessage ? (
          <p>
            {resultMessage} {errorMessage}
          </p>
        ) : (
          <>
            <h4>Skicka email</h4>
            <p>{title}</p>

            <form onSubmit={handleSubmit}>
              <FormInput
                name="email"
                type="text"
                handleChange={handleChange}
                value={email}
                label="Mottagarens email"
                required
              />
              <FormInput
                autoComplete="off"
                name="subject"
                type="text"
                handleChange={handleChange}
                value={subject}
                label="Ämne"
                required
              />
              <Editor
                apiKey="xofwa8g6vmgtapxbm8yb9vr3ho8qghrlss2oplxwybnop9z6"
                initialValue={`<p>${html}</p>`}
                init={{
                  height: 500,
                  menubar: false,
                  plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code help wordcount",
                  ],
                  toolbar:
                    // eslint-disable-next-line no-multi-str
                    "undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help",
                }}
                onEditorChange={handleEditorChange}
              />
              <Button type="submit" block>
                Skicka mail
              </Button>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default FormToEmail;
